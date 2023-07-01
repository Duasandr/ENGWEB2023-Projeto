/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComentarioSchema = new Schema({
    "created_date": { type: Date, default: Date.now },
    "updated_date": { type: Date, default: Date.now },
    "autor": { type: String, required: true },
    "texto": { type: String, required: true }
})

module.exports = ComentarioSchema
