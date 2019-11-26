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
//returns all leagues of a user
router.get('/', leaguesController.all)
//creates a new league
router.post('/create', leaguesController.create)
//joins user to a league
router.post('/join', leaguesController.joinLeague)
//deletes a league
router.delete('/delete', leaguesController.remove)
//removes user from a league
router.delete('/leaveLeague', leaguesController.leaveLeague)

module.exports = router
