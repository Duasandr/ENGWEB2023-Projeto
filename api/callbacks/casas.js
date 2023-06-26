// Callbacks for the Casa route.

/**
 * Module dependencies
 */
const { CasaController } = require('../controllers/entities/casa')

/**
 * Controller for the Casa model
 * @extends Controller
 * @type {CasaController}
 */
const Casa = new CasaController()

/**
 * Callback for the index api/casas route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the ```casas``` property, with its value being an array of Casa objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.casas = async (req, res, next) => {
    try {
        const documents = Casa.getAll()
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}