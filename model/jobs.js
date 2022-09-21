const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company field is required"],
        minlength: 3,
    },
    position: {
        type: String,
        required: [true, "Position field is required"],
        minlength: 3,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Invalid User']
    }
}, {timestamps: true})

module.exports = mongoose.model('Jobs', jobSchema) 