// Controlador para o modelo User

var UserModel = require('../models/user')

module.exports.list = () => {
    return UserModel.find().exec()
}

module.exports.get = (userId) => {
    return UserModel.find({ _id: userId }).exec()
}

module.exports.add = (user) => {
    return UserModel.create(user)
}

module.exports.delete = (userId) => {
    return UserModel.deleteOne({ _id: userId })
}