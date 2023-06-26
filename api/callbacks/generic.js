/**
 * These are generic callbacks that can be used by any route
 */

/**
 * Handles the response from the database.
 * @details It receives the ```req``` object, and checks if it has an ```error``` property. 
 * If it does, it sends a 400 response with the error message. If it doesn't, it sends a 200 response with the data.
 * It should be used as the last middleware function in a route.
 * Check if the previous middleware functions added an ```error``` or a ```data``` property to the ```req``` object.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.handleResponse = (req, res, next) => {
    if(req.data) {
        res.status(200).jsonp(req.data)
    } else if (req.error) {
        console.log(req.error)
        res.status(400).jsonp({ error: req.error.message})
    } else {
        res.status(500).jsonp({ error: "Erro interno do servidor."})
    }
}