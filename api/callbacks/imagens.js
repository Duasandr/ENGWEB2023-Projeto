// Callbacks for the imagem route.

/**
 * Module dependencies
 */
const { ImagemController } = require('../controllers/entities/imagem')

/**
 * Controller for the Imagem model
 * @extends Controller
 * @type {ImagemController}
 */
const controller = new ImagemController()

/**
 * Callback for the index api/imagens route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the imagens property, with its value being an array of Imagem objects.
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