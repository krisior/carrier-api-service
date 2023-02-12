require('dotenv').config()

const express = require('express')

const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

const { logger, logEvents } = require('./middleware/loggerCompound')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const CORS = require('cors')
const corsOptions = require('./config/corsOptions')

const connectDB = require('./config/databaseConnection')
const mongoose = require('mongoose')
const { urlencoded } = require('express')

connectDB()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger)
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(CORS(corsOptions))

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
    res.status(404)
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
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

