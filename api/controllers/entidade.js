/**
 * Model dependencies
 */
const EntidadeModel = require('../models/entidade');
const Controller = require('./controller')

/**
 * Controller for the Entidade model
 * @extends Controller
 */
class EntidadeController extends Controller {
    /**
     * Creates a new EntidadeController
     * @details The model to use, defaults to EntidadeModel
     * @returns {EntidadeController} - The created controller
    */
    constructor() { super(EntidadeModel) }
}

module.exports = { EntidadeController }