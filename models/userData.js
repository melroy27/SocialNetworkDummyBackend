const mongoose = require('mongoose');

const userAppInfo = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    followers: [{
        _id: false,
        userId: mongoose.SchemaTypes.ObjectId,
        userName: String
    }]
})
const user = mongoose.model('userAppInfo', userAppInfo, 'userAppInfo')
module.exports = user