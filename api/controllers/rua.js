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
            { $match: { "referencias.tipo": { $in: tipos } } },
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

exports.listPostsByTitulo = (order = 1) => {
    return RuaModel.aggregate([
        { $unwind: "$posts" },
        { $sort: { "posts.titulo": 1 } },
        { $group: { _id: "$posts.titulo", posts: { $push: "$posts" } } },
        { $sort: { _id: 1 } }
    ]).exec()
}

exports.listPostsByData = (order = 1) => {
    return RuaModel.aggregate([
        { $unwind: "$posts" },
        { $sort: { "posts.data_criado": 1 } },
        { $group: { _id: "$posts.data_criado", posts: { $push: "$posts" } } },
        { $sort: { _id: 1 } }
    ]).exec()
}

exports.listPosts = (sortBy = "data_criado", order = 1) => {
    if(sortBy === "titulo") {
        return this.listPostsByTitulo(order)
    }
    if(sortBy === "data_criado") {
        return this.listPostsByData(order)
    }
}

exports.addComment = (post_id, comment) => {
   return RuaModel.find({ "posts._id": post_id })
            .updateOne({ $push: { "posts.$.comentarios": comment } })
            .exec()
}