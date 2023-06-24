/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/enfiteutas')

// GET routes

/**
 * GET route for the index api/enfiteutas/ route.
 */
router.get('/', cb.index)

module.exports = router;
