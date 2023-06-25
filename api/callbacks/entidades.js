// Callbacks for the Entidade route.

/**
 * Module dependencies
 */
const { EntidadeController } = require('../controllers/entities/entidade')

/**
 * Controller for the Entidade model
 * @extends Controller
 * @type {EntidadeController}
 */
const controller = new EntidadeController()

/**
 * Callback for the index api/entidades route.
 * @details Writes a JSON object with all the entidades in the database to the response. 
 * The JSON object is stored in the entidades property, with its value being an array of Entidade objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = async (req, res, next) => {
    try{
        const documentArray = await controller.getAll()
        res.status(200).jsonp({ entidades: documentArray })
    } catch (err) {
        console.error(err.stack)
        res.status(500).jsonp({ error: err.message })
    }
}