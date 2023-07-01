/**
 * These are generic callbacks that can be used by any route
 */

/**
 * Awaits a promise and stores the result in ```req.data``` or ```req.error``` if an error occurs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.awaitPromise = async (req, res, next) => {
    try {
        req.data = await req.promise
    } catch (error) {
        req.error = error
    } finally {
        next()
    }
}

/**
 * Handles the response based on the data stored in ```req.data``` or ```req.error```
 * @details If ```req.error``` is defined, the response will be a JSON object with the error message and status code of the error.
 * 
 * If ```req.data``` is defined, the response will be a JSON object with the data and status code 200.
 * 
 * If neither ```req.error``` or ```req.data``` are defined, the response will be a JSON object with the error message "Internal server error" and status code 500.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.handleResponse = (req, res, next) => {
    if(req.error) {
        res.status(req.error.status || 500).jsonp(req.error.message)
    } else if (req.data) {
        res.status(200).jsonp(req.data)
    } else {
        res.status(500).jsonp({ error: "Internal server error" })
    }
}