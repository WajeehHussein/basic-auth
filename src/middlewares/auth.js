'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Users } = require('../models/index')


async function auth(req, res, next) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    next();
}

module.exports = auth