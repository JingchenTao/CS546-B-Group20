// 文件: data/comments.js
const connectDB = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

async function createComment(reviewId, userId, userName, comment) {
    const db = await connectDB();
    const commentsCollection = db.collection('comments');
    if (!ObjectId.isValid(reviewId) || !ObjectId.isValid(userId)) {
        throw 'ID不合法';
    }
    const newComment = {
        reviewId: ObjectId(reviewId),
        userId: ObjectId(userId),
        userName: userName,
        comment: comment,
        date: new Date()
    };
    const insertInfo = await commentsCollection.insertOne(newComment);
    if (insertInfo.insertedCount === 0) throw '创建子评论失败';
    return insertInfo.insertedId;
}

async function getCommentsByReview(reviewId) {
    const db = await connectDB();
    const commentsCollection = db.collection('comments');
    if (!ObjectId.isValid(reviewId)) {
        throw '评论ID不合法';
    }
    const comments = await commentsCollection
        .find({ reviewId: ObjectId(reviewId) })
        .sort({ date: -1 })
        .toArray();
    return comments;
}

module.exports = {
    createComment,
    getCommentsByReview
};
