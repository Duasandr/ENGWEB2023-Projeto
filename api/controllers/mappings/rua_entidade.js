/**
 * Model dependencies
 */
const RuaEntidadeModel = require('../../models/mappings/rua_entidade');
const Controller = require('../controller')

/**
 * Controller for the RuaEntidade model
 * @extends Controller
 */
class RuaEntidadeController extends Controller {
    /**
     * Creates a new RuaEntidadeController
     * @details The model to use, defaults to RuaEntidadeModel
     * @returns {RuaEntidadeController} - The created controller
    */
    constructor() { super(RuaEntidadeModel) }

    /**
     * Finds all Entidades that reference a given Rua
     * @param {*} idRua 
     * @returns {Promise} - A promise that resolves to an array of Entidades
     */
    getEntidadesByRuaId(idRua) { return this.model.find({ idRua: idRua }, {_id: 0, idRua:0 }).populate('idEntidade').exec() }
}

module.exports = { RuaEntidadeController }