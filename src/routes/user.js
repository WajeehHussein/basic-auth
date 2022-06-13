'use strict';
const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('../models/index')

usersRouter.get('/', home)
usersRouter.post('/signup', signUp);



usersRouter.post('/signin', signIn);

function home(req, res) {
    res.send('home page')
}

async function signUp(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);

    } catch (e) { res.status(403).send('Error Creating User'); }
}

async function signIn(req, res) {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password


    try {
        const user = await Users.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        }
        else {
            throw new Error('Invalid User');
        }
    } catch (error) { res.status(403).send('Invalid Login'); }

}

module.exports = usersRouter;