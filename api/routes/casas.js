/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/casas')

// GET routes

/**
 * GET route for the index /api/casas route.
 */
router.get('/', cb.index)

module.exports = router;
