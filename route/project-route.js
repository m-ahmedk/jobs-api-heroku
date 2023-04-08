const authMiddleware = require('../middleware/auth')
const authRoute = require('./auth')
const jobsRoute = require('./jobs')

// defining all routes
module.exports = function(app) {
    // authorization <=> login/register
    app.use('/api/v1/auth', authRoute);

    // Note: if expecting a 2nd function after a function, then add next() to the first function
    app.use('/api/v1/jobs', authMiddleware, jobsRoute); // jobs controller
};