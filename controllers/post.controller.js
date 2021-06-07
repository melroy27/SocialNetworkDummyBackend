const mongoose = require('mongoose');

const Post = require('../models/post');

/**
 * method to create a new post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.createPost = async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        createdBy: {
            userId: req.body.createdBy.userId,
            name: req.body.createdBy.name
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

/**
 * Function to view a users post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.viewUserPosts = async (req, res, next) => {
    let id = req.query.id
    try {
        let posts = await Post.find({
            'createdBy.userId': id
        })
        if (posts != null) {
            res.json({
                status: true,
                posts: posts
            })
        } else {
            return res.sendStatus(400).json({
                status: false,
                message: "No posts found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}