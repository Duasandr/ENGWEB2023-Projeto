exports.getIndex = (req, res, next) => {
    res.render('auth/index', { })
}

/**
 * Renders the login form
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.getLogin = (req, res, next) => {
    if (req.cookies.token || req.user) {
        res.redirect('/')
    } else {
        if(req.error) {
            res.render('auth/forms/login', { error: "Password ou email errados" })
        } else {
            res.render('auth/forms/login', { })
        }
    }
}

/**
 * Renders the register form
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.getRegister = (req, res, next) => {
    if(req.error) {
        console.log(req.error)
        res.render('auth/forms/register', { error: "Erro ao registar utilizador" })
    } else {
        res.render('auth/forms/register', { })
    }
}

// POST callbacks

/**
 * Posts the login form to the API and redirects to the ruas page if the login is successful, otherwise redirects to the login page
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next function in the chain
 */
exports.postLogin = (req, res, next) => {
    axios(
        {
            method: 'post',
            url: 'http://localhost:13001/auth/login',
            data: req.body
        }
    )
        .then((response) => {
            res.cookie('token', response.data.token)
            res.redirect('/ruas')
        })
        .catch((error) => { 
            console.log(error)
            res.redirect('/auth/login')
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
        url: 'http://localhost:13001/auth/register',
        data: req.body
    })
        .then((response) => {
            res.cookie('token', response.data.token)
            res.render('registerConfirm', { username: req.body.username })
        })
        .catch((error) => { 
            console.log(error)
            req.error = { message: error.message }
            res.redirect('/auth/register')
        })
}