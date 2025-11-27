// 文件: routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const usersData = require('../data/users');
const parksData = require('../data/parks');

// 显示登录页面
router.get('/login', (req, res) => {
    res.render('login', { title: '登录' });
});

// 处理登录表单提交
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await usersData.getUserByUsername(username);
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.send('用户名或密码错误');
        }
        // 登录成功，将用户信息存入 session
        req.session.user = {
            _id: user._id.toString(),
            username: user.username,
            isAdmin: user.isAdmin
        };
        res.redirect('/');
    } catch (e) {
        res.send('登录失败');
    }
});

// 显示注册页面
router.get('/register', (req, res) => {
    res.render('register', { title: '注册' });
});

// 处理注册表单提交
router.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.send('两次输入密码不一致');
    }
    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        await usersData.createUser(username, hashPassword);
        res.redirect('/login');
    } catch (e) {
        res.send('注册失败: ' + e);
    }
});

// 注销登录
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// 用户个人资料页
router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const user = await usersData.getUserById(req.session.user._id);
        // 获取用户收藏的公园信息
        const favoriteParks = [];
        for (let parkId of user.favorites) {
            const park = await parksData.getParkById(parkId.toString());
            favoriteParks.push(park);
        }
        res.render('profile', {
            title: '个人资料',
            user: user,
            favorites: favoriteParks
        });
    } catch (e) {
        res.send('获取用户信息失败');
    }
});

// 添加公园到收藏
router.get('/favorite/:parkId', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const userId = req.session.user._id;
    const parkId = req.params.parkId;
    try {
        await usersData.addFavorite(userId, parkId);
    } catch (e) {
        console.log(e);
    }
    res.redirect('back');
});

// 从收藏移除公园
router.get('/unfavorite/:parkId', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const userId = req.session.user._id;
    const parkId = req.params.parkId;
    try {
        await usersData.removeFavorite(userId, parkId);
    } catch (e) {
        console.log(e);
    }
    res.redirect('back');
});

module.exports = router;
