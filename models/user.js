const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    photoUrl: String,
    provider: String,
    createdOn: Date,
    emailId: String,
    about: String
})
const user = mongoose.model('user', userSchema, 'user')
module.exports = user
