const mongoose = require('mongoose')

const dummySchema = mongoose.Schema({
    'name': {
        type: String,
        trim: true,
        required: [true, 'name is a required field'], 
    },
    'age': {
        type: Number,
        min: [1, 'Age cannot be less than 18'],
    },
    'phone': {
        type: String
    },
    'zip': {
        type: Number,
        maxlength: [8, 'Not more than 8 characters'],
    },
    'company': {
        type: String,
        maxlength: [20, 'Not more than 20 characters'],
    },
    'createdAt': { 
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('DummyData', dummySchema)