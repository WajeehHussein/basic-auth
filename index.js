'use strict';
require('dotenv').config();
let PORT = process.env.PORT || 3000

const server = require('./src/server')
const { sequelize } = require('./src/models/index')


sequelize.sync().then(() => {
    server.start(3000, () => console.log('server up'));
}).catch(e => {
    console.error('Could not start server', e.message);
});