var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/index')
const generic = require('../callbacks/generic')

router.get('/', generic.verifyToken, cb.getIndex)

module.exports = router;