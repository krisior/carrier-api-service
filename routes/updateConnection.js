const express = require('express')
const router = express.Router()

const Connection = require('../models/Connection')
const Station = require('../models/Station')

const asyncHandler = require('express-async-handler')

router.route('/')
    .post(asyncHandler(async (req, res) => {
        const { c_id } = req.body
        
        const connectionExec = await Connection.findOne({ c_id }).lean().exec()
        const stations = await Station.find().sort( { name: 'asc'} ).select('-_id s_id name').lean()

        if(connectionExec) {
            res.render('updateConnection.ejs', {
                openPopUp: false,
                message: 'połączenie zostało pomyślnie załadowane',
                stationsList: stations,
                connection: connectionExec
            })
            return
        } else {
            res.render('updateConnection.ejs', {
                openPopUp: true,
                message: 'nie znaleziono połączenia',
                stationsList: stations,
                connection: connectionExec
            })
            return
        }
    }))
    
module.exports = router