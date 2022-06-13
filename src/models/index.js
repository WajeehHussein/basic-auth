'use strict';

require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');

const users = require('./user')

let sequelize = new Sequelize(process.env.DATABASE_URL);


module.exports = {
    sequelize: sequelize,
    Users: users(sequelize, DataTypes),
};