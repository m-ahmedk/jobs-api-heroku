const {StatusCodes} = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../error/index');
const User = require('../model/user')

const register = async (req, res) => {
    console.log(req.body)
    const user = await User.create({...req.body})

/**
 * Using methods like user.createJWT() or user.getName() is much more recommended in order to avoid transparency.
 * It should be coded internally or abstracted, and only be accessible through methods
 */

    // json web token sign -> payload, jwtsecret, options
    // used after authorization, we'll have token after authorization
    // we'll pass the token from method to method to stay signed in
    const token = await user.createJWT(); 
    res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token})
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError('Email or Password field is missing')
    }
    
    // check user exists
    const user = await User.findOne({"email": email}).exec();

    if(!user) {
        throw new UnauthenticatedError('User not found')
    }

    // check password
    const isPassword = await user.comparePassword(password);

    if(!isPassword) {
        throw new UnauthenticatedError('Invalid Credentials..')
    }

    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({ user: {name: user.name}, token })
}

module.exports = {register, login}