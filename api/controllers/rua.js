/**
 * Model dependencies
 */
const RuaModel = require('../models/rua');

/**
 * Returns a list of all documents.
 * @details This function returns a list of all documents in the collection. The ```sort``` object must be in the format { field: order }.
 * @param {*} sort 
 * @returns {Promise} promise that a list of all documents is sorted by ```sort``` object
 */
exports.list = (sort) => { 
    return RuaModel.find({}, {}).sort(sort).exec() 
}

/**
 * Returns a document by its id.
 * @param {*} id 
 * @returns {Promise} promise that a document is returned by its id
 */
exports.get = (id) => { 
    return RuaModel.findById(id).exec() 
}

/**
 * Creates a new document. The ```data``` object must be in the same format as the model.
 * @param {*} data 
 * @returns {Promise} promise that a new document is created
 */
exports.create = (data) => { 
    return RuaModel.create(data) 
}

/**
 * Finds a document by its id and updates it. The ```data``` object must be in the same format as the model.
 * @param {*} id 
 * @param {*} data updated data
 * @returns {Promise} promise that a document is updated
 */
exports.update = (id, data) => { 
    return RuaModel.findByIdAndUpdate(id, data).exec() 
}

/**
 * Deletes a document by its id.
 * @param {*} id 
 * @returns {Promise} promise that a document is deleted
 */
exports.delete = (id) => { 
    return RuaModel.findByIdAndDelete(id).exec() 
}

/**
 * Returns a list of pairs of ```tipo``` and ```texto``` of all ```referencias``` of a given ```tipo```.
 * @param {*} tipo 
 * @param {*} order 
 * @returns {Promise} promise that a list of pairs of ```tipo``` and ```texto``` of all ```referencias``` of a given ```tipo``` is returned
 */
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

/**
 * Returns a list of all ```lugares``` of all ```referencias``` of all documents sorted by ```order```.
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```lugares``` of all ```referencias``` of all documents is returned
 */
exports.listLugares = (order) => { 
    return this.listReferenciasSorted("lugar", order) 
}

/**
 * Returns a list of all ```entidades``` of all ```referencias``` of all documents sorted by ```order```.
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```entidades``` of all ```referencias``` of all documents is returned
 */
exports.listEntidades = (order) => { 
    return this.listReferenciasSorted("entidade", order) 
}

/**
 * Returns a list of all ```datas``` of all ```referencias``` of all documents sorted by ```order```.
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```datas``` of all ```referencias``` of all documents is returned
 */
exports.listDatas = (order) => { 
    return this.listReferenciasSorted("data", order) 
}

/**
 * Returns a list of all ```posts``` of all documents sorted by ```titulo``` in the order of  ```order```
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```posts``` of all documents is returned
 */
exports.listPostsByTitulo = (order) => {
    return RuaModel.aggregate([
        { $unwind: "$posts" },
        { $sort: { "posts.titulo": 1 } },
        { $group: { _id: "$posts.titulo", posts: { $push: "$posts" } } },
        { $sort: { _id: 1 } }
    ]).exec()
}

/**
 * Returns a list of all ```posts``` of all documents sorted by ```data_criado``` in the order of  ```order```
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```posts``` of all documents is returned
 */
exports.listPostsByData = (order) => {
    return RuaModel.aggregate([
        { $unwind: "$posts" },
        { $sort: { "posts.data_criado": 1 } },
        { $group: { _id: "$posts.data_criado", posts: { $push: "$posts" } } },
        { $sort: { _id: 1 } }
    ]).exec()
}

/**
 * Returns a list of all ```posts``` of all documents sorted by ```sortBy``` in the order of  ```order```
 * @param {*} sortBy can be either ```titulo``` or ```data_criado```
 * @param {*} order 1 for ascending order, -1 for descending order
 * @returns {Promise} promise that a list of all ```posts``` of all documents is returned
 */
exports.listPosts = (sortBy = "data_criado", order = -1) => {
    if (sortBy === "titulo") {
        return this.listPostsByTitulo(order)
    }
    if (sortBy === "data_criado") {
        return this.listPostsByData(order)
    }
}

/**
 * Creates a new ```comentario``` in a ```post``` of a ```rua```.
 * @param {*} idPost 
 * @param {*} comment 
 * @returns {Promise} promise that a new ```comentario``` is created
 */
exports.addComment = (idPost, comment) => {
    return RuaModel
        .find({ "posts._id": idPost })
        .updateOne({ $push: { "posts.$.comentarios": comment } })
        .exec()
}

/**
 * Creates a new ```post``` in a ```rua```.
 * @param {*} idRua 
 * @param {*} post 
 * @returns {Promise} promise that a new ```post``` is created
 */
exports.addPost = (idRua, post) => {
    return RuaModel
        .find({ "_id": idRua })
        .updateOne({ $push: { "posts": post } })
        .exec()
}