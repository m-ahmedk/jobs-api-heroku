const {NotFoundError} = require('../error/index')

const notFoundMiddleware = (req, res, next) => {
    throw new NotFoundError("Route does not exist..")
}

module.exports = notFoundMiddleware