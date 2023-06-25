const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Data model definition
 * @type {Schema}
 * @property {String} _id
 * @property {String} texto
 */
const DataSchema = new Schema({
    _id: String,
    "texto": { type: String, required: true }
})

module.exports = mongoose.model('Data', DataSchema, 'datas')