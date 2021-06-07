const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');

router.get('/verifyUser', ctrlUser.verifyUser);
router.post('/createUser', ctrlUser.createUser);
router.post('/createPost', ctrlPost.createPost);
router.get('/getAllUsers', ctrlUser.allUsers);
router.post('/follow', ctrlUser.follow);
router.get('/posts', ctrlPost.viewUserPosts);
router.get('/exceptCurrentUser', ctrlUser.exceptCurrentUser);
router.get('/followingList', ctrlUser.listOfFollowing);

module.exports = router
