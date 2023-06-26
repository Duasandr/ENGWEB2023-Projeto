/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * RuaEntidade model definition
 * @type {mongoose.Schema}
 * @property {String} idRua 
 * @property {String} idData
 */
const RuaEntidadeSchema = new Schema({
    "idRua": { type: String, required: true, ref: 'Rua' },
    "idEntidade": { type: String, required: true, ref: 'Entidade' }
})

module.exports = mongoose.model('RuaEntidade', RuaEntidadeSchema, 'ruas_entidades')