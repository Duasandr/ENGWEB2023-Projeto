const axios = require('axios');
const axiosParams = require('../axios-params/params')
const pageParams = require('../page-params/params');

/**
 * Handles the response from the services and renders the page
 * @param {*} res 
 * @param {*} pageName 
 * @param {*} response 
 */
handleResponse = (res, pageName, response) => {
    res.status(response.status).render(pageName, pageParams[pageName](response))
}

/**
 * Handles the error from the services and renders the page with an error message
 * @param {*} res 
 * @param {*} error 
 * @param {*} errorMessage  
 */
handleError = (res, error, errorMessage) => {
    console.log('Error: ' + error)
    handleResponse(res, 'error', errorMessage)
}

/**
 * Handles the request to the services
 * @param {*} res - response
 * @param {*} route - route name 
 */
exports.handleAxiosRequest = (req, res, route) => {
    axiosParamFunction = axiosParams[route]

    if (axiosParamFunction instanceof Function) {
        params = axiosParamFunction(req)
    } else {
        handleError(res, 'Error: ' + route + ' is not a function', 'Paigina não encontrada')
        return
    }
    
    axios[params.requestType](params.url, params.data)
        .then(response => {
            handleResponse(res, params.pageName, response)
        })
        .catch(error => {
            handleError(res, error, params.errorMessage)
        })
}



function verifyToken(req, res, next) {
    const token = req.cookies.token || req.body.token || req.query.token || ''

    axios.get(process.env.AUTH_URL + '/verify?token=' + token)
        .then(response => {
            console.log('Token verification success')
            req.user = response.data
            next()
        })
        .catch(error => {
            handleError(res, error, "Erro na verificação do token")
        })
}