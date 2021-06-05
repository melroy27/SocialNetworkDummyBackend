const mongoose = require('mongoose');

const Post = require('../models/post');

module.exports.createPost = async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        askedBy: {
            userId: req.body.askedBy.userId,
            name: req.body.askedBy.name
        },
        askedOn: Date.now()
    });

    try {
        await post.save();
        console.log(post);
        res.status(201).json({
            status: true,
            message: 'Post Added Successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Post UnSuccessful'
        });
        console.log(error);
    }

}