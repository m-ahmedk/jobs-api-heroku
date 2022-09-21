const {StatusCodes} = require('http-status-codes')

const errorMiddleware = (err, req, res, next) => {

    let CustomError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again later..'
    }

    if(err.name === 'ValidationError') {
        CustomError.message = Object.values(err.errors).map((item) => { return item.message }).join(',')
        CustomError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // {
    //     "msg": {
    //       "stringValue": "\"632412ee084e9d66d822d0ebb\"",
    //       "valueType": "string",
    //       "kind": "ObjectId",
    //       "value": "632412ee084e9d66d822d0ebb",
    //       "path": "_id",
    //       "reason": {},
    //       "name": "CastError",
    //       "message": "Cast to ObjectId failed for value \"632412ee084e9d66d822d0ebb\" (type string) at path \"_id\" for model \"Jobs\""
    //     }
    //   }

    if(err.name === "CastError") {
        CustomError.message = `No item found with id: ${err.value}`;
        CustomError.statusCode = StatusCodes.NOT_FOUND;
    }

    if (err.code && err.code === 11000) {
        // error code 11000 is duplicate error
        res.status(StatusCodes.BAD_REQUEST).json({"msg": `Duplicate values detected for field ${Object.keys(err.keyValue)}, Please try again..`})
    }
    else {
        res.status(CustomError.statusCode).json({"msg": CustomError.message })
    }
}

module.exports = errorMiddleware;
