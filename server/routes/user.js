const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.info)
router.put('/update', userController.update)

module.exports = router