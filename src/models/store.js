// importing dependencies
const mongoose = require('mongoose');

// schema for time objects
const timeSchema = mongoose.Schema({
    open: {type: Number, required: true, min: 0, max: 23},
    close: {type: Number, required: true, min: 0, max: 23}
},{ _id : false });

// senior hour schema
const seniorHourSchema = mongoose.Schema({
    exists: {type: Boolean, required: true},
    hours: {
        monday: {type: timeSchema},
        tuesday: {type: timeSchema},
        wednesday: {type: timeSchema},
        friday: {type: timeSchema},
        saturday: {type: timeSchema},
        sunday: {type: timeSchema}
    }
},{ _id : false });

// hours of operation schema
const hoursSchema = mongoose.Schema({
    monday: {type: timeSchema, required: true},
    tuesday: {type: timeSchema, required: true},
    wednesday: {type: timeSchema, required: true},
    friday: {type: timeSchema, required: true},
    saturday: {type: timeSchema, required: true},
    sunday: {type: timeSchema, required: true}
},{ _id : false });


// // lineLength schema
// const lineLengthSchema = mongoose.Schema({
//     monday: {type: [Number], required: true},
//     tuesday: {type: [Number], required: true},
//     wednesday: {type: [Number], required: true},
//     thursday: {type: [Number], required: true},
//     friday: {type: [Number], required: true},
//     saturday: {type: [Number], required: true},
//     sunday: {type: [Number], required: true}
// },{ _id : false });


// store schema
const storeSchema = mongoose.Schema({
    name: {type: String, required: true, text: true},
    address: {type: String, required: true},
    city: {type: String, required: true, text: true},
    province: {type: String, required: true, text: true},
    country: {type: String, required: true, text: true},
    seniorHours: {type: [seniorHourSchema], required: true},
    hours: {type: [hoursSchema], required: true},
});

// Creating index
storeSchema.index({
    name: 'text',
    city: 'text',
    province: 'text',
    country: 'text'
});

const Store = module.exports = mongoose.model('Store', storeSchema);

// module.exports.get = function (callback, limit) {
//     Store.find(callback).limit(limit);
// }