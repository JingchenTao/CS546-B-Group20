// 文件: data/users.js
const connectDB = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

async function createUser(username, password) {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    // 确保用户名唯一
    const existingUser = await usersCollection.findOne({ username: username });
    if (existingUser) {
        throw '用户名已存在';
    }

    const newUser = {
        username: username,
        password: password,  // 存储哈希后的密码
        isAdmin: false,
        favorites: []
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
        throw '创建用户失败';
    }
    return insertInfo.insertedId;
}

async function getUserByUsername(username) {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username: username });
    if (!user) {
        throw '用户不存在';
    }
    return user;
}

async function getUserById(id) {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    if (!ObjectId.isValid(id)) throw '用户ID不合法';
    const user = await usersCollection.findOne({ _id: ObjectId(id) });
    if (!user) throw '用户不存在';
    return user;
}

async function addFavorite(userId, parkId) {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(parkId)) {
        throw 'ID不合法';
    }
    const updateInfo = await usersCollection.updateOne(
        { _id: ObjectId(userId) },
        { $addToSet: { favorites: ObjectId(parkId) } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw '收藏公园失败';
    }
    return true;
}

async function removeFavorite(userId, parkId) {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(parkId)) {
        throw 'ID不合法';
    }
    const updateInfo = await usersCollection.updateOne(
        { _id: ObjectId(userId) },
        { $pull: { favorites: ObjectId(parkId) } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw '取消收藏失败';
    }
    return true;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    addFavorite,
    removeFavorite
};
