const express = require('express')
const router = express.Router()

const connectionControl = require('../controllers/connectionsControl')

router.route('/')
    .get(connectionControl.getConnectionList)
    .post(connectionControl.updateConnection)

module.exports = router