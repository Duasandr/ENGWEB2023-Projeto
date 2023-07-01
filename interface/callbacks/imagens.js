const path = require('path')

exports.getImagem = (req, res, next) => {
    console.log(req.params.filename)
    res.sendFile("/uploads/imagens/" + req.params.filename, (error) => {
        if(error){
            console.log(error)
        }
    })
}