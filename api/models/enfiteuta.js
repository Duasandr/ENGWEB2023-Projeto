/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Enfiteuta model definition
 * @type {Schema}
 * @property {String} _id
 */
const EnfiteutaSchema = new Schema({
    _id: String,
    "nome": { type: String, required: true }
})

module.exports = mongoose.model('Enfiteuta', EnfiteutaSchema, 'enfiteutas')