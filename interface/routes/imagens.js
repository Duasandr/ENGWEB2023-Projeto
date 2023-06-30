var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/imagens')

router.get('/:filename', cb.getImagem)

module.exports = router;