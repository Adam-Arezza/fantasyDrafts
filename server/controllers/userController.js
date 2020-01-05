const User = require('../models/models').User

exports.info = (req, res) => {
    User.findById({_id: req.decoded.userId}, (err, user) => {
        if(err){
            console.log(err)
        }
        return res.json({success: true, user: user.Email})
    })
}

exports.update = (req, res) => {
    
}