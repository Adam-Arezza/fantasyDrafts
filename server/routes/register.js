const User = require('../models/models').User
const jwt = require('jsonwebtoken')
const secret = require('../config').get(process.env.NODE_ENV).secret
const bcrypt = require('bcrypt')

exports.register = function (req, res) {
    let email = req.body.email
    let password = req.body.password
    User.findOne({ Email: email }, (err, user) => {
        if (err) {
            return res.json({ success: false, message: "failed to create user" })
        }
        if (user) {
            return res.json({ success: false, message: "A user with that email already exists!" })
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return res.json({ success: false, message: "An error occured" })
                }
                User.create({ Email: email, Password: hash }, function(err, user) {
                    if(err){
                        console.log(err)
                        return res.json({success: false, message:"user could not be created"})
                    }
                    let payload = {
                        userId: user._id,
                        email: email
                    }
                    let token = jwt.sign(payload, secret, { expiresIn: 86400 * 7 })
                    return res.json({success: true, message: "user was created successfully", token: token})
                })
            })
        })
    })
}