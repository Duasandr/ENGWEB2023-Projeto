var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/index')

router.get('/', cb.getIndex)
router.get('/login', cb.getLogin)
router.get('/register', cb.getRegister)

router.post('/login', cb.postLogin)
router.post('/register', cb.postRegister)

module.exports = router;