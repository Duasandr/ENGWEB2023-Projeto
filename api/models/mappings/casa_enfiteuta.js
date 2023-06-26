/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * CasaEnfiteuta model definition
 * @type {mongoose.Schema}
 * @property {String} idCasa 
 * @property {String} idEnfiteuta
 */
const CasaEnfiteutaSchema = new Schema({
    "idCasa": { type: String, required: true, ref: 'Casa' },
    "idEnfiteuta": { type: String, required: true, ref: 'Enfiteuta' }
})

module.exports = mongoose.model('CasaEnfiteuta', CasaEnfiteutaSchema, 'casas_enfiteutas')