const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    MongoClient.connect(
        'mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connected to MongoDB !');
        _db = client.db(); 
        // sau khi có db - connect đc với database, mới gọi cb()
        cb();
    })
    .catch(err => {
        console.log('err in mongoclient: ', err);
        throw err;
    })
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database found!'
};

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;