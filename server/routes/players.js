const express = require('express')
const router = express.Router()

router.get('/:userId', playersController.all)
router.get('/:userId/player', playersController.player)
router.post('/:userId/add', playersController.add)
router.delete('/:userId/delete', playersController.remove)

module.exports = router
