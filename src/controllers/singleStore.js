// importing dependencies
const Store = require('../models/store');

// GET -> single store information
exports.view = async (req, res) => {
    // Find store by id
    Store.findById(req.params.storeId)
        // return the store data
        .then(store => res.status(200).json({message: 'Store information', code: 200, store: store}))
        // If error return error
        .catch(err => res.status(400).json(err));
};
