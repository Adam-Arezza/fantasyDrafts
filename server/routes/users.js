const express = require('express')
const router = express.Router()

router.get('/:userId', userController.details)
router.post('/create', userController.createUser)
router.post('/:userId/delete', userController.deleteUser)
router.put('/:userId/update', userController.updateUser)

module.exports = router
