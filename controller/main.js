const {StatusCodes} = require('http-status-codes')

const _get = async (req, res) => {
    res.status(StatusCodes.ACCEPTED).json({"msg": "This is a get request"})
}

const _post = async (req, res) => {
    res.status(StatusCodes.ACCEPTED).json({"msg": "This is a post request"})
}

const _patch = async (req, res) => {
    res.status(StatusCodes.ACCEPTED).json({"msg": "This is a patch request"})
}

const _delete = async (req, res) => {
    res.status(StatusCodes.ACCEPTED).json({"msg": "This is a delete request"})
}

module.exports = {_get, _post, _patch, _delete}