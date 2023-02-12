const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersControl')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.deleteUser)
    
module.exports = router