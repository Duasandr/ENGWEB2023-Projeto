/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/datas')

// GET routes

/**
 * GET route for the index api/datas/ route.
 */
router.get('/', cb.index)

module.exports = router;
