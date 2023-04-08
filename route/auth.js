const express = require('express')
const {login, register} = require('../controller/auth')

const authRoute = express.Router()

authRoute.route('/login').post(login);
authRoute.route('/register').post(register);

module.exports = authRoute;