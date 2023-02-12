const express = require('express')
const router = express.Router()

const stationControl = require('../controllers/stationsControl')

router.route('/')
    .get(stationControl.getStationList)
    .post(stationControl.deleteStation)
    
module.exports = router