// processes http requests and defines endpoints
// importing dependencies
const Store = require('../models/store');

// POST -> creates stores object
exports.new = async (req, res) => {
    // Look if a store with that name and address exists
    Store.findOne({'address': (req.body.address).toUpperCase(), 'name': (req.body.name).toUpperCase()})
        // Result of the search
        .then(result => {
            // If there is store that already exists return an error message
            if (result) return res.status(400).json({message:'Store already exists', code: 400, store: result});
            // If one doesnt exist then create one
            else {
                // initializing store
                const store = new Store();
                // filling all of the store information
                store.name = (req.body.name).toUpperCase();
                store.address = (req.body.address).toUpperCase();
                store.city = (req.body.city).toUpperCase();
                store.province = (req.body.province).toUpperCase();
                store.country = (req.body.country).toUpperCase();
                store.seniorHours = req.body.seniorHours;
                store.hours = req.body.hours;
                store.lineLength = req.body.lineLength;
                // Save store
                store.save((err)=>{
                    if (err) return res.status(400).json(err);
                    else return res.status(201).json({message: 'Store created', code: 201, store: store});
                });
            }
        })
        // Catch any errors
        .catch(err => res.json(err));
};


// GET -> list of stores
exports.list = async (req, res) => {
    // Get all of the stores
    Store.find()
        // Return all stores
        .then((stores) => res.status(200).json({message: 'Store list', code: 200, store: stores}))
        // If error then return error
        .catch(err => res.status(400).json(err));
};


// GET -> searchByName of the store
exports.searchByKeyword = (req, res) => {
    // get the keyword
    const q = req.query.q;
    // set the conditions for the search
    const nameCond = { name :{ $regex: new RegExp(q), $options: "i"} };
    const cityCond = { city :{ $regex: new RegExp(q), $options: "i"} };
    const provinceCond = { province :{ $regex: new RegExp(q), $options: "i"} };
    const countryCond = { country :{ $regex: new RegExp(q), $options: "i"} };
    // Promises to run all of the different searches
    Promise.all([
        Store.find(nameCond),
        Store.find(cityCond),
        Store.find(provinceCond),
        Store.find(countryCond)
    ])
        // returns promise
        .then(results => {
            // create empty array for the results
            let stores = []
            // run for loop to put all of the mongoose search results into the results array
            for (i = 0; i < results.length; i++){
                stores.push(...(results[i]));
            }
            // return the results
            return res.status(200).json({message: 'Search results', code: 200, store: stores})
        })
        // Return any errors if any
        .catch(err => res.status(500).json(err));
};


// GET -> searchByLocation
exports.searchByLocation = (req, res) => {
    // get the country, province and city name
    const country = (req.params.country).toUpperCase();
    const province = (req.params.province).toUpperCase();
    const city = (req.params.city).toUpperCase();
    // set search conditions
    const cond = { 
        'country' : country, 
        'city' : city,
        'province' : province  
    };
    // find the stores
    Store.find(cond)
        .sort([['name']])
        .then((stores) => res.status(200).json({message: 'Store list', code: 200, store: stores}))
        .catch(err => res.status(500).json(err));
}


