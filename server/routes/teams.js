const express = require('express')
const router = express.Router()
const teamsController = require('../controllers/teamsController')

//returns all teams of a user
router.get('/', teamsController.all)
//returns a specific teams information
router.get('/:teamId', teamsController.team)
//creates a new team for a user
router.post('/create', teamsController.create)
//deletes a team for a user
router.delete('/:teamId/delete', teamsController.remove)

module.exports = router
