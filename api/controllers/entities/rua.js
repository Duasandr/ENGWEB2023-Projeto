/**
 * Model dependencies
 */
const RuaModel = require('../../models/entities/rua');
const Controller = require('../controller')

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
     * @details The order is ascending by default, but can be changed to descending by passing -1 
     * as the order parameter or ```RuaController.SORT.DESC``` for readability.
     * @param {*} order Represents the order (1 for ascending, -1 for descending)
     * @returns {Promise} The promise of the query
     */
    getAllSortedByName(order = Controller.SORT.ASC) { return this.getAllSorted({ "nome": order }) }
}

module.exports = { RuaController }