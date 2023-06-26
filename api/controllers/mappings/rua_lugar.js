/**
 * Model dependencies
 */
const RuaLugarModel = require('../../models/mappings/rua_lugar');
const Controller = require('../controller')

/**
 * Controller for the RuaLugar model
 * @extends Controller
 */
class RuaLugarController extends Controller {
    /**
     * Creates a new RuaLugarController
     * @details The model to use, defaults to RuaLugarModel
     * @returns {RuaLugarController} - The created controller
    */
    constructor() { super(RuaLugarModel) }

    /**
     * Finds all Lugares that reference a given Rua
     * @param {*} idRua 
     * @returns {Promise} - A promise that resolves to an array of Lugares
     */
    getLugaresByRuaId(idRua) { return this.model.find({ idRua: idRua }, {_id: 0, idRua:0 }).populate('idLugar').exec() }
}

module.exports = { RuaLugarController }