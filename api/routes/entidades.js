/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/entidades')

// GET routes

/**
 * GET route for the index api/entidades/ route.
 */
router.get('/', cb.index)

module.exports = router;
