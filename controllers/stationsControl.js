const Station = require('../models/Station')

const asyncHandler = require('express-async-handler')

// @desc get list of all stations
// @route GET /stations
// @access private
const getStationList = asyncHandler(async (req, res) => {
    const stations = await Station.find().sort( { name: 'asc', s_id: 'desc' } ).select('-_id s_id name upper weight').lean()
    if (!stations?.length) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'nie znaleziono danych stacyjnych',
            stationsList: stations
        })
        return
    }

    res.render('stations.ejs', {
        openPopUp: false,
        message: 'dane stacyjne dostarczono zgodnie z protokołem serwera',
        stationsList: stations
    })
    return
})

// @desc create station
// @route POST /stations
// @access private
const createStation = asyncHandler(async (req, res) => {   
    
    const { s_id, name } = req.body
    const stations = await Station.find().sort( { name: 'asc', s_id: 'desc' } ).select('-_id s_id name upper').lean()

    if (!s_id || !name) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'nie wypełniono wszystkich obowiązkowych pól',
            stationsList: stations
        })
        return
    }
    
    const duplicate = await Station.findOne({ s_id }).lean().exec()

    if (duplicate) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'zudplikowano istnięce dane stacyjne',
            stationsList: stations
        })
        return
    }

    // creating additional names
    const slugName  = String(name).normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\u0142/g, "l").replace(/\s/g, '').toLowerCase()
    const upperName = String(name).normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\u0142/g, "l").toUpperCase()

    const stationObject = { 
        "type": "station", 
        "s_id": s_id,
        "name": name,
        "upper": upperName,
        "weight": 0,
        "slug": slugName
    }

    // create and store station
    const station = await Station.create(stationObject)

    if (station) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: `dodano nową stację ${s_id} ${name}`, 
            stationsList: stations
        })
        return
    } else {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'błąd serwera - spróbuj ponownie za kilka chwil',
            stationsList: stations 
        })
        return
    }
})

// @desc update station information
// @route PATCH /stations
// @access private
const updateStation = asyncHandler(async (req, res) => {
    const { s_id, new_s_id, name, weight } = req.body
    const stations = await Station.find().select('-_id s_id name upper weight').lean()

    if (!s_id) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'wymagany identyfikator s_id stacji',
            stationsList: stations
        })
        return
    }

    const stationCheck = await Station.findOne({ s_id }).lean().exec()

    if (!stationCheck) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'nie znaleziono stacji',
            stationsList: stations
        })
        return
    }

    var station = await Station.findOne({ s_id }).exec()

    // creating additional names
    const upperName = String(name).normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\u0142/g, "l").replace(/\u0141/g, "L").toUpperCase()
    const slugName  = String(name).normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\u0142/g, "l").replace(/\s/g, '').toLowerCase()

    station.s_id    = new_s_id
    station.name    = name
    station.upper   = upperName
    station.weight  = weight
    station.slug    = slugName

    const updatedStation = await station.save()

    if (updatedStation) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: `pomyślnie zaktualizowano dane stacji ${updatedStation.s_id} ${updatedStation.name}`,
            stationsList: stations
        })
        return
    } else {
        res.render('stations.ejs', {
            openPopUp: true,
            message: 'błąd serwera - spróbuj ponownie za kilka chwil',
            stationsList: stations 
        })
        return
    }
})

// @desc delete station
// @route DELETE /stations
// @access private
const deleteStation = asyncHandler(async (req, res) => {
    const { s_id } = req.body
    const stations = await Station.find().sort( { name: 'asc', s_id: 'desc' } ).select('-_id s_id name upper').lean()

    if (!s_id) {
        res.render('stations.ejs', {
            openPopUp: true,
            message: `wymagany identyfikator s_id stacji`,
            stationsList: stations
        })
        return
    }

    const station = await Station.findOne({ s_id }).exec()

    if (!station) {
        res.render('stations.ejs', {
            openPopUp: false,
            message: `nie znaleziono stacji`,
            stationsList: stations
        })
        return
    }

    const result = await station.deleteOne()

    res.render('stations.ejs', {
        openPopUp: true,
        message: `usunięto stację ${result.s_id} ${result.name}`,
        stationsList: stations
    })
    return
})

module.exports = {
    getStationList,
    createStation,
    updateStation,
    deleteStation
}