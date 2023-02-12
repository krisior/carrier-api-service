const express = require('express')
const router = express.Router()

const connectionControl = require('../controllers/connectionsControl')

const asyncHandler = require('express-async-handler')

router.route('/')
    .post(connectionControl.copyConnection)
    
module.exports = router