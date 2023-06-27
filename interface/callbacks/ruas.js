const axios = require('axios')
const mrb = require('../utils/mrb')
const fs = require('fs')

// GET

exports.getRuas = (req, res, next) => {
    axios({
        method: 'get',
        url: 'http://localhost:13002/api/ruas'
    })
        .then((response) => {
            res.render('ruas/list', { ruas: response.data })
        })
        .catch((error) => {
            console.log(error)
            res.render('ruas/list', { ruas: [], error: "Não foi possível obter as ruas" })
        })
}

exports.getAdd = (req, res, next) => {
    res.render('ruas/forms/add', {})
}

// POST

exports.postAddXml = (req, res, next) => {
    if(!req.files) {
        console.log('No files were uploaded. Multer failed.')
        req.error = { message: "Não foram enviados ficheiros." }
        next()
    } else {
        const data = []
        req.files.forEach(file => {
            const xmlString = fs.readFileSync(file.path, 'utf8')
            const rua = mrb.parseXml(xmlString)
            data.push(rua)
        })
        req.data = data
        req.collection = 'ruas'
        next()
    }
}

exports.storeData = (req, res, next) => {
    if(req.error) {
        next()
    } else {
        axios({
            method: 'post',
            url: 'http://localhost:13002/api/' + req.collection,
            data: req.data
        })
            .then((response) => {
                req.data = response.data
                next()
            })
            .catch((error) => {
                console.log(error)
                req.error = { message: "Não foi possível guardar os documentos." }
                next()
            })
    }
}

exports.handleResponse = (req, res, next) => {
    if(req.error) {
        res.status(500).render('ruas/forms/add', { error: req.error.message })
    } else {
        res.render('ruas/confirm/add', { data: req.data })
    }
}