const axios = require('axios')

const API_URL = process.env.API_URL || 'http://localhost:13002/api'

// GET

exports.getPosts = (req, res, next) => {
    axios.get(API_URL + "/ruas/posts")
        .then((response) => {
            res.render('posts/list', { data: response.data, user: req.user })
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/list', { data: [], error: "Não foi possível obter posts.", user: req.user })
        })
}

exports.getPostsAdd = (req, res, next) => {
    res.render('posts/forms/add', { idRua: req.query.idRua, user: req.user })
}

exports.getCommentAdd = (req, res, next) => {
    res.render('posts/forms/comment', { idPost: req.query.idPost, user: req.user })
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

    axios({ method: 'post', url: API_URL + "/ruas/posts/add?idRua=" + req.query.idRua, data: req.body })
        .then((response) => {
            res.redirect('/posts')
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/forms/add', { idRua: req.query.idRua, user: req.user, error: "Não foi possível criar o post." })
        })

}

exports.postComment = (req, res, next) => {
    axios({ method: 'post', url: API_URL + "/ruas/posts/comments/add?idPost=" + req.query.idPost, data: req.body })
        .then((response) => {
            res.redirect('/posts')
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/forms/comment', { idPost: req.query.idPost, user: req.user, error: "Não foi possível inserir comentário." })
        })
}

