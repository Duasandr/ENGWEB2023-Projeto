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

exports.listReferenciasSorted = (tipo, order = 1) => {
    if (tipo === "entidade") {
        const tipos = ["pessoa", "instituição", "empresa", "família"]

        return RuaModel.aggregate([
            { $project: { "referencias": 1 } },
            { $unwind: "$referencias" },
            { $match: { "refrencias.tipo": { $in: tipos } } },
            { $group: { _id: "$referencias.tipo", nomes: { $addToSet: "$referencias.texto" } } },
            { $sort: { _id: order } }
        ]).exec()
    } else {
        return RuaModel.aggregate([
            { $project: { "referencias": 1 } },
            { $unwind: "$referencias" },
            { $match: { "referencias.tipo": tipo } },
            { $group: { _id: "$referencias.texto" } },
            { $sort: { _id: order } }
        ]).exec()
    }
}

exports.listLugares = (order = 1) => {
    return this.listReferenciasSorted("lugar", order)
}

exports.listEntidades = (order = 1) => {
    return this.listReferenciasSorted("entidade", order)
}

exports.listDatas = (order = 1) => {
    return this.listReferenciasSorted("data", order)
}
