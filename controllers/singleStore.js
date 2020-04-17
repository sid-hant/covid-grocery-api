// importing dependencies
const Store = require('../models/store');
const {Client, Status} = require("@googlemaps/google-maps-services-js");


// GET -> get a store's information
exports.storeInformation = async (req, res) => {
    // calling a google api client
    const client = new Client({});
    // Get the placeId
    const placeId = req.params.placeId;
    // Run the google api, to get the place details
    client
        .placeDetails({
            params: {
                // Parameter is the place Id
                placeid: placeId,
                // API key defined in the .ENV file
                key: process.env.GOOGLE_API_KEY
            },
            timeout: 1000, // milliseconds
        })
        // results of stores found
        .then((place) => {
            // If the API does not return an OK response, return errors
            if (place.data.status != Status.OK) return res.status(400).json({message: 'Store not found or does not exist', code:400});
            // Look if the place exists in the database
            Store.findOne({placeId: placeId})
                // search results
                .then(store => {
                    // if no store is found then add the store to the database
                    if (store === null){
                        // creating new instance of the store
                        const store = new Store();
                        // add the fields for the store
                        store.placeId = placeId;
                        store.seniorHours = {
                            exists: false,
                            hours: {
                                monday: { open:'0000', close:'0000' }, tuesday: { open:'0000', close:'0000' }, wednesday: { open:'0000', close:'0000' },
                                thursday: { open:'0000', close:'0000' }, friday: { open:'0000', close:'0000' }, saturday: { open:'0000', close:'0000' },
                                sunday: { open:'0000', close:'0000' }
                            }
                        }
                        // save the store
                        store.save()
                    }
                    // put the google API result into a variable
                    let resultPlace = place.data.result;
                    // add the seniorHours to the result
                    resultPlace['seniorHours'] = store.seniorHours;
                    // return the store information
                    return res.status(200).json({message: 'Store found', code: 200, store: resultPlace});
                })
                // Throw error if something goes wrong
                .catch(err => res.status(400).json({message: 'Store was not found or created', code: 400, errors: err}));
        })
        // Throw error if API doesnt work
        .catch(err => res.status(500).json({message: 'API call failed', code: 500}));
};


// PUT -> Change the senior hours for a store
exports.seniorHours = async (req, res) => {
    // Grab the seniorHours data, set regex validation data, all the weekdays and error message
    const seniorHours = req.body;
    const {exists, hours} = seniorHours;
    const regexMatch = /^([01]\d|2[0-3])([0-5]\d)$/;
    const weekdays =  ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
    const errorMsg = {
        message: "Missing parameters in the body", 
        code: 400, 
        parameters: {
            'exists': {type: 'Boolean', error: 'Missing value'},
            'hours': {type: 'Array', error: 'Missing value', format:{
                monday: {open: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                tuesday: {open: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                wednesday: {open: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                thursday: {open: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                friday: {open: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                saturday: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}},
                sunday: {type: 'String', min: '0000', max: '2359'}, close: {type: 'String', min: '0000', max: '2359'}}
            }
    }
    // Validation
    // If any key names are missing
    if (Object.keys(seniorHours).length === 0 || exists === null || !hours) return res.status(400).json({errorMsg});
    // if 'exists' is a boolean
    if (typeof exists != "boolean") return res.status(400).json(errorMsg);
    // check if all of the weekdays is in hours
    if (!(weekdays in hours)) return res.status(400).json(errorMsg);
    // check if each weekday has proper structure
    for (var day in hours){
        // check if each day is an array type
        if (typeof hours[day] != 'object') return res.status(400).json(errorMsg);
        // check if open and close is in each weeekday
        if (!(('open', 'close') in hours[day])) return res.status(400).json(errorMsg);
        // check if each open and close are strings
        if (typeof hours[day]['open'] != 'string' || typeof hours[day]['close'] != 'string') return res.status(400).json(errorMsg);
        // check if each open and close match the regex string
        if (!regexMatch.test(hours[day]['open']) || !regexMatch.test(hours[day]['close'])) return res.status(400).json(errorMsg);
    }
    // find the store and update the seniorHours
    Store.findOneAndUpdate({'placeId': req.params.placeId}, {$set: {seniorHours: {exists: exists, hours: hours}}},{new: true})
        // if mongoose call runs right then check if store exists, if it does update the hours if not return 404
        .then(store => {
            if (store === null) return res.status(404).json({message: 'Store not found', code: 404})
            res.status(200).json({message: 'Senior hours updated', code: 200, store: store}) 
        })
        // return errors if anything goes wrong
        .catch(err => res.status(400).json({message: 'Senior hours not updated', code: 400, errors: err}));
};