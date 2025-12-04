import {parks, users, reviews, comments } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkId, checkIsProperRate, checkIsProperReview } from '../controllers/review.js';

const getCommentByCommentId = async (commentId) => {
    
    commentId = checkId(commentId, 'comment ID');
    const commentsCollection = await comments();
    const comment = await commentsCollection.findOne({_id: new ObjectId(commentId)});
    if (!comment) {throw `No comment with this comment ID ( ${commentId} )!`;}
    comment._id = comment._id.toString();
    return comment;
};

const getCommentsByReviewId = async (reviewId) => {
    reviewId = checkId(reviewId, 'review ID');
    const commentsCollection = await comments();
    const commentsList = await commentsCollection.find({ review_id: new ObjectId(reviewId) }) .toArray();
    if (commentsList.length === 0) { return []; }
    for(let r of commentsList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
        r.review_id = r.review_id.toString();
    }
    
    return commentsList;
};

const getCommentsByUserId = async (userId) => {
    userId = checkId(userId, 'user ID');
    const commentsCollection = await comments();
    const commentsList = await commentsCollection.find({ user_id: new ObjectId(userId) }) .toArray();
    if (commentsList.length === 0) { return []; }
    for(let r of commentsList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
        r.review_id = r.review_id.toString();
    }
    
    return commentsList;
};

const addComment = async (
    userId,
    reviewId,
    parentCommentId = null,
    comment_content
) =>   {
    userId = checkId(userId, 'user ID');
    reviewId = checkId(reviewId, 'review ID');
    comment_content = checkIsProperReview(comment_content, 'comment content');


    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };

    const reviewsCollection = await reviews();
    const review = await reviewsCollection.findOne({ _id: new ObjectId(reviewId) });
    if(!review){
        throw `Could not find this review ID ( ${reviewId} ) !`;
    }

    const commentsCollection = await comments();

    if(parentCommentId){
        parentCommentId = checkId(parentCommentId, 'parent Comment ID');
        const currentUserCommentList = await commentsCollection.find({ user_id: new ObjectId(userId) }) .toArray();
        if (currentUserCommentList.length != 0) { 
            for(let c of currentUserCommentList){
                if( c.comment_id && c.comment_id.toString() === parentCommentId){
                    throw `User( ${userId} ) has already commented this comment ( ${parentCommentId} ) under current review( ${reviewId} ). Please edit the existing comment!`; 
                }
            }
        }
        parentCommentId = new ObjectId(parentCommentId);    
    } 

    let newComments = {
        user_id: new ObjectId(userId),
        review_id: new ObjectId(reviewId),
        comment_id: parentCommentId,
        comment_content: comment_content,
        createdAt: new Date(),
        updatedAt: null

    }


    const insertInfo = await commentsCollection.insertOne(newComments);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
        throw 'Could not add this comment to the review';
    }  


    const addedComments = await getCommentByCommentId(insertInfo.insertedId.toString());

    return addedComments;
};




const updateComment = async (
    commentID,
    upgraded_comment_content
) =>   {
    commentID = checkId(commentID, 'comment ID');
    await getCommentByCommentId(commentID)
    upgraded_comment_content = checkIsProperReview(upgraded_comment_content, 'new comment content');
    const commentsCollection = await comments();
    const updatedInfo = await commentsCollection.findOneAndUpdate(
        {_id: new ObjectId(commentID)},
        {$set: {
                comment_content: upgraded_comment_content,
                updatedAt: new Date()
            }},
        {returnDocument: 'after'}
    );

    if (!updatedInfo){
        throw 'Could not upgrade this comment!';
    }  

    updatedInfo._id = updatedInfo._id.toString();

    return updatedInfo;

}

const deleteCommentByCommentId = async (
    commentID
) =>   {
    commentID = checkId(commentID, 'comment ID');
    await getCommentByCommentId(commentID)
    const commentsCollection = await comments();
    const deletionInfo = await commentsCollection.findOneAndDelete({_id: new ObjectId(commentID)});

    if (!deletionInfo) {
        throw `Could not delete the comment with id (${commentID})`;
    }

    return {comment_id: deletionInfo._id.toString(), deleted: true};

}

const deleteCommentByReviewID = async (
    reviewId
) =>   {
    reviewId = checkId(reviewId, 'review id');
    let commentsList = await getCommentsByReviewId(reviewId);
    const commentsCollection = await comments();
 
    const deleteInfo = await commentsCollection.deleteMany({ review_id: new ObjectId(reviewId) });


    return {deleted_number: deleteInfo.deletedCount, deleted: true};
}



export {
    getCommentByCommentId,
    getCommentsByReviewId,
    getCommentsByUserId,
    addComment,
    updateComment,
    deleteCommentByCommentId,
    deleteCommentByReviewID
};






