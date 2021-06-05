const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    askedBy: {
        userId: mongoose.SchemaTypes.ObjectId,
        name: String
    },
    askedOn: Date,
    content: String
})

const post = mongoose.model('post', PostSchema, 'post')
module.exports = post
