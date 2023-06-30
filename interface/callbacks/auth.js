const axios = require('axios')

const AUTH_URL = "http://localhost:13001/auth"

exports.getIndex = (req, res, next) => {
    res.render('auth/index', { })
}

exports.getLogin = (req, res, next) => {
    res.render('auth/forms/login', { })
}

exports.getRegister = (req, res, next) => {
    res.render('auth/forms/register', { })
}

exports.postLogin = (req, res, next) => {
    axios.post(AUTH_URL + '/users/login', req.body)
        .then((response) => {
            res.cookie('token', response.data)
            res.render('auth/confirm/login', { })
        })
        .catch((error) => { 
            console.log(error)
            res.render('auth/forms/login', { error: "Password ou email errados" })
            res.status(400)
        })
}

exports.postRegister = (req, res, next) => {
    axios.post(AUTH_URL + '/users/register', req.body)
        .then((response) => {
            res.cookie('token', response.data)
            res.render('auth/confirm/register', { username: req.body.username })
        })
        .catch((error) => { 
            res.render('auth/forms/register', { error: "Username ou email já existem" })
            res.status(400)
        })
}

exports.getLogout = (req, res, next) => {
    res.clearCookie('token')
    res.redirect('/')
}