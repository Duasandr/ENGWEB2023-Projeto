/**
 * Model dependencies
 */
const RuaModel = require('../models/rua');

/**
 * 
 * @returns {Promise} Promise object represents the list of all ruas
 */
exports.list = () => {
    return RuaModel.find({}, {}, { sort: { nome: 1 } }).exec()
}

exports.get = (id) => {
    return RuaModel.findById(id).exec()
}

exports.create = (data) => {
    return RuaModel.create(data)
}

exports.update = (id, data) => {
    return RuaModel.findByIdAndUpdate(id, data).exec()
}

exports.delete = (id) => {
    return RuaModel.findByIdAndDelete(id).exec()
}

exports.listLugares = () => {
    return RuaModel.aggregate([
        {
            $unwind: "$referencias"
        },
        {
            $match: {
                "referencias.tipo": "lugar"
            }
        },
        {
            $project: {
                _id: 0,
                texto: "$referencias.texto"
            }
        }
    ]).exec()
}