var express = require('express');
var router = express.Router();
const cb  = require('../callbacks/auth')


router.get('/', cb.getIndex)
router.get('/login', cb.getLogin)
router.get('/register', cb.getRegister)
router.get('/logout', cb.getLogout)

router.post('/login', cb.postLogin)
router.post('/register', cb.postRegister)

module.exports = router;