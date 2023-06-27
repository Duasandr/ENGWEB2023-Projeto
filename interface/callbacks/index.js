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
        res.redirect('/login')
    }
}

/**
 * Renders the login form
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.getLogin = (req, res, next) => {
    res.render('loginForm', {})
}

/**
 * Renders the register form
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.getRegister = (req, res, next) => {
    res.render('registerForm', {})
}

// POST callbacks

/**
 * Posts the login form to the API and redirects to the ruas page if the login is successful, otherwise redirects to the login page
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.postLogin = (req, res, next) => {
    axios(axiosConfig.login(req))
        .then((response) => {
            res.cookie('token', response.data.token)
            res.redirect('/ruas')
        })
        .catch((error) => { 
            console.log(error)
            res.render('loginForm', { error: "Password ou email errados" }) 
        })
}

/**
 * Posts the register form to the API and renders the register confirmation page if the register is successful, otherwise renders the register form again
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.postRegister = (req, res, next) => {
    axios({
        method: 'post',
        url: 'http://localhost:13002/auth/register',
        data: req.body
    })
        .then((response) => {
            res.cookie('token', response.data.token)
            res.render('registerConfirm', { username: req.body.username })
        })
        .catch((error) => { 
            console.log(error)
            res.render('registerForm', { error: "Erro ao registar utilizador" }) 
        })
}
