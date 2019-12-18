const User = require('../models/models').User
const jwt = require('jsonwebtoken')
const config = require('../config').get(process.env.NODE_ENV)
const bcrypt = require('bcrypt')

exports.login = function (req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send(err)
        }
        if (!user) {
            res.status(404).send("User not found")
        }
        else {
            bcrypt.compare(req.body.password, user.password, (err, res) => {
                if (err) {
                    console.log(err)
                }
                if (res === true) {
                    let payload = {
                        userId: user._id
                    }
                    let token = jwt.sign(payload, config.secret, { expiresIn: 86400 * 7 })
                    res.json({ success: true, token: token })
                }
                else {
                    res.json({ success: false, message: "Invalid password" })
                }
            })
        }
    })
}
