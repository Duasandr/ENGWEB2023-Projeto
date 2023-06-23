// Callbacks for the index route.

/**
 * Callback for the index / route.
 * @details This is the callback for the index route. It simply returns a JSON object with a message.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 */
exports.index = (req, res, next) => res.json({ message: 'Welcome to MRB API' }) 