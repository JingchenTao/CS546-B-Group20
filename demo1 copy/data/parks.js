// 文件: data/parks.js
const connectDB = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

async function getAllParks() {
    const db = await connectDB();
    const parksCollection = db.collection('parks');
    const parksList = await parksCollection.find({}).toArray();
    return parksList;
}

async function getParkById(id) {
    const db = await connectDB();
    const parksCollection = db.collection('parks');
    if (!ObjectId.isValid(id)) {
        throw '公园ID不合法';
    }
    const park = await parksCollection.findOne({ _id: ObjectId(id) });
    if (!park) {
        throw '未找到该公园';
    }
    return park;
}

async function createPark(name, location, description) {
    const db = await connectDB();
    const parksCollection = db.collection('parks');
    const newPark = {
        name: name,
        location: location,
        description: description
    };
    const insertInfo = await parksCollection.insertOne(newPark);
    if (insertInfo.insertedCount === 0) throw '创建公园失败';
    return insertInfo.insertedId;
}

async function removePark(id) {
    const db = await connectDB();
    const parksCollection = db.collection('parks');
    if (!ObjectId.isValid(id)) {
        throw '公园ID不合法';
    }
    const deletionInfo = await parksCollection.deleteOne({ _id: ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
        throw '删除公园失败';
    }
    return true;
}

module.exports = {
    getAllParks,
    getParkById,
    createPark,
    removePark
};
