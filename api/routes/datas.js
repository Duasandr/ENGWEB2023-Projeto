/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/datas')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index api/datas/ route.
 */
router.get('/', cb.datas, generic.handleResponse)

module.exports = router;
