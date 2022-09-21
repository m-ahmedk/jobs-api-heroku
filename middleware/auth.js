const jwt = require('jsonwebtoken');
const UnauthenticateError = require('../error/unauthenticated')
require('dotenv').config()
const User = require('../model/user')

const authMiddleware = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticateError('You are not allowed to access this page..');
    }

    let auth = authHeader.split(' ');

    if(auth.length < 2) {
        throw new UnauthenticateError('Unable to authenticate the user..')
    }

    const token = auth[1];

    // try catch once you receive the token
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET) // payload verify will show actual value

        const user = await User.findOne({"_id":payload.userId}).select('-password').exec() // .select(-password) hides pw from select
        req.user = user
        req.user.token = token; // not neccessary

        // can use below or two lines above. good practive above.
        //req.user = { userId:payload.userId, name: payload.name } // the actual value had userId and name
        next()
    }
    catch(error) {
        throw new UnauthenticateError('Invalid Authentication')
    }

}

module.exports = authMiddleware