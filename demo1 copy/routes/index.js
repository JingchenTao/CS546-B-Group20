// 文件: routes/index.js
const express = require('express');
const router = express.Router();

// 首页
router.get('/', (req, res) => {
    res.render('home', { title: '城市公园探索' });
});

// 兼容旧路径：/login -> /users/login
router.get('/login', (req, res) => {
    res.redirect('/users/login');
});

// 兼容旧路径：/register -> /users/register
router.get('/register', (req, res) => {
    res.redirect('/users/register');
});

// 兼容旧路径：/logout -> /users/logout
router.get('/logout', (req, res) => {
    res.redirect('/users/logout');
});

module.exports = router;
