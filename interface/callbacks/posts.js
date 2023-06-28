const axios = require('axios')

// GET

exports.getPosts = (req, res, next) => {
    axios({
        method: 'get',
        url: 'http://localhost:13002/api/ruas/posts'
    })
        .then((response) => {
            res.render('posts/list', { data: response.data })
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/list', { data: [], error: "Não foi possível obter posts." })
        })
}

exports.getComment = (req, res, next) => {
    res.render('posts/forms/comment', { post_id: req.params.id , user: {username: "Teste"}})
}

// POST

exports.postComment = (req, res, next) => {
    axios({
        method: 'post',
        url: 'http://localhost:13002/api/ruas/posts/comment/' + req.params.id,
        data: req.body
    })
        .then((response) => {
            res.redirect('/posts')
        })
        .catch((error) => {
            console.log(error)
            res.render('posts/forms/comment', { post_id: req.params.id , error: "Não foi possível inserir comentário." })
        })
}

