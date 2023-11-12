const mongoose = require('mongoose');

function connectMongo(url){
    return mongoose.connect(url);
}


exports.connectMongo = connectMongo;