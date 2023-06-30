var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/imagens')
const generic = require('../callbacks/generic')

router.get('/:filename', generic.verifyToken, cb.getImagem)

module.exports = router;