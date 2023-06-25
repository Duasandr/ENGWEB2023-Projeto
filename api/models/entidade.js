/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Entidade model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} nome
 */
const EntidadeSchema = new Schema({
    _id: String,
    "nome": { type: String, required: true }
})

module.exports = mongoose.model('Entidade', EntidadeSchema, 'entidades')