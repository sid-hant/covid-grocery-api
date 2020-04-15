// importing dependencies
const LineStatus = require('../models/lineStatus');
const Store = require('../models/store');


// POST -> Line Status for a store
exports.createLineStatus = async (req, res) => {
    // Find the store related to the Store ID
    Store.findOne({'_id': req.params.storeId})
        .then(store => {
            // get the business level from the body of the request
            const busy = req.body.busy;
            // get the date and time for now
            const date = new Date(Date.now());
            const day = date.getDate();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            // Create a line status object
            const lineStatus = new LineStatus();
            // set the parameters for the lineStatus object
            lineStatus.weekday = date.getDay();
            lineStatus.hour = date.getHours();
            lineStatus.storeId = req.params.storeId;
            lineStatus.busy = busy;
            lineStatus.date = `${year}-${month}-${day}`;
            // Save the lineStatus object in the database
            lineStatus.save()
                .then(() => res.status(201).json({message: 'Line status created', code: 201, lineStatus: lineStatus}))
                .catch(err => res.status(400).json(err));
        })
        // If any errors return the errors
        .catch(err => res.status(400).json({message: 'Store not found', code: 400, error: err}));
};


// GET -> Today's line status
exports.getLineStatus = async (req, res) => {
    // get current date
    const date = new Date(Date.now());
    // convert the date into a date string
    const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // Find the store by it's ID
    Store.findOne({'_id': req.params.storeId})
        // After the store is found get all of the line status for the store from today
        .then(store => {
            // Find the line status corresponding with the store and today's date
            LineStatus.find({'storeId': req.params.storeId, 'date': todayDate})
                // Once the results of the line statuses are found, find the average
                // for each hour and return it
                .then(results =>{
                    // blank dictionary for each of the hour's information
                    let dailyCrowd = {
                        0: {value: 0, count: 0}, 1: {value: 0, count: 0}, 2: {value: 0, count: 0},
                        3: {value: 0, count: 0}, 4: {value: 0, count: 0}, 5: {value: 0, count: 0},
                        6: {value: 0, count: 0}, 7: {value: 0, count: 0}, 8: {value: 0, count: 0},
                        9: {value: 0, count: 0}, 10: {value: 0, count: 0}, 11: {value: 0, count: 0},
                        12: {value: 0, count: 0}, 13: {value: 0, count: 0}, 14: {value: 0, count: 0},
                        15: {value: 0, count: 0}, 16: {value: 0, count: 0}, 17: {value: 0, count: 0},
                        18: {value: 0, count: 0}, 19: {value: 0, count: 0}, 20: {value: 0, count: 0},
                        21: {value: 0, count: 0}, 22: {value: 0, count: 0}, 23: {value: 0, count: 0}
                    };
                    // the busy hour that will be returned
                    let busyHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    // for each result update the sum in the dailyCrowd, add a count and then update the hour for busyHour
                    for (i = 0; i < results.length; i++){
                        const resultHour = results[i]['hour'];
                        dailyCrowd[resultHour]['value'] += results[i]['busy'];
                        dailyCrowd[resultHour]['count'] += 1;
                        busyHours[resultHour] = dailyCrowd[resultHour]['value']/dailyCrowd[resultHour]['count'];
                    }
                    // Return the response with the hours and the busy level
                    return res.status(200).json({message: "Store's current line length", code: 200, busyLevel: busyHours});
                })
                // If any errors return the errors
                .catch(err => res.status(400).json(err));
        })
        // If any errors return the errors
        .catch(err => res.status(400).json({message: 'Store not found', code: 400, error: err}));
};

// TODO: Add validation
// POST -> Get the line status of a weekday
exports.lineStatusDay = async (req, res) => {
    // get current date
    const date = new Date(Date.now());
    // get the day of the week 0-6 (Sunday-Saturday)
    const weekday = req.params.day;
    // Find the store by it's ID
    Store.findOne({'_id': req.params.storeId})
        // After the store is found get all of the line status for the store for the weekday
        .then(store => {
            // Find the line status corresponding with the store and today's date
            LineStatus.find({'storeId': req.params.storeId, 'weekday': weekday})
                // Once the results of the line statuses are found, find the average
                // for each hour and return it
                .then(results =>{
                    // blank dictionary for each of the hour's information
                    let dailyCrowd = {
                        0: {value: 0, count: 0}, 1: {value: 0, count: 0}, 2: {value: 0, count: 0},
                        3: {value: 0, count: 0}, 4: {value: 0, count: 0}, 5: {value: 0, count: 0},
                        6: {value: 0, count: 0}, 7: {value: 0, count: 0}, 8: {value: 0, count: 0},
                        9: {value: 0, count: 0}, 10: {value: 0, count: 0}, 11: {value: 0, count: 0},
                        12: {value: 0, count: 0}, 13: {value: 0, count: 0}, 14: {value: 0, count: 0},
                        15: {value: 0, count: 0}, 16: {value: 0, count: 0}, 17: {value: 0, count: 0},
                        18: {value: 0, count: 0}, 19: {value: 0, count: 0}, 20: {value: 0, count: 0},
                        21: {value: 0, count: 0}, 22: {value: 0, count: 0}, 23: {value: 0, count: 0}
                    };
                    // the busy hour that will be returned
                    let busyHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    // for each result update the sum in the dailyCrowd, add a count and then update the hour for busyHour
                    for (i = 0; i < results.length; i++){
                        const resultHour = results[i]['hour'];
                        dailyCrowd[resultHour]['value'] += results[i]['busy'];
                        dailyCrowd[resultHour]['count'] += 1;
                        busyHours[resultHour] = dailyCrowd[resultHour]['value']/dailyCrowd[resultHour]['count'];
                    }
                    // Return the response with the hours and the busy level
                    return res.status(200).json({message: "Store's line length", code: 200, day: {value: weekday, busyLevel: busyHours}});
                })
                // If any errors return the errors
                .catch(err => res.status(400).json(err));
        })
        // If any errors return the errors
        .catch(err => res.status(400).json({message: 'Store not found', code: 400, error: err}));

};