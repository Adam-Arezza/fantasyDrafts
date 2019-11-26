const express = require('express')
const router = express.Router()

//returns details of a player
router.get('/:playerId', playersController.player)
//adds a player to a team
router.post('/:playerId/:teamId', playersController.add)
//removes a player from a team
router.delete('/:playerId/:teamId', playersController.remove)

module.exports = router
