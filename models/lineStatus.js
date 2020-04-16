// importing dependencies
const mongoose = require('mongoose');

// schema for line objects
const lineSchema = mongoose.Schema({
    placeId: {type: String, required: false},
    weekday: {type: Number, required: false, min: 0, max: 6},
    hour: {type: Number, required: false, min: 0, max: 23}, 
    busy: {type: Number, required: true, min: 0, max: 3},
    date: {type: String, required: false, max: 10}
});

// exporting the line object
const LineStatus = module.exports = mongoose.model('LineStatus', lineSchema);

