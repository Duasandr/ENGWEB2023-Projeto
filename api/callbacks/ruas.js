// Callbacks for the ruas route.

/**
 * Module dependencies
 */
const RuaController = require('../controllers/rua')
const e = require('express')

/**
 * Callback for the index /ruas route.
 * @details This is the callback for the index route. It simply returns a JSON object with a message.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.ruas = async (req, res, next) => {
    try {
        const documents = await RuaController.list()
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
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

    try {
        const document = await RuaController.create(rua)
        req.data = document
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
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

    try {
        const document = await RuaController.update(id, updated)
        req.data = document
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
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

    try {

        const document = await RuaController.delete(id)

        if (document) {
            req.data = document
        } else {
            req.error = 'deleteRua: id = ' + id + ' not found'
            req.error.message = 'Rua não encontrada.'
        }
    } catch (error) {
        req.error = error
    } finally {
        next()
    }

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

    try {
        const documents = await RuaController.listLugares(order)
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}

exports.listDatas = async (req, res, next) => {
    var order = 1
    
    if(req.order) {
        order = req.order
    }

    try {
        const documents = await RuaController.listDatas(order)
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}

exports.listEntidades = async (req, res, next) => {
    var order = 1

    if(req.order) {
        order = req.order
    }

    try {
        const documents = await RuaController.listEntidades(order)
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}
