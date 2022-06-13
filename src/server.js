'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000

// 3rd Party Resources
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');


// all routes
const userRoutes = require('./routes/user')



// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());
app.use(userRoutes)


// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


function start() {
    app.listen(PORT, () => {
        console.log(`listen on PORT ${PORT}`);
    })
}

module.exports = {
    app: app,
    start: start,
}