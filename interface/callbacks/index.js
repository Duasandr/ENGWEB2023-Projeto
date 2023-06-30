const axios = require('axios')

// GET callbacks

/**
 * Redirects to the ruas page if the user is authenticated, otherwise redirects to the login page
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.getIndex = (req, res, next) => {
    if (req.user) {
        res.redirect('/ruas')
    } else {
        res.redirect('/auth')
    }
}