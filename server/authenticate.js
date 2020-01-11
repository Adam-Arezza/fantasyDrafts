const jwt = require('jsonwebtoken')
const config = require('./config').get(process.env.NODE_ENV)

let auth = {
    authenticated: function (req, res, next) {
        // console.log(req.headers)
        // console.log(req.body)
        let token = req.body.token || req.query.token || req.headers.authorization
        if (!token) {
            return res.json({ success: false, message: "No token" })
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "failed to authenticate token" })
            }
            req.decoded = decoded
            next()
        })
    }
}

module.exports = auth;
