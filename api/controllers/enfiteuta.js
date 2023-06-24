/**
 * Model dependencies
 */
const EnfiteutaModel = require('../models/enfiteuta');
const Controller = require('./controller')

/**
 * Controller for the Enfiteuta model
 * @extends Controller
 */
class EnfiteutaController extends Controller {
    /**
     * Creates a new EnfiteutaController
     * @details The model to use, defaults to EnfiteutaModel
     * @returns {EnfiteutaController} - The created controller
    */
    constructor() { super(EnfiteutaModel) }
}

module.exports = { EnfiteutaController }