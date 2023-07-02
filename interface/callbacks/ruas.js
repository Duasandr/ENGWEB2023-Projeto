const axios = require('axios')
const mrb = require('../utils/mrb')
const fs = require('fs')

const API_URL = "http://localhost:13002/api"

exports.getRuas = (req, res, next) => {
    if (req.error) {
        next()
        console.log("getRuas error")
        return
    }

    var sort = ""
    if(req.query.sortBy) {
        sort = "?sortBy=" + req.query.sortBy + "&order=" + req.query.order
    } else {
        sort = "?sortBy=_id&order=1"
    }

    if(req.user.level == "admin") {
        req.page = { name: 'ruas/admin' }
    } else {
        req.page = { name: 'ruas/list' } 
    }

    req.promise = axios.get(API_URL + "/ruas" + sort)
    next()
}

exports.getRua = (req, res, next) => {
    if (req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/view' }
    req.promise = axios.get(API_URL + "/ruas/get/" + req.params.id)
    next()
}

exports.getAdd = (req, res, next) => {
    if (req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/forms/add' }
    next()
}

exports.getAdmin = (req, res, next) => {
    if (req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/admin' }
    req.promise = axios.get(API_URL + "/ruas")
    next()
}

// POST

exports.postAdd = (req, res, next) => {
    if (req.error) {
        next()
        return
    }

    if (!(req.casasNumero instanceof Array)) {
        req.body.casasNumero = [req.body.casasNumero]
        req.body.casasForo = [req.body.casasForo]
        req.body.casasEnfiteuta = [req.body.casasEnfiteuta]
        req.body.casasDesc = [req.body.casasDesc]
    }
    if(!(req.body.legendasImagens instanceof Array)) {
        req.body.legendasImagens = [req.body.legendasImagens]
    }

    if (req.files) {
        const imagens = []

        var i = 0
        req.files.forEach(imagem => {
            imagens.push(
                {
                    "path": "/" + imagem.originalname,
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
    if (req.error) {
        next()
        return
    }

    if (!req.files) {
        req.error = { message: "Não foram enviados ficheiros." }
        next()
        return
    }

    const data = []
    req.files.forEach(file => {
        const xmlString = fs.readFileSync(file.path, 'utf8')
        const rua = mrb.parseXml(xmlString)
        data.push(rua)
    })
    req.data = data

    next()
}

exports.storeData = (req, res, next) => {
    if (req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/confirm/add' }
    req.promise = axios.post(API_URL + "/ruas", req.data)
    next()
}

exports.getDelete = (req, res, next) => {
    if(req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/forms/delete' }
    req.data = { id: req.params.id }
    next()
}

exports.postDelete = (req, res, next) => {
    if(req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/confirm/delete' }
    req.promise = axios.post(API_URL + "/ruas/delete/" + req.params.id)
    next()
}

exports.getUpdate = (req, res, next) => {
    if(req.error) {
        next()
        return
    }

    req.page = { name: 'ruas/forms/update' }
    req.promise = axios.get(API_URL + "/ruas/get/" + req.params.id)
    next()
}

exports.postUpdate = (req, res, next) => {
    if(req.error) {
        next()
        return
    }

    const document = JSON.parse(req.body.rua)

    req.page = { name: 'ruas/confirm/update' }
    req.promise = axios.post(API_URL + "/ruas/update/" + req.params.id, document)
    next()
}

exports.getLugares = (req, res, next) => {
    if(req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/listLugares' }
    req.promise = axios.get(API_URL + "/ruas/lugares")
    next()
}

exports.getEntidades = (req, res, next) => {
    if(req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/listEntidades' }
    req.promise = axios.get(API_URL + "/ruas/entidades")
    next()
}

exports.getDatas = (req, res, next) => {
    if(req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/listDatas' }
    req.promise = axios.get(API_URL + "/ruas/datas")
    next()
}

exports.getRuasByData = (req, res, next) => {
    if(req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/list' }
    req.promise = axios.get(API_URL + "/ruas/datas/" + req.params.data)
    next()
}

exports.getRuasByLugar = (req, res, next) => {
    if(req.error) {
        next()
        return
    }
    
    req.page = { name: 'ruas/list' }
    req.promise = axios.get(API_URL + "/ruas/lugares/" + req.params.lugar)
    next()
}