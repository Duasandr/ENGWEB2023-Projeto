const express = require('express');
const router = express.Router();
const passport = require('passport')
const cb = require('../callbacks/users')

router.get('/verify', cb.verify, cb.handleResponse)

router.post('/register', cb.registerUser, passport.authenticate('local'), cb.signUser, cb.handleResponse)
router.post('/login', passport.authenticate('local'), cb.signUser, cb.handleResponse)

module.exports = router;


