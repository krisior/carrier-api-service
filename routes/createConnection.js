const express = require('express')
const router = express.Router()

const connectionControl = require('../controllers/connectionsControl')
const Station = require('../models/Station')

const asyncHandler = require('express-async-handler')

router.route('/')
    .get(asyncHandler(async (req, res) => {
        const stations = await Station.find().sort( { name: 'asc'} ).select('-_id s_id name').lean()

        if(stations) {
            res.render('createConnection.ejs', {
                stationsList: stations
            })
        }
    }))
    .post(connectionControl.createConnection)

module.exports = router