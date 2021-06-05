const mongoose = require('mongoose');
const User = require('../models/user')
const UserData = require('../models/userData')

module.exports.verifyUser = async (req, res, next) => {
    console.log(req.query.id)
    try {
        let email = req.query.id
        let usrInfo = await User.findOne({
            emailId: email
        })
        console.log(usrInfo)
        if (usrInfo !== null) {
            res.status(200).json({
                status: true,
                message: 'User Exists'
            })
        } else {
            res.status(404).json({
                status: false,
                message: 'User Does not Exist'
            })

        }
        next()
    } catch (error) {
        console.log('Seems like an error-> ', error)
    }
}

module.exports.createUser = async (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        photoUrl: req.body.photoUrl,
        provider: req.body.provider,
        emailId: req.body.emailId,
        about: req.body.aboutMe,
        createdOn: Date.now()
    })

    try {
        await newUser.save(function (err, doc) {
            if (err) {
                console.log('Err Saving new user Doc->', err)
            } else {
                console.log('Saving new User Document', doc)
                this.createUserInfo(doc)
            }
        });
        res.status(201).json({
            status: true,
            message: 'User Created Successfully'
        })
        next()
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Could not Create a user'
        });

    }
    createUserInfo = async (doc) => {
        try {
            const userData = new UserData({
                userId: doc._id,
                followers: []
            })
            await userData.save(function (err, doc) {
                if (err) {
                    console.log('Error saving user Data->', err)
                } else {
                    console.log('Saving userData Document', doc)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports.allUsers = async (req, res, next) => {
    try {
        let allUsrData = await User.find({}, { "name": 1, "photoUrl": 1, _id: 1 })
        res.status(200).json({
            status: true,
            data: allUsrData
        })
    } catch (error) {
        console.log("erro fetching all users info ->")
    }
}

module.exports.follow = async (req, res, next) => {
    console.log(req.body)
    try {
        let userId = req.body.usrId
        let usrInfo = await UserData.findOne({
            userId: userId
        })
        console.log(usrInfo)

        if (usrInfo !== null) {
            let response = addFollowers(usrInfo._id, req.body.toFollowId, req.body.toFollowName)
            response.then(success => {
                res.send({
                    status: true,
                    message: 'Success in adding a new follower'
                })
            },
                rejected => {
                    res.send({
                        status: false,
                        message: 'failure  in adding a new follower'
                    })
                })
        } else {
            res.status(404).json({
                status: false,
                message: 'User does not Exists'
            })
        }
    } catch (error) {
        console.log('Seems like an error-> ', error)
    }

    async function addFollowers(docId, followId, followName) {
        try {
            let filter = {
                _id: mongoose.Types.ObjectId(docId)
            }
            let updatedData = {
                $addToSet: {
                    followers: {
                        "userId": followId,
                        "userName": followName
                    }
                }
            }
            return UserData.updateOne(filter, updatedData)
        } catch (error) {
            console.log('Error->', error)
        }
    }
}