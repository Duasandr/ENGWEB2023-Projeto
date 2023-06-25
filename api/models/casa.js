/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Casa model definition
 * @type {Schema}
 * @property {String} _id 
 * @property {String} idRua - _id of Rua object. Acts as foreign key
 * @property {String} numero
 * @property {String} foro
 * @property {String[]} enfiteuta - Array of _id of Enfiteuta objects
 * @property {String[]} descricao
 * @property {String} vista
 */
const CasaSchema = new Schema({
    _id: String,
    "idRua": { type: String, required: true, ref: 'Rua' },
    "numero": { type: String, required: true },
    "foro": String,
    "descricao": [String],
    "vista": String
})

// Export model with name, schema and collection
module.exports = mongoose.model('Casa', CasaSchema, 'casas')
