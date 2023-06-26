// Callbacks for the ruas route.

/**
 * Module dependencies
 */
const { RuaController } = require('../controllers/entities/rua')
const { RuaLugarController } = require('../controllers/mappings/rua_lugar')
const { RuaDataController } = require('../controllers/mappings/rua_data')
const { RuaEntidadeController } = require('../controllers/mappings/rua_entidade')

/**
 * Controller for the Rua model
 * @extends Controller
 * @type {RuaController}
 */
const Rua = new RuaController()

/**
 * Controller for the RuaLugar model
 * @extends Controller
 * @type {RuaLugarController}
 */
const RuaLugar = new RuaLugarController()

/**
 * Controller for the RuaData model
 * @extends Controller
 * @type {RuaDataController}
 */
const RuaData = new RuaDataController()

/**
 * Controller for the RuaEntidade model
 * @extends Controller
 * @type {RuaEntidadeController}
 */
const RuaEntidade = new RuaEntidadeController()

/**
 * Callback for the index /ruas route.
 * @details This is the callback for the index route. It simply returns a JSON object with a message.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.ruas = async (req, res, next) => {
    try {
        const documents = await Rua.getAll()
        req.data = documents
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
exports.lugaresByRua = async (req, res, next) => {
    const query = req.query

    if (!query || !query.idRua) {
        req.error = 'Parametros em falta.'
    }
    else {
        try {
            const documents = await RuaLugar.getLugaresByRuaId(query.idRua)
            req.data = documents
        } catch (error) {
            req.error = error
        } finally {
            next()
        }
    }
}

/**
 * Retrieves all Entidade documents that reference a Rua document.
 * @details It adds a JSON object with the retrieved documents to the ```req``` inside a ```data``` property.
 * In case of error, it adds a JSON object with the error message to the ```req``` inside an ```error``` property.
 * It hands over the request to the next middleware function.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.datasByRua = async (req, res, next) => {
    const query = req.query

    if (!query || !query.idRua) {
        req.error = 'Parametros em falta.'
    }
    else {
        try {
            const documents = await RuaData.getDatasByRuaId(query.idRua)
            req.data = documents
        } catch (error) {
            req.error = error
        } finally {
            next()
        }
    }
}

exports.entidadesByRua = async (req, res, next) => {
    const query = req.query

    if (!query || !query.idRua) {
        req.error = 'Parametros em falta.'
    }
    else {
        try {
            const documents = await RuaEntidade.getEntidadesByRuaId(query.idRua)
            req.data = documents
        } catch (error) {
            req.error = error
        } finally {
            next()
        }
    }
}
