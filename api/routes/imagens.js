/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/imagens')

// GET routes

/**
 * GET route for the index / route.
 */
router.get('/', cb.index)

module.exports = router;
