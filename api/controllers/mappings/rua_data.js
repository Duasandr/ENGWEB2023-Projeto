/**
 * Model dependencies
 */
const RuaDataModel = require('../../models/mappings/rua_data');
const Controller = require('../controller')

/**
 * Controller for the RuaData model
 * @extends Controller
 */
class RuaDataController extends Controller {
    /**
     * Creates a new RuaDataController
     * @details The model to use, defaults to RuaDataModel
     * @returns {RuaDataController} - The created controller
    */
    constructor() { super(RuaDataModel) }

    /**
     * Finds all Datas that reference a given Rua
     * @param {*} idRua 
     * @returns {Promise} - A promise that resolves to an array of Datas
     */
    getDatasByRuaId(idRua) { return this.model.find({ idRua: idRua }, {_id: 0, idRua:0 }).populate('idData').exec() }
}

module.exports = { RuaDataController }