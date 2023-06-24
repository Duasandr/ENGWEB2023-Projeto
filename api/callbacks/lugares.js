// Callbacks for the Lugar route.

/**
 * Module dependencies
 */
const { LugarController } = require('../controllers/Lugar')

/**
 * Controller for the Lugar model
 * @extends Controller
 * @type {LugarController}
 */
const controller = new LugarController()

/**
 * Callback for the index api/lugares route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the lugares property, with its value being an array of Lugar objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = async (req, res, next) => {
    try{
        const documentArray = await controller.getAll()
        res.status(200).jsonp({ lugares: documentArray })
    } catch (err) {
        console.error(err.stack)
        res.status(500).jsonp({ error: err.message })
    }
}