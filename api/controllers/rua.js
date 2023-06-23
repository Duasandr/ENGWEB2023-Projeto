/**
 * Model dependencies
 */
const RuaModel = require('../models/rua');
const Controller = require('./controller')

/**
 * Controller for the Rua model
 * @extends Controller
 */
class RuaController extends Controller {
    /**
     * Creates a new RuaController
     * @details The model to use, defaults to RuaModel
     * @returns {RuaController} - The created controller
    */
    constructor() { super(RuaModel) }

    /**
     * Finds all documents ordered by name.
     * @param {*} order Represents the order (1 for ascending, -1 for descending)
     * @returns {Promise} - The promise of the query
     */
    getAllSortedByName(order) { return this.getAllSorted({ "nome": order }).exec() }
}

module.exports = { RuaController }