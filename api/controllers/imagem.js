/**
 * Model dependencies
 */
const ImagemModel = require('../models/imagem');
const Controller = require('./controller')

/**
 * Controller for the Imagem model
 * @extends Controller
 */
class ImagemController extends Controller {
    /**
     * Creates a new ImagemController
     * @details The model to use, defaults to ImagemModel
     * @returns {ImagemController} - The created controller
    */
    constructor() { super(ImagemModel) }
}

module.exports = { ImagemController }