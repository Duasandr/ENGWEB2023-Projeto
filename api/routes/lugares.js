/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/lugares')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index /api/lugares route.
 */
router.get('/', cb.lugares, generic.handleResponse)

module.exports = router;
