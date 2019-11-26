const User = require('../models/models').User

exports.details = (req, res) => {
    User.findById(req.user)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({noUserExists: 'The user does not exist'}))
}

//need to add password hashing?
exports.createUser = (req, res) => {
    let email =  req.body.email
    let password = req.body.password
    if(User.find({Email: email})) {
        res.json({userExists: 'A user with that email already exists'})
    }
    else{
        User.create(req.body)
        .then(res.json({userCreated: 'Successfully created user'}))
        //need to handle error if user creation unsuccessful
        .catch(err => console.log(err))
    }
}

//needs error handling
exports.deleteUser = (req, res) => {
    let id = req.user
    User.deleteOne({_id: id}, (err) => {
        return console.log(err)
    })
}

//update user fields
exports.updateUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    User.find({_id: req.user})
    .then(User.update())
}