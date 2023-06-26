/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * RuaLugar model definition
 * @type {mongoose.Schema}
 * @property {String} idRua
 * @property {String} idLugar
 */
const RuaLugarSchema = new Schema({
    "idRua": { type: String, required: true, ref: 'Rua' },
    "idLugar": { type: String, required: true, ref: 'Lugar' }
})

module.exports = mongoose.model('RuaLugar', RuaLugarSchema, 'ruas_lugares')