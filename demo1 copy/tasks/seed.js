// 文件: tasks/seed.js
const connectDB = require('../config/mongoConnection');
const parksData = require('../data/parks');
const usersData = require('../data/users');
const reviewsData = require('../data/reviews');
const commentsData = require('../data/comments');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

async function seed() {
    const db = await connectDB();
    // 清空数据库
    await db.dropDatabase();

    // 创建公园示例数据
    const park1Id = await parksData.createPark('中央公园', '纽约, NY', '纽约市的中心公园，拥有大片草坪和湖泊。');
    const park2Id = await parksData.createPark('金门公园', '旧金山, CA', '位于旧金山的著名公园，有花园和博物馆。');
    const park3Id = await parksData.createPark('海滨公园', '圣地亚哥, CA', '沿海公园，可以欣赏海景和日落。');

    // 创建管理员账号和普通用户
    const adminPassword = bcrypt.hashSync('adminpass', 10);
    const userPassword = bcrypt.hashSync('userpass', 10);
    const adminId = await usersData.createUser('admin', adminPassword);
    const userId = await usersData.createUser('user', userPassword);

    // 将 admin 用户设为管理员
    await db.collection('users').updateOne(
        { _id: ObjectId(adminId) },
        { $set: { isAdmin: true } }
    );

    // 添加示例评论
    const review1Id = await reviewsData.createReview(park1Id, adminId, 'admin', 5, '这个公园非常漂亮，非常适合散步。');
    const review2Id = await reviewsData.createReview(park1Id, userId, 'user', 4, '风景很好，但人有点多。');

    // 添加示例回复
    await commentsData.createComment(review1Id, userId, 'user', '是的，尤其秋天时风景很美！');
    await commentsData.createComment(review2Id, adminId, 'admin', '谢谢你的评价！');

    console.log('数据初始化完成');
    process.exit(0);
}

seed().catch((e) => {
    console.error(e);
});
