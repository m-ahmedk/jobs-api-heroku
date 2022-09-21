const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Please provide name'],
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        unique: true, // for e.g. if name exists on db, duplicate error message thrown
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

// pre & post hooks, this one's a pre
// hash password before saving to db
// using 'function' instead of arrow function
// because it points to current document, e.g. below
userSchema.pre('save', async function() {  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) // as we're using function keyword, 
                                                           // this.password is pointing to password from current document (above)
})

// instance method
// used function keyword instead of arrow
// so that 'this' keyword will return the name from the current scope of the document
userSchema.methods.getName = function() {
    return this.name;
}

// create jwt 
// JWT_SECRET generated from website: https://allkeysgenerator.com/
userSchema.methods.createJWT = async function() {
    let token = await jwt.sign(
        {
            userId: this._id,
            name: this.name
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    )

    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const samePassword = await bcrypt.compare(candidatePassword, this.password)
    return samePassword
}

module.exports = mongoose.model('User', userSchema) // name of model, model schema