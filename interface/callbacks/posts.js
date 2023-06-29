const axios = require('axios')
const { query } = require('express')

const API_URL                         = process.env.API_URL || 'http://localhost:13002/api'
const API_RUAS_URL                    = API_URL + '/ruas'

const API_RUAS_POSTS_URL              = API_RUAS_URL + '/posts'
const API_RUAS_POSTS_ADD_URL          = API_RUAS_POSTS_URL + '/add'

const API_RUAS_POSTS_COMMENTS_URL     = API_RUAS_POSTS_URL + '/comments'
const API_RUAS_POSTS_COMMENTS_ADD_URL = API_RUAS_POSTS_COMMENTS_URL + '/add'


// GET

exports.getPosts = (req, res, next) => {
    axios({ method: 'get', url: API_RUAS_POSTS_URL})
        .then((response) => {
            res.render('posts/list', { data: response.data })
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/list', { data: [], error: "Não foi possível obter posts." })
        })
}

exports.getPostsAdd = (req, res, next) => {
    const query = req.query
    const idRua = query.idRua
    
    res.render('posts/forms/add', { idRua: idRua , user: { username: "Teste" } })
}

exports.getCommentAdd = (req, res, next) => {
    const query = req.query
    const idPost = query.idPost

    res.render('posts/forms/comment', { idPost: idPost , user: { username: "Teste" }})
}


// POST

exports.postAdd = (req, res, next) => {
    const query = req.query
    const idRua = query.idRua

    axios({ method: 'post', url: API_RUAS_POSTS_ADD_URL + "?idRua=" + idRua, data: req.body })
        .then((response) => { 
            res.redirect('/posts') 
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/forms/add', { idRua: idRua, user: { username: "Teste" }, error: "Não foi possível criar o post." })
        })

}

exports.postComment = (req, res, next) => {
    const query = req.query
    const idPost = req.query.idPost

    axios({ method: 'post', url: API_RUAS_POSTS_COMMENTS_ADD_URL + "?idPost=" + idPost, data: req.body })
        .then((response) => {
            res.redirect('/posts')
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/forms/comment', { idPost: idPost , user: { username: "Teste" }, error: "Não foi possível inserir comentário." })
        })
}

