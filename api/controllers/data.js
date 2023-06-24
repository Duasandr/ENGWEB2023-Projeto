/**
 * Model dependencies
 */
const DataModel = require('../models/data');
const Controller = require('./controller')

/**
 * Controller for the Data model
 * @extends Controller
 */
class DataController extends Controller {
    /**
     * Creates a new DataController
     * @details The model to use, defaults to DataModel
     * @returns {DataController} - The created controller
    */
    constructor() { super(DataModel) }
}

module.exports = { DataController }