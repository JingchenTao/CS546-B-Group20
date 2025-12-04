import {parks, users, reviews } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkId, checkIsProperRate, checkIsProperReview } from '../controllers/review.js';
import { deleteCommentByReviewID } from './comment.js';


async function recalculateParkRating(parkId) {
    parkId = checkId(parkId, 'park ID');
    const reviewsCollection = await reviews();
    const parkReviews = await reviewsCollection.find({ park_id: new ObjectId(parkId) }).toArray();
    let r = 0;
    if (parkReviews.length !== 0) {
        let total = 0;
        for (let review of parkReviews) { total += review.rating }
        r = Math.round(total / parkReviews.length * 100) / 100;
    }

    const updatedParks = { rating: r };
    const parksCollection = await parks();
    let updatedInfo = await parksCollection.findOneAndUpdate(
        { _id: new ObjectId(parkId) },
        { $set:  updatedParks  },
        {returnDocument: 'after'}
    );

    if (!updatedInfo) {
        throw 'Could not update the park rating successfully';
    }
        
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;        
};

const getReviewByReviewId = async (id) => {
    id = checkId(id, 'review ID');
    const reviewsCollection = await reviews();
    const review = await reviewsCollection.findOne({_id: new ObjectId(id)});
    if (!review) {throw `No review with this review ID ( ${id} )!`;}
    review._id = review._id.toString();
    return review;
};

const getReviewsByParkId = async (id) => {
    id = checkId(id, 'park ID');
    const reviewsCollection = await reviews();
    const reviewList = await reviewsCollection.find({ park_id: new ObjectId(id) }) .toArray();
    if (reviewList.length === 0) { return []; }
    for(let r of reviewList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
        r.park_id = r.park_id.toString();
    }
    
    return reviewList;
};

const getReviewsByUserId = async (id) => {
    id = checkId(id, 'user ID');
    const reviewsCollection = await reviews();
    const reviewList = await reviewsCollection.find({ user_id: new ObjectId(id) }) .toArray();
    if (reviewList.length === 0) { return []; }
    for(let r of reviewList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
        r.park_id = r.park_id.toString();
    }
    
    return reviewList;
};

const addReview = async (
    userId,
    parkId,
    rating,
    review_content
) =>   {
    userId = checkId(userId, 'user ID');
    parkId = checkId(parkId, 'park ID');
    rating = checkIsProperRate(rating, 'rating');
    review_content = checkIsProperReview(review_content, 'review content');
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };

    const parksCollection = await parks();
    const park = await parksCollection.findOne({ _id: new ObjectId(parkId) });
    if(!park){
        throw `Could not find this park ID ( ${parkId} ) !`;
    }

    const reviewsCollection = await reviews();
    const reviewList = await reviewsCollection.find({ park_id: new ObjectId(parkId) }) .toArray();
    if (reviewList.length != 0) { 
        for(let r of reviewList){
            if( r.user_id.toString() === userId){
                throw `User( ${userId} ) has already reviewed this park( ${parkId} ). Duplicate reviews are not allowed. Please edit the existing review!`; 
            }
        }
    }

    let newReview = {
        user_id: new ObjectId(userId),
        park_id: new ObjectId(parkId),
        rating: rating,
        review_content: review_content,
        createdAt: new Date(),
        updatedAt: null
    };

    const insertInfo = await reviewsCollection.insertOne(newReview);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
        throw 'Could not add this review to the park';
    }  

    await recalculateParkRating(parkId);

    const addedReview = await getReviewByReviewId(insertInfo.insertedId.toString());

    return addedReview;
};

const updateReview = async (
    reviewId,
    newRating,
    newContent
) =>   {
    reviewId = checkId(reviewId, 'review ID');
    newRating = checkIsProperRate(newRating, 'new rating');
    newContent = checkIsProperReview(newContent, 'new review content');
    let oldreview = await getReviewByReviewId(reviewId);
    const reviewsCollection = await reviews();
    const updatedInfo = await reviewsCollection.findOneAndUpdate(
        {_id: new ObjectId(reviewId)},
        {$set: {rating: newRating, 
                review_content: newContent,
                updatedAt: new Date()
            }},
        {returnDocument: 'after'}
    );

    if (!updatedInfo){
        throw 'Could not upgrade this review!';
    }  

    await recalculateParkRating(updatedInfo.park_id.toString());

    updatedInfo._id = updatedInfo._id.toString();

    return updatedInfo;

}


const deleteReviewByReviewId = async (
    reviewId
) =>   {
    reviewId = checkId(reviewId, 'review ID');
    await getReviewByReviewId(reviewId);
    const reviewsCollection = await reviews();
    const deletionInfo = await reviewsCollection.findOneAndDelete({_id: new ObjectId(reviewId)});

    if (!deletionInfo) {
        throw `Could not delete the review with id (${reviewId})`;
    }

    await recalculateParkRating(deletionInfo.park_id.toString());

    const deletedComment = await deleteCommentByReviewID(reviewId)

    return {review_id: deletionInfo._id.toString(), deleted_comments_count: deletedComment.deleted_number, deleted: true};

}



export {
    getReviewByReviewId,
    getReviewsByParkId,
    getReviewsByUserId,
    addReview,
    updateReview,
    deleteReviewByReviewId
};
