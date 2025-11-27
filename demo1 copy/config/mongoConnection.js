
const { MongoClient } = require('mongodb');

const mongoConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'cityParkExplorer'
};

let _connection = undefined;
let _db = undefined;

async function connectDB() {
    if (!_connection) {

        const client = new MongoClient(mongoConfig.url, { useUnifiedTopology: true });
        await client.connect();
        _connection = client;
        _db = client.db(mongoConfig.dbName);
        console.log('MongoDB 连接已建立');
    }
    return _db;
}

module.exports = connectDB;
