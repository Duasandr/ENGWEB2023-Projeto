/**
 * Model dependencies
 */
const CasaEnfiteutaModel = require('../../models/mappings/casa_enfiteuta');
const Controller = require('../controller')

/**
 * Controller for the CasaEnfiteuta model
 * @extends Controller
 */
class CasaEnfiteutaController extends Controller {
    /**
     * Creates a new CasaEnfiteutaController
     * @details The model to use, defaults to CasaEnfiteutaModel
     * @returns {CasaEnfiteutaController} - The created controller
    */
    constructor() { super(CasaEnfiteutaModel) }
}

module.exports = { CasaEnfiteutaController }