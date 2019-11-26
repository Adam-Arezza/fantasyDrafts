const express = require('express')
const router = express.Router()

//returns all teams of a user
router.get('/:userId', teamsController.all)
//returns a specific teams information
router.get('/:userId/:teamId', teamsController.team)
//creates a new team for a user
router.post('/:userId/create', teamsController.create)
//deletes a team for a user
router.delete('/:userId/delete', teamsController.remove)

module.exports = router
