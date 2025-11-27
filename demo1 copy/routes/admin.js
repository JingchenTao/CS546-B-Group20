// 文件: routes/admin.js
const express = require('express');
const router = express.Router();
const parksData = require('../data/parks');

// 管理员权限中间件
router.use((req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.send('访问被拒绝：管理员专用');
    }
    next();
});

// 管理员首页：显示所有公园以及添加公园的表单
router.get('/', async (req, res) => {
    const parks = await parksData.getAllParks();
    res.render('admin_dashboard', { title: '管理员控制台', parks });
});

// 添加新公园（由管理员）
router.post('/addPark', async (req, res) => {
    const { name, location, description } = req.body;
    try {
        await parksData.createPark(name, location, description);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/admin');
});

// 删除公园（由管理员）
router.get('/deletePark/:id', async (req, res) => {
    const parkId = req.params.id;
    try {
        await parksData.removePark(parkId);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/admin');
});

module.exports = router;
