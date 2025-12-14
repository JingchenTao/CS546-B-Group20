import {parks, users, reviews } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkId, checkIsProperRate, checkIsProperReview } from '../controllers/review.js';
import { deleteCommentByReviewID } from './comment.js';
import { getParkById } from './parks.js';


async function recalculateParkRating(parkId) {
    parkId = checkId(parkId, 'park ID');
    let parkReviews = await getReviewsByParkId(parkId);
    let r = 0;
    if (parkReviews.length !== 0) {
        let total = 0;
        for (let review of parkReviews) { total += review.rating }
        r = Math.round(total / parkReviews.length * 100) / 100;
    }
    let reviewCount = parkReviews.length;
    const updatedParks = { rating: r, reviewCount: reviewCount};
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
    const parksCollection = await parks();
    const park = await parksCollection.findOne({_id: new ObjectId(id)});
    if (!park) {throw `No park with this park ID ( ${id} )!`;}
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
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: new ObjectId(id)});
    if (!user) {throw `No user with this user ID ( ${id} )!`;}
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
    await getParkById(parkId);
    const reviewsCollection = await reviews();
    const reviewList = await reviewsCollection.findOne({ park_id: new ObjectId(parkId), user_id: new ObjectId(userId)});
    if (reviewList) { throw 'Cannot review the same park twice!'}
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
    let content = `The user (${userId}) reviewed the park ${parkId}.`;
    await addHistory(userId, addedReview._id.toString(), 'reviews', 'create', content, {before: null, after: addedReview})

    return addedReview;
};



const updateReview = async (
    reviewId,
    newRating,
    newContent,
    userId
) =>   {
    reviewId = checkId(reviewId, 'review ID');
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };
    newRating = checkIsProperRate(newRating, 'new rating');
    newContent = checkIsProperReview(newContent, 'new review content');
    let currentReview = await getReviewByReviewId(reviewId);
    if( userId !== currentReview.user_id.toString() && user.role !== 'admin'){
        throw 'Only current user or admin can edit the review.'
    }
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
    await recalculateParkRating(currentReview.park_id.toString());
    updatedInfo._id = updatedInfo._id.toString();
    let content = `The user (${userId}) updated the review ${reviewId}.`;
    await addHistory(userId, reviewId, 'reviews', 'update', content, {before: currentReview, after: updatedInfo})
    return updatedInfo;
}




const deleteReviewByReviewId = async (
    reviewId,
    userId
) =>   {
    reviewId = checkId(reviewId, 'review ID');
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };
    const currentReview =  await getReviewByReviewId(reviewId);
    if( userId !== currentReview.user_id.toString() && user.role !== 'admin'){
        throw 'Only current user or admin can delete the review.'
    }

    const reviewsCollection = await reviews();
    const deletionResult = await reviewsCollection.deleteOne({_id: new ObjectId(reviewId)});
    if (deletionResult.deletedCount === 0) {
        throw `Could not delete the review with id (${reviewId})`;
    }

    Promise.resolve().then(async () => {
        try {
            await recalculateParkRating(currentReview.park_id.toString());
        } catch (e) {
            console.error('[WARN] recalc rating failed', e);
        }

        try {
            await deleteCommentByReviewID(reviewId);
        } catch (e) {
            console.error('[WARN] delete comments failed', e);
        }
    });
    
    let content = `The user (${userId}) deleted the review ${reviewId}.`;
    await addHistory(userId, reviewId, 'reviews', 'delete', content, {before: currentReview, after: null})
    return {review_id: reviewId, deleted: true};
}


export {
    getReviewByReviewId,
    getReviewsByParkId,
    getReviewsByUserId,
    addReview,
    updateReview,
    deleteReviewByReviewId
};
