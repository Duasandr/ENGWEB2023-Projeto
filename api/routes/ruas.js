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
router.get('/lugares', cb.lugaresByRua, generic.handleResponse)

/**
 * GET route for the api/ruas/datas/?idRua=id route.
 * @details This route returns all Data documents that reference a Rua document.
 */
router.get('/datas', cb.datasByRua, generic.handleResponse)

/**
 * GET route for the api/ruas/entidades/?idRua=id route.
 * @details This route returns all Entidade documents that reference a Rua document.
 */
router.get('/entidades', cb.entidadesByRua, generic.handleResponse)

module.exports = router;
