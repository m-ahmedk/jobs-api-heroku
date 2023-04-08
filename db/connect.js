const mongoose = require("mongoose")
const {InternalServerError} = require('../error/index')

const connect = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('Connected to DB!')
    }
    catch (error) {
        throw new InternalServerError('Unable to connect to Database..')
    }
}

module.exports = connect;