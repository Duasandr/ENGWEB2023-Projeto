/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Imagem model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} path - Path to image
 * @property {String} legenda - Image caption
 */
const ImagemSchema = new Schema({
    _id: String,
    "path": { type: String, required: true },
    "legenda": String
})

module.exports = mongoose.model('Imagem', ImagemSchema, 'imagens')