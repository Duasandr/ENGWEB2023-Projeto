/**
 * Model dependencies
 */
const LugarModel = require('../../models/entities/lugar');
const Controller = require('../controller')

/**
 * Controller for the Lugar model
 * @extends Controller
 */
class LugarController extends Controller {
    /**
     * Creates a new LugarController
     * @details The model to use, defaults to LugarModel
     * @returns {LugarController} - The created controller
    */
    constructor() { super(LugarModel) }
}

module.exports = { LugarController }