/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Rua model definition
 * @type {Schema}
 * @property {String} _id 
 * @property {String} numero
 * @property {String} nome
 * @property {String[]} figuras - Array of _id
 * @property {String[]} paragrafos - Array of strings
 * @property {String[]} casas - Array of _id 
 */
const RuaSchema = new Schema({
    _id: String,
    "numero": String,
    "nome": { type: String, required: true },
    "figuras": [String],
    "paragrafos": [String],
    "casas": [String],
})

// Export model with name, schema and collection
module.exports = mongoose.model('Rua', RuaSchema, 'ruas')
