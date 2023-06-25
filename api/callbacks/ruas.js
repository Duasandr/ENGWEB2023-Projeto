// Callbacks for the ruas route.

/**
 * Module dependencies
 */
const { RuaController } = require('../controllers/entities/rua')

/**
 * Controller for the Rua model
 * @extends Controller
 * @type {RuaController}
 */
const controller = new RuaController()

/**
 * Callback for the index / route.
 * @details This is the callback for the index route. It simply returns a JSON object with a message.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = async (req, res, next) => {
    try{
        const documentArray = await controller.getAllSortedByName(RuaController.SORT.ASC)
        res.status(200).jsonp({ ruas: documentArray })
    } catch (err) {
        console.error(err.stack)
        res.status(500).jsonp({ error: err.message })
    }
}