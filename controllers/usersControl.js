const User = require('../models/User')
const path = require('path')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => { 
    const users = await User.find().select('-_id username active').lean()

    if (!users?.length) {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'nie znaleziono dostępnych tokenów użytkowników',
            usersList: users
        })
        return
    }

    res.render('users.ejs', {
        openPopUp: false,
        message: 'dane użytkowników dostarczono zgodnie z protokołem serwera',
        usersList: users
    })
    return
})

// @desc create new user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, confirm_password } = req.body
    const users = await User.find().select('-_id username active').lean()

    // confirm the data
    if (!username || !password || password != confirm_password) {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'nie wypełniono wszystkich obowiązkowych pól',
            usersList: users
        })
        return
    }

    // check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'zduplikowano dane istniejącego użytkownika',
            usersList: users
        })
        return
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = { 
        username, 
        "password": hashedPassword,
        "active": 0
    }

    // create and store new user
    const user = await User.create(userObject)

    if (user) {
        res.render('users.ejs', {
            openPopUp: true,
            message: `dodano nowego użytkownika ${username}`,
            usersList: users
        })
        return
    } else {
        res.render('users.ejs', {
            openPopUp: true,
            message: `błąd serwera - spróbuj ponownie za kilka chwil`,
            usersList: users
        })
        return
    }
})

// @desc update user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async (req, res) => {

    const { id, username, active, password } = req.body
    const users = await User.find().select('-_id username active').lean()

    if (!id || !username || typeof active !== 'boolean') {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'nie wypełniono wszystkich obowiązkowych pól',
            usersList: users
        })
        return
    }

    const user = await User.findById(id).exec()

    if (!user) {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'nie znaleziono użytkownika',
            usersList: users
        })
        return
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        res.render('users.ejs', {
            openPopUp: true,
            message: 'zduplikowano dane istniejącego użytkownika',
            usersList: users
        })
        return
    }

    user.username = username
    user.active = active

    if (password) {
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    if (updatedUser) {
        res.render('users.ejs', {
            openPopUp: true,
            message: `pomyślnie zaktualizowano dane użytkownika ${updatedUser.username}`,
            usersList: users
        })
        return
    } else {
        res.render('users.ejs', {
            openPopUp: true,
            message: `błąd serwera - spróbuj ponownie za kilka chwil`,
            usersList: users
        })
        return
    }
})

// @desc delete user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.body
    const users = await User.find().select('-_id username active').lean()

    if (!username) {
        res.render('users.ejs', {
            openPopUp: true,
            message: `wymagany identyfikator (nazwa użytkownika)`,
            usersList: users
        })
        return
    }

    const user = await User.findOne({ username }).exec()

    if (!user) {
        res.render('users.ejs', {
            openPopUp: true,
            message: `nie znaleziono użytkownika`,
            usersList: users
        })
        return
    }

    const result = await user.deleteOne()

    if (result) {
        res.render('users.ejs', {
            openPopUp: true,
            message: `usunięto użytkownika ${result.username} - id ${result._id}`,
            usersList: users
        })
        return
    } else {
        res.render('users.ejs', {
            openPopUp: true,
            message: `błąd serwera - spróbuj ponownie za kilka chwil`,
            usersList: users
        })
        return
    }
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}