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
const Imagem = new ImagemController()

/**
 * Callback for the index api/imagens route.
 * @details Writes a JSON object with all the imagens in the database to the response. 
 * The JSON object is stored in the imagens property, with its value being an array of Imagem objects.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.imagens = async (req, res, next) => {
    try {
        const documents = Imagem.getAll()
        req.data = documents
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}