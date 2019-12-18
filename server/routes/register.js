const User = require('../models/models').User
const bcrypt = require('bcrypt')

exports.register = function (req, res, next) {
    let email = req.body.email
    let password = req.body.password
    User.findOne({ email: email }, (err, user) => {
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
                User.create({ email: email, password: hash })
                    .then(user => res.json({ success: true, user: user.email, message: "user with email: " + user.email + " was created" })
                        .catch(err => console.log(err)))
            })
        })
    })
}