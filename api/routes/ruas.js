/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/ruas')

// GET routes

/**
 * GET route for the index ruas/ route.
 */
router.get('/', cb.index)

module.exports = router;
