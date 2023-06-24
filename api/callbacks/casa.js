// Callbacks for the Casa route.

/**
 * Module dependencies
 */
const { CasaController } = require('../controllers/casa')

/**
 * Controller for the Casa model
 * @extends Controller
 * @type {CasaController}
 */
const controller = new CasaController()

/**
 * Callback for the index api/casas route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the ```casas``` property, with its value being an array of Casa objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = async (req, res, next) => {
    try{
        const documentArray = await controller.getAll()
        res.status(200).jsonp({ imagens: documentArray })
    } catch (err) {
        console.error(err.stack)
        res.status(500).jsonp({ error: err.message })
    }
}