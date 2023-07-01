/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ImagemSchema = require('./imagem')
const ComentarioSchema = require('./comentario')

const PostSchema = new Schema({
    "autor": { type: String, required: true },
    "data_criado": { type: Date, default: Date.now },
    "data_modificado": { type: Date, default: Date.now },
    "titulo": { type: String, required: true },
    "texto": { type: String, required: true },
    "imagens": [ImagemSchema],
    "comentarios": [ComentarioSchema]
})

module.exports = PostSchema
