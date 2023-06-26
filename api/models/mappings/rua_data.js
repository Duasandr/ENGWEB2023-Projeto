/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * RuaData model definition
 * @type {mongoose.Schema}
 * @property {String} idRua 
 * @property {String} idData
 */
const RuaDataSchema = new Schema({
    "idRua": { type: String, required: true, ref: 'Rua' },
    "idData": { type: String, required: true, ref: 'Data' }
})

module.exports = mongoose.model('RuaData', RuaDataSchema, 'ruas_datas')