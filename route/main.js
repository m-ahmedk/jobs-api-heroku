const {_get, _post, _patch, _delete} = require('../controller/main')
const express = require('express')
const mainRouter = express.Router()

mainRouter.route('/').get(_get).post(_post);
mainRouter.route('/:id').patch(_patch).delete(_delete);

module.exports = mainRouter
