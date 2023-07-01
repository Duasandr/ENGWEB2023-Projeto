const axios = require('axios')

const API_URL = process.env.API_URL || 'http://localhost:13002/api'

// GET

exports.getPosts = (req, res, next) => {
    var sort = ""
    if(req.query.sortBy) {
        sort = "?sortBy=" + req.query.sortBy + "&order=" + req.query.order
    } else {
        sort = "?sortBy=data_criado&order=-1"
    }

    console.log(sort)
    req.page = { name: 'posts/list' }
    req.promise = axios.get(API_URL + "/ruas/posts" + sort)
    next()
    
}

exports.getPostsAdd = (req, res, next) => {
    req.page = { name: 'posts/forms/add' }
    req.data = { idRua: req.query.idRua }
    next()
}

exports.getCommentAdd = (req, res, next) => {
    req.page = { name: 'posts/forms/comment' }
    req.data = { idPost: req.query.idPost }
    next()
}


// POST

exports.postAdd = (req, res, next) => {
    if(req.files) {
        const imagens = []

        req.files.forEach(imagem => {
            imagens.push(
                {
                    "path": "/imagens/" + imagem.originalname,
                    "legenda": imagem.filename
                }
            )    
        })

        req.body.imagens = imagens
    }
    
    req.page = { name: 'posts/confirm/add' }
    req.promise = axios.post(API_URL + "/ruas/posts/add?idRua=" + req.query.idRua, req.body)
    next()

}

exports.postComment = (req, res, next) => {
    req.page = { name: 'posts/confirm/comentario' }
    req.promise = axios.post(API_URL + "/ruas/posts/comments/add?idPost=" + req.query.idPost, req.body)
    next()
}

