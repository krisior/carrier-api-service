const express = require('express')
const router = express.Router()

const stationControl = require('../controllers/stationsControl')
const Station = require('../models/Station')

const asyncHandler = require('express-async-handler')

router.route('/')
    .get(asyncHandler(async (req, res) => {
        const stations = await Station.find().sort( { name: 'asc'} ).select('-_id s_id name').lean()

        if(stations) {
            res.render('updateStation.ejs', {
                stationsList: stations
            })
        }
    }))
    .post(stationControl.updateStation)

module.exports = router