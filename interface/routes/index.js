var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/index')

router.get('/', cb.getIndex)

module.exports = router;