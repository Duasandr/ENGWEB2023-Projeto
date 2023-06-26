/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/casas')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index /api/casas route.
 */
router.get('/', cb.casas, generic.handleResponse)

module.exports = router;
