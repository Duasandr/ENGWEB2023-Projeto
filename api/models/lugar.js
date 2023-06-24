/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Lugar model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} nome
 */
const LugarSchema = new Schema({
    _id: String,
    "nome": { type: String, required: true }
})

module.exports = mongoose.model('Lugar', LugarSchema, 'lugares')