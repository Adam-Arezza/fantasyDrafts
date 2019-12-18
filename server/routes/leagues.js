const express = require('express')
const router = express.Router()

//returns all leagues of a user
router.get('/', leaguesController.all)
//creates a new league
router.post('/create', leaguesController.create)
//joins user to a league
router.post('/:leagueId/join', leaguesController.joinLeague)
//deletes a league
router.delete('/:leagueId/delete', leaguesController.delete)
//removes user from a league
router.delete('/:leagueId/leaveLeague', leaguesController.leaveLeague)

module.exports = router
