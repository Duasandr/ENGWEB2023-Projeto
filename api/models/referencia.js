/**
 * Model dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Referencia model definition
 * @type {Schema}
 * @property {String} tipo - Can be data, lugar or entidade
 * @property {String} nome
 */
const ReferenciaSchema = new Schema({
    "_id": { type: String },
    "tipo": { type: String, required: true, enum: ['data', 'lugar', 'empresa', 'família', 'instituição', 'pessoa'] },
    'texto': { type: String, required: true }
})

// Export model with name, schema and collection
module.exports = ReferenciaSchema
