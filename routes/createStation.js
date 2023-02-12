const express = require('express')
const router = express.Router()

const stationControl = require('../controllers/stationsControl')

router.route('/')
    .get((req, res) => {
        res.render('createStation.ejs')
    })
    .post(stationControl.createStation)

module.exports = router