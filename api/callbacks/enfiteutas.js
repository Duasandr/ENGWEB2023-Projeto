// Callbacks for the Enfiteuta route.

/**
 * Module dependencies
 */
const { EnfiteutaController } = require('../controllers/entities/enfiteuta')

/**
 * Controller for the Enfiteuta model
 * @extends Controller
 * @type {EnfiteutaController}
 */
const controller = new EnfiteutaController()

/**
 * Callback for the index api/enfiteutas route.
 * @details Writes a JSON object with all the enfiteutas in the database to the response. 
 * The JSON object is stored in the enfiteutas property, with its value being an array of Enfiteuta objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = async (req, res, next) => {
    try{
        const documentArray = await controller.getAll()
        res.status(200).jsonp({ enfiteutas: documentArray })
    } catch (err) {
        console.error(err.stack)
        res.status(500).jsonp({ error: err.message })
    }
}