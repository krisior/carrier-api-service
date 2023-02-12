const express = require('express')
const router = express.Router()

const Connection = require('../models/Connection')

const asyncHandler = require('express-async-handler')

router.route('/')
    .post(asyncHandler(async (req, res) => {
        const { c_id } = req.body
        
        const connectionExec = await Connection.findOne({ c_id }).lean().exec()

        if(connectionExec) {
            res.render('details.ejs', {
                openPopUp: false,
                message: 'połączenie zostało pomyślnie załadowane',
                connection: connectionExec
            })
            return
        } else {
            res.render('details.ejs', {
                openPopUp: true,
                message: 'nie znaleziono połączenia',
                connection: connectionExec
            })
            return
        }
    }))


module.exports = router