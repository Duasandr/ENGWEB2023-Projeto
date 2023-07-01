const axios = require('axios')

const AUTH_URL = "http://localhost:13001/auth"

exports.awaitPromise = async (req, res, next) => {
    if (req.promise) {
        try {
            const response = await req.promise
            req.data = response.data
        } catch (error) {
            req.error = error
        } finally {
            next()
        }
    } else {
        next()
    }
}

exports.handleResponse = (req, res, next) => {
    if (req.error) {
        res.status(400).render('error', { error: req.error, user: req.user })
    } else {
        res.status(200).render(req.page.name, { data: req.data, user: req.user })
    }
}

exports.verifyToken = async (req, res, next) => {
    if (req.cookies.token) {
        try {
            const response = await axios.get(AUTH_URL + "/users/verify?token=" + req.cookies.token)
            req.user = response.data
        } catch (error) {
            req.error = {
                message: "Não tem permissões para aceder a esta página"
            }
        } finally {
            next()
        }
    } else {
        req.error = {
            message: "Não tem permissões para aceder a esta página"
        }
        next()
    }
}

exports.checkLevel = (req, res, next) => {
    if (req.user && req.user.level != "admin") {
        req.error = {
            message: "Não tem permissões para aceder a esta página"
        }
    }

    next()
}