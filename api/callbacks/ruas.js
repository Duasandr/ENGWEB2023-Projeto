// Callbacks for the ruas route.

/**
 * Module dependencies
 */
const RuaController = require('../controllers/rua')

/**
 * Checks if the request has a query and if it has an order parameter.
 */
getOrder = (req) => {
    return req.query && req.query.order ? req.query.order : 1
}

/**
 * Checks if the request has a query and if it has a sortBy parameter.
 */
getSortBy = (req) => {
    return req.query && req.query.sortBy ? req.query.sortBy : "_id"
}

/**
 * Returns a sort object with the sortBy parameter as the key and the order parameter as the value.
 */
getSort = (req) => {
    const sort = {}
    sort[getSortBy(req)] = parseInt(getOrder(req), 10)
    return sort
}

/**
 * Populates the ```req.promise``` with a promise that a list of all documents is sorted by ```req.query.sortBy``` and ```req.query.order```.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ruas = (req, res, next) => {
    req.promise = RuaController.list(getSort(req)); next()
}

/**
 * Populates the ```req.promise``` with a promise that a document is returned by its id.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/get/:id```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.rua = (req, res, next) => {
    req.promise = RuaController.get(req.params.id); next()
}

/**
 * Populates the ```req.promise``` with a promise that a new document is created.
 * @details This function is used as a callback for the ```POST``` route ```/api/ruas/```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createRua = (req, res, next) => {
    req.promise = RuaController.create(req.body); next()
}

/**
 * Populates the ```req.promise``` with a promise that a document is updated.
 * @details This function is used as a callback for the ```POST``` route ```/api/ruas/update/:id```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateRua = (req, res, next) => {
    req.promise = RuaController.update(req.params.id, req.body); next()
}

/**
 * Populates the ```req.promise``` with a promise that a document is deleted.
 * @details This function is used as a callback for the ```POST``` route ```/api/ruas/delete/:id```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteRua = (req, res, next) => {
    req.promise = RuaController.delete(req.params.id); next()
}

/**
 * Populates the ```req.promise``` with a promise that a list of all ```lugares```.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/lugares```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.listLugares = (req, res, next) => {
    req.promise = RuaController.listLugares(getOrder(req)); next()
}

/**
 * Populates the ```req.promise``` with a promise that a list of all ```datas```.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/datas```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.listDatas = (req, res, next) => {
    req.promise = RuaController.listDatas(getOrder(req)); next()
}

/**
 * Populates the ```req.promise``` with a promise that a list of all ```entidades```.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/entidades```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.listEntidades = (req, res, next) => {
    req.promise = RuaController.listEntidades(req.query.idRua, getOrder(req)); next()
}

/**
 * Populates the ```req.promise``` with a promise that a list of all ```posts```.
 * @details This function is used as a callback for the ```GET``` route ```/api/ruas/posts```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.listPosts = (req, res, next) => {
    req.promise = RuaController.listPosts(getSortBy(req), getOrder(req)); next()
}

/**
 * Populates the ```req.promise``` with a promise that a ```post``` is added to a ```rua```. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addPosts = (req, res, next) => {
    req.promise = RuaController.addPost(req.query.idRua, req.body); next()
}

/**
 * Populates the ```req.promise``` with a promise that a ```comment``` is added to a ```post```.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addComment = (req, res, next) => {
    req.promise = RuaController.addComment(req.body.idPost, req.body); next()
}