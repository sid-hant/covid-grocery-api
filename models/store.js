// importing dependencies
const mongoose = require('mongoose');

// schema for time objects
const timeSchema = mongoose.Schema({
    open: {type: String, default: '0000', required: true, minlength: 4, maxlength: 4},
    close: {type: String, default: '0000', required: true, minlength: 4, maxlength: 4}
},{ _id : false });

// senior hour schema
const seniorHourSchema = mongoose.Schema({
    exists: {type: Boolean, required: true, default: false},
    hours: {
        monday: {type: timeSchema},
        tuesday: {type: timeSchema},
        wednesday: {type: timeSchema},
        thursday: {type: timeSchema},
        friday: {type: timeSchema},
        saturday: {type: timeSchema},
        sunday: {type: timeSchema}
    }
},{ _id : false });


// store schema
const storeSchema = mongoose.Schema({
    placeId: {type: String, required: true},
    seniorHours: {type: [seniorHourSchema], required: true},
});

const Store = module.exports = mongoose.model('Store', storeSchema);

