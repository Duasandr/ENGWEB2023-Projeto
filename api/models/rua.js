/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ImagemSchema = require('./imagem')
const CasaSchema = require('./casa')
const ReferenciaSchema = require('./referencia')
const PostSchema = require('./post')

const RuaSchema = new Schema({
    _id: String,
    "numero": { type: String, required: true },
    "nome": { type: String, required: true },
    "paragrafos": [String],
    "imagens": [ImagemSchema],
    "casas": [CasaSchema],
    "referencias": [ReferenciaSchema],
    "posts": [PostSchema]
})

module.exports = mongoose.model('Rua', RuaSchema, 'ruas')
