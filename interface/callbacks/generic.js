const axios = require('axios')

const AUTH_URL = "http://localhost:13001/auth"

exports.handleResponse = (req, res, next) => {
    if (req.error) {
        console.log(req.error)
        res.status(400)
    } else {
        res.status(200)
    }
}

exports.verifyToken = (req, res, next) => {
    console.log(req.cookies.token)
    axios.get(AUTH_URL + '/users/verify?token=' + req.cookies.token )
        .then((response) => { req.user = response.data })
        .catch((error) => { req.error = { message: "Não autorizado" } })
        .finally(() => { next() })
}