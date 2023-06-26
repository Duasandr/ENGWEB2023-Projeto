/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/enfiteutas')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index api/enfiteutas/ route.
 */
router.get('/', cb.enfiteutas, generic.handleResponse)

module.exports = router;
