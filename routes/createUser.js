const express = require('express')
const router = express.Router()

const userControl = require('../controllers/usersControl')

router.route('/')
    .get((req, res) => {
        res.render('createUser.ejs')
    })
    .post(userControl.createNewUser)

module.exports = router