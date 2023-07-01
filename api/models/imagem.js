/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImagemSchema = new Schema({
    "_id": { type: String },
    "path": { type: String, required: true },
    "legenda": String
})

module.exports = ImagemSchema