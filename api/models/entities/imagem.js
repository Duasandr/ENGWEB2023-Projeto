/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Imagem model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} referencia - Street reference. 
 * The name is ambigous because an image can be referenced by multiple entities. For sake of simplicity, I chose to use the Rua entity only.
 * @property {String} path - Path to image
 * @property {String} legenda - Image caption
 */
const ImagemSchema = new Schema({
    _id: String,
    "idReferencia": { type: String, required: true, ref: 'Rua' },
    "path": { type: String, required: true },
    "legenda": String
})

module.exports = mongoose.model('Imagem', ImagemSchema, 'imagens')