const express = require('express')
const router = express.Router()

const userControl = require('../controllers/usersControl')

router.route('/')
    .get((req, res) => {
        res.render('403.ejs')
    })
    .post(userControl.updateUser)

module.exports = router