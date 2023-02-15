require('dotenv').config()

const express = require('express')

const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

const { logger, logEvents } = require('./middleware/loggerCompound')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const CORS = require('cors')

const connectDB = require('./config/connection')
const mongoose = require('mongoose')
const { urlencoded } = require('express')

const compression = require('compression');
const helmet = require('helmet');

connectDB()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger)
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

// compress the HTTP response sent back to a client, significantly reduce the time required for the client to get and load the page
app.use(compression())

// set appropriate HTTP headers that help protect your app from well-known web vulnerabilities
app.use(helmet())
app.use(CORS())

app.use(express.static('public'))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/users'))
app.use('/create-user', require('./routes/createUser'))
app.use('/update-user', require('./routes/updateUser'))

app.use('/stations', require('./routes/stations'))
app.use('/create-station', require('./routes/createStation'))
app.use('/update-station', require('./routes/updateStation'))

app.use('/connections', require('./routes/connections'))
app.use('/create-connection', require('./routes/createConnection'))
app.use('/copy-connection', require('./routes/copyConnection'))
app.use('/update-connection', require('./routes/updateConnection'))
app.use('/update-connection-system', require('./routes/updateConnectionSystem'))
app.use('/delete-connection', require('./routes/deleteConnection'))

app.use('/connections/details', require('./routes/details'))

app.all('*', (req, res) => {
    // res.status(404)
    if (req.accepts('html')) {
        res.render('404.ejs')
    } else if (req.accepts('json')) {
        res.json({_message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'errorlogMGDB.log')
})

