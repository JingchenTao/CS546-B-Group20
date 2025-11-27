// 文件: routes/parks.js
const express = require('express');
const router = express.Router();
const parksData = require('../data/parks');
const reviewsData = require('../data/reviews');
const commentsData = require('../data/comments');
const usersData = require('../data/users'); // 用于获取用户收藏信息

// 浏览所有公园: 列表页
router.get('/', async (req, res) => {
    const parks = await parksData.getAllParks();
    res.render('parkList', { title: '公园列表', parks });
});

// 查看单个公园详情，包括评论和回复
router.get('/:parkId', async (req, res) => {
    const parkId = req.params.parkId;
    try {
        const park = await parksData.getParkById(parkId);
        if (!park) {
            return res.status(404).send('未找到该公园');
        }
        // 获取该公园的所有评论
        let reviews = await reviewsData.getReviewsByPark(parkId);
        // 对于每条评论，获取其子评论列表
        for (let review of reviews) {
            const comments = await commentsData.getCommentsByReview(review._id.toString());
            review.comments = comments;
        }
        // 检查当前用户是否收藏了此公园
        let favorite = false;
        if (req.session.user) {
            const user = await usersData.getUserById(req.session.user._id);
            favorite = user.favorites.map(id => id.toString()).includes(parkId);
        }
        res.render('parkDetail', {
            title: park.name,
            park: park,
            reviews: reviews,
            favorite: favorite
        });
    } catch (e) {
        res.status(500).send('发生错误');
    }
});

// 添加新评论（评分）到公园（登录用户可评论）
router.post('/:parkId/reviews', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const parkId = req.params.parkId;
    const { rating, comment } = req.body;
    try {
        const userId = req.session.user._id;
        const userName = req.session.user.username;
        await reviewsData.createReview(parkId, userId, userName, rating, comment);
        res.redirect(`/parks/${parkId}`);
    } catch (e) {
        res.status(500).send('创建评论失败');
    }
});

// 添加回复到指定评论（登录用户可回复）
router.post('/:parkId/reviews/:reviewId/comments', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const reviewId = req.params.reviewId;
    const parkId = req.params.parkId;
    const { comment } = req.body;
    try {
        const userId = req.session.user._id;
        const userName = req.session.user.username;
        await commentsData.createComment(reviewId, userId, userName, comment);
        res.redirect(`/parks/${parkId}`);
    } catch (e) {
        res.status(500).send('创建子评论失败');
    }
});

module.exports = router;
