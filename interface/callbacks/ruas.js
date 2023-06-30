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

exports.getRua = (req, res, next) => {
    axios({
        method: 'get',
        url: 'http://localhost:13002/api/ruas/get/' + req.params.id
    })
        .then((response) => {
            res.render('ruas/details', { rua: response.data })
        })
        .catch((error) => {
            console.log(error.message)
            res.render('error', { error: "Não foi possível obter a rua" })
        })
}

exports.getAdd = (req, res, next) => {
    res.render('ruas/forms/add', {})
}

// POST

exports.postAdd = (req, res, next) => {

    if (!(req.casasNumero instanceof Array)) {
        req.body.casasNumero = [req.body.casasNumero]
        req.body.casasForo = [req.body.casasForo]
        req.body.casasEnfiteuta = [req.body.casasEnfiteuta]
        req.body.casasDesc = [req.body.casasDesc]
        req.body.legendasImagens = [req.body.legendasImagens]
    }
    console.log(req.body)
    if (req.files) {
        const imagens = []

        var i = 0
        req.files.forEach(imagem => {
            imagens.push(
                {
                    "path": "/imagens/" + imagem.originalname,
                    "legenda": req.body.legendasImagens[i++]
                }
            )
        })
        req.body.imagens = imagens
    }
    const document = {
        "_id": "MRB-" + req.body.numero + "-" + req.body.nome,
        "nome": req.body.nome,
        "numero": req.body.numero,
        "paragrafos": req.body.paragrafos,
        "imagens": req.body.imagens,
        "casas": []
    }


    var i = 0

    req.body.casasNumero.forEach((numero) => {
        if (numero != undefined) {
            const casa = {
                "_id": "MRB-CASA-" + req.body.numero + "-" + numero,
                "numero": numero,
                "foro": req.body.casasForo[i],
                "enfiteuta": req.body.casasEnfiteuta[i],
                "descricao": req.body.casasDesc[i],
                "vista": ""
            }

            document.casas.push(casa)
        }
    })
    req.data = document
    next()

}

exports.postAddXml = (req, res, next) => {
    if (!req.files) {
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
        next()
    }
}

exports.storeData = (req, res, next) => {
    if (req.error) {
        next()
    } else {
        axios({
            method: 'post',
            url: 'http://localhost:13002/api' + "/ruas",
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

exports.confirmPostAdd = (req, res, next) => {
    if (req.error) {
        console.log(req.error)
        res.status(500).render('ruas/forms/add', { error: req.error.message })
    } else {
        success = ""
        if (req.files && req.files.extension != 'xml') {
            success += "Foram inseridas " + req.files.length + " imagens.\n"
        }
        var inserted = 1
        if (req.data instanceof Array) {
            inserted = req.data.length
        }

        success += "Foram inseridos " + req.data.length + " documentos."
        res.status(200).render('ruas/forms/add', { success: "Foram inseridos " + inserted + " documentos." })
    }
}