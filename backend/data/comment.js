import {parks, users, reviews, comments } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkId, checkIsProperRate, checkIsProperReview } from '../controllers/review.js';


// get comment by comment id
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
    const reviewsCollection = await reviews();
    const review = await reviewsCollection.findOne({_id: new ObjectId(reviewId)});
    if (!review) {throw `No review with this review ID ( ${reviewId} )!`;}
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
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: new ObjectId(userId)});
    if (!user) {throw `No user with this user ID ( ${userId} )!`;}
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
  
    if(!parentCommentId){
        const existing = await commentsCollection.findOne({ user_id: new ObjectId(userId),
                                                                    review_id: new ObjectId(reviewId),
                                                                    comment_id: null });
        if(existing) throw `User( ${userId} ) has already commented this review ( ${reviewId} ) . Please edit the existing comment!`; 

    }
   
    if(parentCommentId){
        parentCommentId = checkId(parentCommentId, 'comment ID');
        const existing = await commentsCollection.findOne({ user_id: new ObjectId(userId),
                                                                    review_id: new ObjectId(reviewId),
                                                                    comment_id: new ObjectId(parentCommentId) });
        if(existing) throw `User( ${userId} ) has already commented this comment ( ${parentCommentId} ) under current review( ${reviewId} ). Please edit the existing comment!`;
        let currentComment = await getCommentByCommentId(parentCommentId);
        if(currentComment.review_id.toString() !== reviewId){
            throw `Parent comment (${parentCommentId}) does not belong to review (${reviewId}).`;
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
    let content
    if (!parentCommentId){
        content = `The user (${userId}) commented the review ${reviewId}.`;
    } else {
         content = `The user (${userId}) commented the comment ${parentCommentId.toString()} under the review ${reviewId}.`;
    }
    
    await addHistory(userId, addedComments._id.toString(), 'comments', 'create', content, {before: null, after: addedComments})
    return addedComments;
};




const updateComment = async (
    commentID,
    upgraded_comment_content,
    userId
) =>   {
    commentID = checkId(commentID, 'comment ID');
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };
    let currentComment = await getCommentByCommentId(commentID)
    if(currentComment.user_id.toString() !== userId.toString() && user.role !== 'admin') throw 'Only current user or admin can edit the comment.'
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
    let content = `The user (${userId}) updated the comment ${commentID}.`;
    await addHistory(userId, commentID, 'comments', 'update', content, {before: currentComment, after: updatedInfo})
    return updatedInfo;
}



const deleteCommentByCommentId = async (
    commentID,
    userId
) =>   {
    commentID = checkId(commentID, 'comment ID');
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if(!user){ throw `Could not find this user ID ( ${userId} ) !` };
    let currentComment = await getCommentByCommentId(commentID)
    if(currentComment.user_id.toString() !== userId.toString() && user.role !== 'admin') throw 'Only current user or admin can delete the comment.'
    const commentsCollection = await comments();
    const deletionInfo = await commentsCollection.findOneAndDelete({_id: new ObjectId(commentID)});

    if (!deletionInfo) {
        throw `Could not delete the comment with id (${commentID})`;
    }

    let content = `The user (${userId}) deleted the comment ${commentID}.`;
    await addHistory(userId, commentID, 'comments', 'delete', content, {before: currentComment, after: null})
    return {comment_id: deletionInfo._id.toString(), deleted: true};
}



const deleteCommentByReviewID = async (
    reviewId,
    userID
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






