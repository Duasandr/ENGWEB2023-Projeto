/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReferenciaSchema = new Schema({
    "_id": { type: String },
    "tipo": { type: String, enum: ['data', 'lugar', 'empresa', 'família', 'instituição', 'pessoa'] },
    'texto': { type: String }
})

module.exports = ReferenciaSchema
