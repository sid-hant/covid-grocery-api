// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// .env file configuration
require('dotenv').config();

// initialize application
const app = express();

// use body-parser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Connect to Mongoose and set connection variable
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection established');
});

// setup port
const port = process.env.PORT || 5000;

// import routes
const apiRoutes = require('./api-routes');

// api routes
app.use('/api/v1', apiRoutes);

// launch api
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});