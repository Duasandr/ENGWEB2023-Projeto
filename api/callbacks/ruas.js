// Callbacks for the ruas route.

/**
 * Module dependencies
 */
const RuaController = require('../controllers/rua')

/**
 * Callback for the index /ruas route.
 * @details This is the callback for the index route. It simply returns a JSON object with a message.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.ruas = async (req, res, next) => {
    RuaController.list()
        .then((documents) => { req.data = documents })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

exports.rua = async (req, res, next) => {
    const id = req.params.id

    await RuaController.get(id)
        .then((document) => {
            if(!document) { 
                req.error = { message: 'rua ' + id + ' não foi encontrada' }
            } else { 
                req.data = document 
            }
        })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

/**
 * Creates a document or multiple documents.
 * @details It adds a JSON object with the created document(s) to the ```req``` inside a ```data``` property.
 * It expects that the ```req``` has a ```body``` property with the document(s) to be created.
 * In case of error, it adds a JSON object with the error message to the ```req``` inside an ```error``` property.
 * It hands over the request to the next middleware function.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.createRua = async (req, res, next) => {
    const rua = req.body

    RuaController.create(rua)
        .then((document) => { req.data = document })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

/**
 * Updates a document.
 * @details It adds a JSON object with the updated document to the ```req``` inside a ```data``` property.
 * It expects that the ```req``` has a ```body``` property with the document to be updated and an ```id``` property with the document's id.
 * In case of error, it adds a JSON object with the error message to the ```req``` inside an ```error``` property.
 * It hands over the request to the next middleware function.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateRua = async (req, res, next) => {
    const updated = req.body
    const id = req.params.id

    RuaController.update(id, updated)
        .then((document) => { req.data = document })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

/**
 * Deletes a document.
 * @details It adds a JSON object with the deleted document to the ```req``` inside a ```data``` property.
 * It expects that the ```req``` has an ```id``` property with the document's id.
 * In case of error, it adds a JSON object with the error message to the ```req``` inside an ```error``` property.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteRua = async (req, res, next) => {
    const id = req.params.id

    RuaController.delete(id)
        .then((document) => { req.data = document })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

/**
 * Callback for ruas/lugares/query route. Retrieves all Lugar documents that reference a Rua document.
 * @details It adds a JSON object with the retrieved documents to the ```req``` inside a ```data``` property.
 * In case of error, it adds a JSON object with the error message to the ```req``` inside an ```error``` property.
 * It hands over the request to the next middleware function.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.listLugares = async (req, res, next) => {
    var order = 1
    
    if(req.order) {
        order = req.order
    }

    RuaController.listLugares(order)
        .then((documents) => { req.data = documents })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

exports.listDatas = async (req, res, next) => {
    var order = 1
    
    if(req.order) {
        order = req.order
    }

    RuaController.listDatas(order)
        .then((documents) => { req.data = documents })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

exports.listEntidades = async (req, res, next) => {
    var order = 1

    if(req.order) {
        order = req.order
    }

    RuaController.listEntidades(order)
        .then((documents) => { req.data = documents })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

exports.listPosts = async (req, res, next) => {
    var sortBy = "data_criado"
    var order = 1

    if(req.query) {
        if(req.query.order) {
            order = req.query.order
        }
        if(req.query.sortBy) {
            field = req.query.sortBy
        }
    }

    RuaController.listPosts(sortBy, order)
        .then((documents) => { req.data = documents })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}

exports.addComment = async (req, res, next) => {
    const post_id = req.params.id
    const comment = req.body

    RuaController.addComment(post_id, comment)
        .then((document) => { req.data = document })
        .catch((error) => { req.error = error })
        .finally(() => { next() })
}
