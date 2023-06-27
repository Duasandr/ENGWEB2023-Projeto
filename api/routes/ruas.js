/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/ruas')
const generic = require('../callbacks/generic')

// GET routes

/**
 * GET route for the index api/ruas/ route.
 */
router.get('/', cb.ruas, generic.handleResponse)

/**
 * GET route for the api/ruas/lugares/?idRua=id route.
 * @details This route returns all Lugar documents that reference a Rua document.
 */
router.get('/lugares', cb.listLugares, generic.handleResponse)
router.get('/entidades', cb.listEntidades, generic.handleResponse)

// POST routes

router.post('/', cb.createRua, generic.handleResponse)
router.post('/update/:id', cb.updateRua, generic.handleResponse)
router.post('/delete/:id', cb.deleteRua, generic.handleResponse)



module.exports = router;
