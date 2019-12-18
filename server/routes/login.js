const User = require('../models/models').User
const jwt = require('jsonwebtoken')
const secret = require('../config').get(process.env.NODE_ENV).secret
const bcrypt = require('bcrypt')

exports.login = function (req, res) {
    User.findOne({ Email: req.body.email }, (err, user) => {
        if (err) {
            return res.send(err)
        }
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        else {
            bcrypt.compare(req.body.password, user.Password, (err, response) => {
                if (err) {
                    console.log("There was an error...")
                    // console.log(req.body.password)
                    // console.log(user.Password)
                    console.log(err)
                    return res.json({ success: false, message: "could not authenticate user" })
                }
                if (response === true) {
                    let payload = {
                        userId: user._id
                    }
                    let token = jwt.sign(payload, secret, { expiresIn: 86400 * 7 })
                    return res.json({ success: true, token: token })
                }
                return res.json({ success: false, message: "Invalid password" })
            })
        }
    })
}
