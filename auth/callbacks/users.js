const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

// Weird writing scret in all caps. Not that much of a secret, is it?
const SECRET = "EngWeb2023"

module.exports.verify = function (req, res, next) {
    const token = req.query.token

    if (!token) {
        req.error = "Token inixistente."
        next()
        return
    }

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            req.error = error
        } else {
            req.user = decoded
        }
        next()
    })
}

module.exports.registerUser = (req, res, next) => {
    const newUser = new UserModel({
        email: req.body.email,
        username: req.body.username,
        filiacao: req.body.filiacao
    })

    if(req.body.level) {
        newUser.level = req.body.level
    }
        

    UserModel.register(newUser, req.body.password, (error, user) => {
        if (error) {
            req.error = error
        }
        next()
    })
}

module.exports.signUser = (req, res, next) => {
    if (req.error) {
        next()
        return 
    } else {

        const payload = {
            email: req.user.email,
            username: req.user.username,
            level: req.user.level,
            filiacao: req.user.filiacao,
            sub: 'EngWeb2023 project'
        }
        const options = { expiresIn: 3600 }

        jwt.sign(payload, SECRET, options, (error, token) => {
            if (error) { 
                req.error = error 
            }
            else { 
                req.token = token 
            }
            next()
        })
    }
}

module.exports.handleResponse = (req, res, next) => {
    if (req.error) {
        res.status(500).jsonp({ error: req.error })
    } else if (req.token) {
        res.status(200).jsonp(req.token)
    } else {
        res.status(200).jsonp(req.user)
    }
}