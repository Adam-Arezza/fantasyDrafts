const express = require('express')
const router = express.Router()

router.get('/:userId', teamsController.all)
router.get('/:userId/team', teamsController.player)
router.post('/:userId/create', teamsController.create)
router.delete('/:userId/delete', teamsController.remove)

module.exports = router
