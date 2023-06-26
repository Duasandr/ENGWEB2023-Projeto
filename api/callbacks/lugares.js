// Callbacks for the Lugar route.

/**
 * Module dependencies
 */
const { LugarController } = require('../controllers/entities/lugar')

/**
 * Controller for the Lugar model
 * @extends Controller
 * @type {LugarController}
 */
const Lugar = new LugarController()

/**
 * Callback for the index api/lugares route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the lugares property, with its value being an array of Lugar objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.lugares = async (req, res, next) => {
    try {
        const documents = Lugar.getAll()
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}