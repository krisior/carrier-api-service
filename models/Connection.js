const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
    
    type: String,
    c_id: String,
    copy: String,
    
    origin: String,
    destination: String,
    viaStations: Array,
    viaArrivalTime: Array,
    viaDepartureTime: Array,
    viaPlatform: Array,
    departure: String,
    departurePlatform: String,
    departureTrack: String,
    departureDelay: Number,
    arrival: String,
    arrivalPlatform: String,
    arrivalTrack: String,
    arrivalDelay: Number,
    service: String,
    serviceEZT: String,
    serviceNumber: String,
    serviceSpecialNumber: String,
    serviceName: String,
    serviceDays: Array,
    outOfServiceDays: String,
    amenities: Array

})

module.exports = mongoose.model('connection', connectionSchema)