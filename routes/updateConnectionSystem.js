const express = require('express')
const router = express.Router()

const connectionControl = require('../controllers/connectionsControl')

router.route('/')
    .get((req, res) => {
        res.render('403.ejs')
    })
    //.post(connectionControl.updateConnection)

module.exports = router