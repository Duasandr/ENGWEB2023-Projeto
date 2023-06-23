/**
 * @class Controller
 * @classdesc A controller for a model. All common methods are implemented here.
 */
class Controller {
    /**
     * Represents the sort order for queries
     */
    static SORT = {
        ASC: 1,
        DESC: -1
    }
    
    /**
     * Creates a new Controller with the given model
     * @param {*} model - The model to use
     */
    constructor(model) { this.model = model }

    // Queries

    /**
     * Finds all documents in the model
     * @returns {Promise} - The promise of the query
     */
    getAll() { return this.model.find({}, {}).exec() }

    /**
     * Returns all documents in the model sorted by the given parameters
     * @param {*} sortParams - The parameters to sort by
     * @returns {Promise} - The promise of the query
     */
    getAllSorted(sortParams) { return this.model.find({}, {}).sort(sortParams).exec() }

    /**
     * Finds a document by its id
     * @param {*} id - The id of the document to find
     * @returns {Promise} - The promise of the query
     */
    getById(id) { return this.model.findById(id).exec() }
    
    /**
     * Updates a document in the database
     * @param {*} id - The id of the document to update
     * @param {*} document - The document information to update 
     * @returns {Promise} - The promise of the query
     */
    update(id, document) { return this.model.findByIdAndUpdate(id, document).exec() }

    // End Queries

    /**
     * Creates a document in the database
     * @param {*} document - The document to create
     * @returns {Promise} - The promise of the query
     */
    create(document) { return this.model.create(document) }
}

module.exports = Controller 