/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/lugares')

// GET routes

/**
 * GET route for the index /api/lugares route.
 */
router.get('/', cb.index)

module.exports = router;
