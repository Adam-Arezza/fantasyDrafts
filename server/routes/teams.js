const express = require('express')
const router = express.Router()

router.get('/:userId', (req, res, next) => {
    if (!req.params.userId) {
        //bad request
        //add error handler
        res.status(400).send("No user ID")
    }
    else {
        req.user = req.params.userId
        next()
    }
})
//returns all teams of a user
router.get('/', teamsController.all)
//returns a specific teams information
router.get('/:teamId', teamsController.team)
//creates a new team for a user
router.post('/create', teamsController.create)
//deletes a team for a user
router.delete('/:teamId/delete', teamsController.remove)

module.exports = router
