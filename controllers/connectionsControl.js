
const asyncHandler = require('express-async-handler')
const Connection = require('../models/Connection')
const Station = require('../models/Station')

// @desc get list of all connections
// @route GET /connections
// @access private
const getConnectionList = asyncHandler(async (req, res) => {
    const connections = await Connection.find().sort( { serviceNumber: 'asc' } ).select('-_id').lean()
    if (!connections?.length) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'nie znaleziono żadnych połączeń',
            connectionList: connections
        })  
        return
    }

    res.render('connections.ejs', {
        openPopUp: false,
        message: 'dane połączeń dostarczono zgodnie z protokołem serwera',
        connectionList: connections
    })
    return
})

// @desc create connection
// @route POST /connections
// @access private
const createConnection = asyncHandler(async (req, res) => {   
    
    const { origin, destination, 
        via0, via1, via2, via3, via4, via5, via6, via7, via8, via9,
        via10, via11, via12, via13, via14, via15, via16, via17, via18, via19,
        via20, via21, via22, via23, via24, via25, via26, via27, via28, via29,
        via30, via31, via32, via33, via34, via35, via36, via37, via38, via39,
        viaATime0, viaATime1, viaATime2, viaATime3, viaATime4, viaATime5, viaATime6, viaATime7, viaATime8, viaATime9,
        viaATime10, viaATime11, viaATime12, viaATime13, viaATime14, viaATime15, viaATime16, viaATime17, viaATime18, viaATime19,
        viaATime20, viaATime21, viaATime22, viaATime23, viaATime24, viaATime25, viaATime26, viaATime27, viaATime28, viaATime29,
        viaATime30, viaATime31, viaATime32, viaATime33, viaATime34, viaATime35, viaATime36, viaATime37, viaATime38, viaATime39,
        viaTime0, viaTime1, viaTime2, viaTime3, viaTime4, viaTime5, viaTime6, viaTime7, viaTime8, viaTime9,
        viaTime10, viaTime11, viaTime12, viaTime13, viaTime14, viaTime15, viaTime16, viaTime17, viaTime18, viaTime19,
        viaTime20, viaTime21, viaTime22, viaTime23, viaTime24, viaTime25, viaTime26, viaTime27, viaTime28, viaTime29,
        viaTime30, viaTime31, viaTime32, viaTime33, viaTime34, viaTime35, viaTime36, viaTime37, viaTime38, viaTime39,
        viaP0, viaP1, viaP2, viaP3, viaP4, viaP5, viaP6, viaP7, viaP8, viaP9,
        viaP10, viaP11, viaP12, viaP13, viaP14, viaP15, viaP16, viaP17, viaP18, viaP19,
        viaP20, viaP21, viaP22, viaP23, viaP24, viaP25, viaP26, viaP27, viaP28, viaP29,
        viaP30, viaP31, viaP32, viaP33, viaP34, viaP35, viaP36, viaP37, viaP38, viaP39,
        departure, departurePlatform, departureTrack,
        arrival, arrivalPlatform, arrivalTrack,
        service, serviceEZT, serviceNumber, serviceSpecialNumber, serviceName, 
        days, outOfServiceDays, amenities,
        departureDelay, arrivalDelay } = req.body
    
    const connections = await Connection.find().sort( { c_id: 'asc' } ).select('-_id').lean()
    
    /*
    const stations = await Station.find().select('-_id s_id name').lean()
    if (!(origin in stations) || !(destination in stations)) {
        
        res.render('connections.ejs', {
            openPopUp: true,
            message: '(1 or more) wrong station name value',
            connectionList: connections
        })
        return
    }
    */

    if(!service || !serviceNumber) {
        var c_id = String("TEST"+Math.floor(Math.random()*1000))
    } else {
        var c_id = String(service + serviceNumber)
    }
    
    const duplicate = await Connection.findOne({ c_id }).lean().exec()

    if (duplicate) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'wykryto dane duplikujące istniejące połączenie',
            connectionList: connections
        })
        return
    }

    if (origin == destination) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'wykryto błąd - stacja końcowa niezamierzenie duplikuje stację początkową',
            connectionList: connections
        })
        return
    }

    var viaArray = []
    viaArray.push(via0, via1, via2, via3, via4, via5, via6, via7, via8, via9,
        via10, via11, via12, via13, via14, via15, via16, via17, via18, via19,
        via20, via21, via22, via23, via24, via25, via26, via27, via28, via29,
        via30, via31, via32, via33, via34, via35, via36, via37, via38, via39)

    var viaATimeArray = []
    viaATimeArray.push(viaATime0, viaATime1, viaATime2, viaATime3, viaATime4, viaATime5, viaATime6, viaATime7, viaATime8, viaATime9,
        viaATime10, viaATime11, viaATime12, viaATime13, viaATime14, viaATime15, viaATime16, viaATime17, viaATime18, viaATime19,
        viaATime20, viaATime21, viaATime22, viaATime23, viaATime24, viaATime25, viaATime26, viaATime27, viaATime28, viaATime29,
        viaATime30, viaATime31, viaATime32, viaATime33, viaATime34, viaATime35, viaATime36, viaATime37, viaATime38, viaATime39)

    var viaATimerray = []
    viaATimerray.push(viaTime0, viaTime1, viaTime2, viaTime3, viaTime4, viaTime5, viaTime6, viaTime7, viaTime8, viaTime9,
        viaTime10, viaTime11, viaTime12, viaTime13, viaTime14, viaTime15, viaTime16, viaTime17, viaTime18, viaTime19,
        viaTime20, viaTime21, viaTime22, viaTime23, viaTime24, viaTime25, viaTime26, viaTime27, viaTime28, viaTime29,
        viaTime30, viaTime31, viaTime32, viaTime33, viaTime34, viaTime35, viaTime36, viaTime37, viaTime38, viaTime39)

    var viaPlatformArray = []
    viaPlatformArray.push(viaP0, viaP1, viaP2, viaP3, viaP4, viaP5, viaP6, viaP7, viaP8, viaP9,
        viaP10, viaP11, viaP12, viaP13, viaP14, viaP15, viaP16, viaP17, viaP18, viaP19,
        viaP20, viaP21, viaP22, viaP23, viaP24, viaP25, viaP26, viaP27, viaP28, viaP29,
        viaP30, viaP31, viaP32, viaP33, viaP34, viaP35, viaP36, viaP37, viaP38, viaP39)

    const upperServiceName = String(serviceName).toUpperCase()

    const connectionObject = { 
        "type": "connection",
        "c_id": c_id,
        "copy": "false",

        "origin": origin,
        "destination": destination,
        "viaStations": viaArray,
        "viaArrivalTime": viaATimeArray,
        "viaDepartureTime": viaATimerray,
        "viaPlatform": viaPlatformArray,
        "departure": departure,
        "departurePlatform": departurePlatform,
        "departureTrack": departureTrack,
        "arrival": arrival,
        "arrivalPlatform": arrivalPlatform,
        "arrivalTrack": arrivalTrack,
        "service": service,
        "serviceEZT": serviceEZT,
        "serviceNumber": serviceNumber,
        "serviceName": upperServiceName,
        "serviceSpecialNumber": serviceSpecialNumber,
        "serviceDays": days,
        "outOfServiceDays": outOfServiceDays,
        "amenities": amenities
    }

    const connection = await Connection.create(connectionObject)

    if (connection) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: `utworzono nowe połączenie ${c_id}`, 
            connectionList: connections
        })
        return
    } else {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'błąd serwera - spróbuj ponownie za kilka chwil',
            connectionList: connections 
        })
        return
    }
})

// @desc create connection
// @route POST /copy-connection
// @access private
const copyConnection = asyncHandler(async (req, res) => {   
    
    const { c_id } = req.body
    const connections = await Connection.find().sort( { c_id: 'asc' } ).select('-_id').lean()

    const oldConnection = await Connection.findOne({ c_id }).lean().exec()

    const new_c_id = String("MOD " + oldConnection.serviceNumber + Math.floor(Math.random()*1000000))
    
    const newConnection = { 
        "type": "connection",
        "c_id": new_c_id,
        "copy": "true",

        "origin": oldConnection.origin,
        "destination": oldConnection.destination,
        "viaStations": oldConnection.viaStations,
        "viaArrivalTime": oldConnection.viaArrivalTime,
        "viaDepartureTime": oldConnection.viaDepartureTime,
        "viaPlatform": oldConnection.viaPlatform,
        "departure": oldConnection.departure,
        "departurePlatform": oldConnection.departurePlatform,
        "departureTrack": oldConnection.departureTrack,
        "arrival": oldConnection.arrival,
        "arrivalPlatform": oldConnection.arrivalPlatform,
        "arrivalTrack": oldConnection.arrivalTrack,
        "service": oldConnection.service,
        "serviceEZT": oldConnection.serviceEZT,
        "serviceNumber": oldConnection.serviceNumber,
        "serviceName": oldConnection.serviceName,
        "serviceSpecialNumber": oldConnection.serviceSpecialNumber,
        "serviceDays": oldConnection.serviceDays,
        "outOfServiceDays": oldConnection.outOfServiceDays,
        "amenities": oldConnection.amenities
    }

    const connection = await Connection.create(newConnection)

    if (connection) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: `utworzono nowe połączenie ${c_id} - potrzebne dodatkowe modyfikacje`, 
            connectionList: connections
        })
        return
    } else {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'błąd serwera - spróbuj ponownie za kilka chwil',
            connectionList: connections 
        })
        return
    }
})

// @desc create connection
// @route POST /connections
// @access private
const updateConnection = asyncHandler(async (req, res) => {   
    
    const { old_c_id, copy, origin, destination, 
        via0, via1, via2, via3, via4, via5, via6, via7, via8, via9,
        via10, via11, via12, via13, via14, via15, via16, via17, via18, via19,
        via20, via21, via22, via23, via24, via25, via26, via27, via28, via29,
        via30, via31, via32, via33, via34, via35, via36, via37, via38, via39,
        viaATime0, viaATime1, viaATime2, viaATime3, viaATime4, viaATime5, viaATime6, viaATime7, viaATime8, viaATime9,
        viaATime10, viaATime11, viaATime12, viaATime13, viaATime14, viaATime15, viaATime16, viaATime17, viaATime18, viaATime19,
        viaATime20, viaATime21, viaATime22, viaATime23, viaATime24, viaATime25, viaATime26, viaATime27, viaATime28, viaATime29,
        viaATime30, viaATime31, viaATime32, viaATime33, viaATime34, viaATime35, viaATime36, viaATime37, viaATime38, viaATime39,
        viaTime0, viaTime1, viaTime2, viaTime3, viaTime4, viaTime5, viaTime6, viaTime7, viaTime8, viaTime9,
        viaTime10, viaTime11, viaTime12, viaTime13, viaTime14, viaTime15, viaTime16, viaTime17, viaTime18, viaTime19,
        viaTime20, viaTime21, viaTime22, viaTime23, viaTime24, viaTime25, viaTime26, viaTime27, viaTime28, viaTime29,
        viaTime30, viaTime31, viaTime32, viaTime33, viaTime34, viaTime35, viaTime36, viaTime37, viaTime38, viaTime39,
        viaP0, viaP1, viaP2, viaP3, viaP4, viaP5, viaP6, viaP7, viaP8, viaP9,
        viaP10, viaP11, viaP12, viaP13, viaP14, viaP15, viaP16, viaP17, viaP18, viaP19,
        viaP20, viaP21, viaP22, viaP23, viaP24, viaP25, viaP26, viaP27, viaP28, viaP29,
        viaP30, viaP31, viaP32, viaP33, viaP34, viaP35, viaP36, viaP37, viaP38, viaP39,
        departure, departurePlatform, departureTrack,
        arrival, arrivalPlatform, arrivalTrack,
        service, serviceEZT, serviceNumber, serviceSpecialNumber, serviceName, 
        days, outOfServiceDays, amenities,
        departureDelay, arrivalDelay } = req.body
    
    const connections = await Connection.find().select('-_id').lean()

    var c_id = String(service + serviceNumber)
    
    const duplicate = await Connection.findOne({ c_id }).lean().exec()

    if (duplicate && copy == "true") {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'wykryto dane duplikujące istniejące połączenie',
            connectionList: connections
        })
        return
    }

    if (origin == destination) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'wykryto błąd - stacja końcowa niezamierzenie duplikuje stację początkową',
            connectionList: connections
        })
        return
    }

    var viaArray = []
    viaArray.push(via0, via1, via2, via3, via4, via5, via6, via7, via8, via9,
        via10, via11, via12, via13, via14, via15, via16, via17, via18, via19,
        via20, via21, via22, via23, via24, via25, via26, via27, via28, via29,
        via30, via31, via32, via33, via34, via35, via36, via37, via38, via39)

    var viaATimeArray = []
    viaATimeArray.push(viaATime0, viaATime1, viaATime2, viaATime3, viaATime4, viaATime5, viaATime6, viaATime7, viaATime8, viaATime9,
        viaATime10, viaATime11, viaATime12, viaATime13, viaATime14, viaATime15, viaATime16, viaATime17, viaATime18, viaATime19,
        viaATime20, viaATime21, viaATime22, viaATime23, viaATime24, viaATime25, viaATime26, viaATime27, viaATime28, viaATime29,
        viaATime30, viaATime31, viaATime32, viaATime33, viaATime34, viaATime35, viaATime36, viaATime37, viaATime38, viaATime39)

    var viaATimerray = []
    viaATimerray.push(viaTime0, viaTime1, viaTime2, viaTime3, viaTime4, viaTime5, viaTime6, viaTime7, viaTime8, viaTime9,
        viaTime10, viaTime11, viaTime12, viaTime13, viaTime14, viaTime15, viaTime16, viaTime17, viaTime18, viaTime19,
        viaTime20, viaTime21, viaTime22, viaTime23, viaTime24, viaTime25, viaTime26, viaTime27, viaTime28, viaTime29,
        viaTime30, viaTime31, viaTime32, viaTime33, viaTime34, viaTime35, viaTime36, viaTime37, viaTime38, viaTime39)

    var viaPlatformArray = []
    viaPlatformArray.push(viaP0, viaP1, viaP2, viaP3, viaP4, viaP5, viaP6, viaP7, viaP8, viaP9,
        viaP10, viaP11, viaP12, viaP13, viaP14, viaP15, viaP16, viaP17, viaP18, viaP19,
        viaP20, viaP21, viaP22, viaP23, viaP24, viaP25, viaP26, viaP27, viaP28, viaP29,
        viaP30, viaP31, viaP32, viaP33, viaP34, viaP35, viaP36, viaP37, viaP38, viaP39)

    const upperServiceName = String(serviceName).toUpperCase()

    if (copy == "true") {
        const connectionObject = { 
            "type": "connection",
            "c_id": c_id,
            "copy": "false",
    
            "origin": origin,
            "destination": destination,
            "viaStations": viaArray,
            "viaArrivalTime": viaATimeArray,
            "viaDepartureTime": viaATimerray,
            "viaPlatform": viaPlatformArray,
            "departure": departure,
            "departurePlatform": departurePlatform,
            "departureTrack": departureTrack,
            "arrival": arrival,
            "arrivalPlatform": arrivalPlatform,
            "arrivalTrack": arrivalTrack,
            "service": service,
            "serviceEZT": serviceEZT,
            "serviceNumber": serviceNumber,
            "serviceName": upperServiceName,
            "serviceSpecialNumber": serviceSpecialNumber,
            "serviceDays": days,
            "outOfServiceDays": outOfServiceDays,
            "amenities": amenities
        }

        const connection = await Connection.create(connectionObject)

        if (connection) {
            res.render('connections.ejs', {
                openPopUp: true,
                message: `utworzono nowe połączenie ${c_id}`, 
                connectionList: connections
            })

            var connectionToDelete = await Connection.findOne({ old_c_id }).exec()
            console.log(old_c_id)
            await connectionToDelete.deleteOne()
            return

        } else {
            res.render('connections.ejs', {
                openPopUp: true,
                message: 'błąd serwera - spróbuj ponownie za kilka chwil',
                connectionList: connections 
            })
            return
        }

    } else {
        var connection = await Connection.findOne({ c_id }).exec()
        connection.c_id = c_id
        connection.type = "connection"
        connection.copy = false

        connection.origin = origin
        connection.destination = destination
        connection.viaStations = viaArray
        connection.viaArrivalTime = viaATimeArray
        connection.viaDepartureTime = viaATimerray
        connection.viaPlatform = viaPlatformArray
        connection.departure = departure
        connection.departurePlatform = departurePlatform
        connection.departureTrack = departureTrack
        connection.arrival = arrival
        connection.arrivalPlatform = arrivalPlatform
        connection.arrivalTrack = arrivalTrack
        connection.service = service
        connection.serviceEZT = serviceEZT
        connection.serviceNumber = serviceNumber
        connection.serviceName = upperServiceName
        connection.serviceSpecialNumber = serviceSpecialNumber
        connection.serviceDays = days
        connection.outOfServiceDays = outOfServiceDays
        connection.amenities = amenities

        const updatedConnection = await connection.save()

        if (updatedConnection) {
            res.render('connections.ejs', {
                openPopUp: true,
                message: `pomyślnie zaktualizowano dane połączenia ${c_id}`, 
                connectionList: connections
            })
            return
        } else {
            res.render('connections.ejs', {
                openPopUp: true,
                message: 'błąd serwera - spróbuj ponownie za kilka chwil',
                connectionList: connections 
            })
            return
        }
    }
})

// @desc delete connection
// @route DELETE /connections
// @access private
const deleteConnection = asyncHandler(async (req, res) => {

    const { c_id } = req.body
    const connections = await Connection.find().select('-_id').lean()

    if (!c_id) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'wymagany identyfikator c_id połączenia',
            connectionList: connections
        })
        return
    }

    const connection = await Connection.findOne({ c_id }).exec()

    if (!connection) {
        res.render('connections.ejs', {
            openPopUp: true,
            message: 'nie znaleziono połączenia',
            connectionList: connections
        })
        return
    }

    const result = await connection.deleteOne()

    res.render('connections.ejs', {
        openPopUp: true,
        message: `usunięto połączenie ${result.c_id} ${result.serviceName}`,
        connectionList: connections 
    })
    return
})

module.exports = {
    getConnectionList,
    createConnection,
    copyConnection,
    updateConnection,
    deleteConnection
}