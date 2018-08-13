
const config= require('../config/database');
//loading mongoose1 module
const mongoose = require('mongoose');
//creating the db connection
const connection =mongoose.connect(config.database);

 

module.exports = connection;


