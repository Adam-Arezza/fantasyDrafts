const express = require('express')
const router = express.Router()

router.get('/:userId', (req, res, next) => {
    if (!req.params.userId) {
        //bad request
        res.status(400).send("No user ID")
    }
    else {
        req.user = req.params.userId
        next()
    }
})
//returns user account info
router.get('/', userController.details)
//creates a new user in database
router.post('/create', userController.createUser)
//deletes a user from the database
router.post('/delete', userController.deleteUser)
//updates user account info 
router.put('/update', userController.updateUser)

module.exports = router
