const express = require('express')
const router = express.Router()

router.get('/:userId', leaguesController.all)
router.get('/:userId/league', leaguesController.league)
router.post('/:userId/create', leaguesController.create)
router.delete('/:userId/delete', leaguesController.remove)

module.exports = router
