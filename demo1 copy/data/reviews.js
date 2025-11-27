// 文件: data/reviews.js
const connectDB = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

async function createReview(parkId, userId, userName, rating, comment) {
    const db = await connectDB();
    const reviewsCollection = db.collection('reviews');
    if (!ObjectId.isValid(parkId) || !ObjectId.isValid(userId)) {
        throw 'ID不合法';
    }
    const newReview = {
        parkId: ObjectId(parkId),
        userId: ObjectId(userId),
        userName: userName,
        rating: Number(rating),
        comment: comment,
        date: new Date()
    };
    const insertInfo = await reviewsCollection.insertOne(newReview);
    if (insertInfo.insertedCount === 0) throw '创建评论失败';
    return insertInfo.insertedId;
}

async function getReviewsByPark(parkId) {
    const db = await connectDB();
    const reviewsCollection = db.collection('reviews');
    if (!ObjectId.isValid(parkId)) {
        throw '公园ID不合法';
    }
    // 查询并按日期降序排列
    const reviews = await reviewsCollection
        .find({ parkId: ObjectId(parkId) })
        .sort({ date: -1 })
        .toArray();
    return reviews;
}

async function getReviewById(reviewId) {
    const db = await connectDB();
    const reviewsCollection = db.collection('reviews');
    if (!ObjectId.isValid(reviewId)) throw '评论ID不合法';
    const review = await reviewsCollection.findOne({ _id: ObjectId(reviewId) });
    if (!review) throw '评论不存在';
    return review;
}

module.exports = {
    createReview,
    getReviewsByPark,
    getReviewById
};
