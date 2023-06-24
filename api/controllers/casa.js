/**
 * Model dependencies
 */
const CasaModel = require('../models/casa');
const Controller = require('./controller')

/**
 * Controller for the Casa model
 * @extends Controller
 */
class CasaController extends Controller {
    /**
     * Creates a new casaController
     * @details The model to use, defaults to CasaModel
     * @returns {casaController} - The created controller
    */
    constructor() { super(CasaModel) }
}

module.exports = { CasaController }