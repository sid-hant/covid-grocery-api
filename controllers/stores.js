// processes http requests and defines endpoints
// importing dependencies
const Store = require('../models/store');
const {Client, Status} = require("@googlemaps/google-maps-services-js");


// GET -> Store Search 
exports.search = async (req, res) => {
    // calling a google api client
    const client = new Client({});
    // Get the search term
    const searchTerm = req.query.q;
    // Run the google api, run a text search
    client
        .textSearch({
            params: {
                // Parameters include the query term, type of search which is grocery
                query: searchTerm,
                type: ['grocery_or_supermarket'],
                // API key defined in the .ENV file
                key: process.env.GOOGLE_API_KEY
            },
            timeout: 1000, // milliseconds
        })
        // results of stores found
        .then((stores) => {
            // If the API does not return an OK response, return errors
            if (stores.data.status != Status.OK) return res.status(500).json({message: 'API call failed', code:500, errors: stores.data.error_message});
            // Else return store search results
            return res.status(200).json({message: 'Store search results', code: 200, stores: stores.data.results});
        })
        // Throw error if API doesnt work
        .catch(err => res.status(500).json({message: 'API call failed', code: 500}));
};


