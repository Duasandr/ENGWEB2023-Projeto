
exports.getIndex = (req, res, next) => {
    if (req.user) {
        res.redirect('/ruas')
    } else {
        res.redirect('/auth')
    }
}