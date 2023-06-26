// Callbacks for the Data route.

/**
 * Module dependencies
 */
const { DataController } = require('../controllers/entities/data')

/**
 * Controller for the Data model
 * @extends Controller
 * @type {DataController}
 */
const Data = new DataController()

/**
 * Callback for the index api/datas route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the datas property, with its value being an array of Data objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.datas = async (req, res, next) => {
    try {
        const documents = Data.getAll()
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}