/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/imagens')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index / route.
 */
router.get('/', cb.imagens, generic.handleResponse)

module.exports = router;
