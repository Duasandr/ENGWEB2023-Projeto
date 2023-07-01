/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasaSchema = new Schema({
    "_id": { type: String },
    "numero": { type: String, required: true },
    "foro": String,
    "enfiteuta": [String],
    "descricao": [String],
    "vista": String
})

module.exports = CasaSchema
