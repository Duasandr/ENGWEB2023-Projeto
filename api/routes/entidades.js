/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/entidades')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index api/entidades/ route.
 */
router.get('/', cb.entidades, generic.handleResponse)

module.exports = router;
