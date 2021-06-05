const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');

router.get('/verifyUser', ctrlUser.verifyUser);
router.post('/createUser', ctrlUser.createUser);
router.post('/createPost', ctrlPost.createPost);
router.get('/getAllUsers', ctrlUser.allUsers)
router.post('/follow', ctrlUser.follow)

module.exports = router

// /**
//  * Endpoint for retriving a user Detail
//  */
// router.get("/api/user/:id", (req, res, next) => {
//     try {
//         let userDetail = await User.findOne({
//             _id: mongoose.Types.ObjectId(req.params.id)
//         })
//         if (userDetail) {
//             res.status(200).json(userDetail);
//         }
//     } catch {
//         res.status(404).json({ message: "User Detail not found!" });
//     }
// });

// /**
//  * Endpoint for following
//  */
