const express = require('express')
const router = express.Router()

const connectionControl = require('../controllers/connectionsControl')

router.route('/')
    .post(connectionControl.deleteConnection)

module.exports = router