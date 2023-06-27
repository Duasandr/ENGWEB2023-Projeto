/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Casa model definition
 * @type {Schema}
 * @property {String} numero
 * @property {String} foro
 * @property {String} enfiteuta
 * @property {String} descricao
 * @property {String} vista
 */
const CasaSchema = new Schema({
    "_id": { type: String },
    "numero": { type: String, required: true },
    "foro": String,
    "enfiteuta": [String],
    "descricao": [String],
    "vista": String
})

// Export model with name, schema and collection
module.exports = CasaSchema
