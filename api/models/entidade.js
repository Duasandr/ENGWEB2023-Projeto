/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Entidade model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} tipo - pessoa, instituição, empresa, família
 * @property {String} nome
 */
const EntidadeSchema = new Schema({
    _id: String,
    "tipo": { type: String, required: true, enum: ['pessoa', 'instituição', 'empresa', 'família'] },
    "nome": { type: String, required: true }
})

module.exports = mongoose.model('Entidade', EntidadeSchema, 'entidades')