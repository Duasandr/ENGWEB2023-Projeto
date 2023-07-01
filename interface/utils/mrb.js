const jsdom = require("jsdom")

cleanString = (str) => {
    // remove multiple spaces, newlines and tabs
    var cleanString = str.replace(/[\s\n\t]+/g, ' ')
    // remove punctuation except for accents
    cleanString = cleanString.replace(/[^\w\sÀ-ÿ\n]/g, '')
    // removes trailing spaces
    cleanString = cleanString.trim()

    return cleanString
}

cleanStringForId = (str) => {
    var cleanStr = cleanString(str)
    // remove spaces
    cleanStr = cleanStr.replace(/\s/g, '-')
    return cleanStr
}

capitalizeWordsString = (str) => {
    var words = cleanString(str).split(' ')
    var capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    return capitalizedWords.join(' ')
}

extractFiguras = (figurasElements) => {
    const figuras = []

    figurasElements.forEach(figuraElement => {
        const idAttribute = figuraElement.getAttribute('id')
        const imagemElement = figuraElement.querySelector('imagem')
        const pathAttribute = imagemElement.getAttribute('path')
        const legendaElement = figuraElement.querySelector('legenda')

        const idText = idAttribute
        const pathText = pathAttribute.replace(/..\/imagem\//g, '')
        const legendaText = legendaElement.textContent.trim()

        const figura = {
            "_id": idText,
            "path": pathText,
            "legenda": legendaText
        }

        figuras.push(figura)
    })

    return figuras
}

extractParas = (parasElements, refs) => {
    const paras = []

    parasElements.forEach(parasElement => {
        const lugarElements = parasElement.querySelectorAll('lugar')
        const dataElements = parasElement.querySelectorAll('data')
        const entidadeElements = parasElement.querySelectorAll('entidade')

        lugarElements.forEach(lugarElement => {
            var lugarText = lugarElement.getAttribute('norm')

            if(lugarText) {
                lugarText = capitalizeWordsString(lugarText)
            } else {
                lugarText = capitalizeWordsString(lugarElement.textContent)
            }

            const lugar = {
                "_id": "MRB-LUGAR-" + cleanStringForId(lugarText),
                "tipo": "lugar",
                "texto": lugarText,
            }

            if (!refs.find(l => l._id === lugar._id)) {
                refs.push(lugar)
            }

        })

        dataElements.forEach(dataElement => {
            const trimmedData = cleanString(dataElement.textContent)

            const data = {
                "_id": "MRB-DATA-" + cleanStringForId(trimmedData),
                "tipo": "data",
                "texto": trimmedData
            }

            if (!refs.find(d => d._id === data._id)) {
                refs.push(data)
            }
        })

        entidadeElements.forEach(entidadeElement => {
            const tipoAttribute = entidadeElement.getAttribute('tipo')
            const textTrimmed = capitalizeWordsString(entidadeElement.textContent)


            const entidade = {
                "_id": "MRB-ENTIDADE-" + tipoAttribute + "-" + cleanStringForId(textTrimmed),
                "tipo": tipoAttribute,
                "texto": textTrimmed
            }

            if (!refs.find(e => e._id === entidade._id)) {
                refs.push(entidade)
            }
        })

        paras.push(parasElement.textContent)
    })

    return paras
}

extractCasas = (casasElements, refs) => {
    const casas = []

    casasElements.forEach(casaElement => {
        const casa = {
            "_id": "",
            "numero": "",
            "foro": "",
            "enfiteuta": [],
            "descricao": [],
            "vista": ""
        }
        const numeroElement = casaElement.querySelector('número')
        const foroElement = casaElement.querySelector('foro')
        const enfiteutaElements = casaElement.querySelectorAll('enfiteuta')
        const descElement = casaElement.querySelector('desc')
        const vistaElement = casaElement.querySelector('vista')


        casa.numero = numeroElement.textContent.trim()
        casa._id = "MRB-CASA-" + casa.numero
        casa.foro = foroElement ? foroElement.textContent.trim() : ''
        casa.vista = vistaElement ? vistaElement.textContent.trim() : ''

        enfiteutaElements.forEach(enfiteutaElement => {
            const enfiteutaTextTrimmed = capitalizeWordsString(enfiteutaElement.textContent)

            casa.enfiteuta.push(enfiteutaTextTrimmed)
        })

        if (descElement) {
            casa.descricao = extractParas(descElement.querySelectorAll('para'), refs)
        }

        casas.push(casa)
    })

    return casas
}

exports.parseXml = (xmlString) => {
    const xmldoc = new jsdom.JSDOM(xmlString)
    var rua = {
        _id: "",
        "numero": "",
        "nome": "",
        "paragrafos": [],
        "imagens": [],
        "casas": [],
        "referencias": []
    }
    const ruaElement = xmldoc.window.document.querySelector('rua')
    const corpoElement = ruaElement.querySelector('corpo')
    const parasElements = ruaElement.querySelectorAll('para')
    const figurasElements = corpoElement.querySelectorAll('figura')
    const listaCasasElement = corpoElement.querySelector('lista-casas')
    const casasElements = listaCasasElement ? listaCasasElement.querySelectorAll('casa') : []

    rua.nome = ruaElement.querySelector('nome').textContent
    rua.numero = ruaElement.querySelector('número').textContent
    rua._id = "MRB-RUA-" + rua.numero + "-" + cleanStringForId(rua.nome)
    
    rua.imagens = extractFiguras(figurasElements)
    rua.paragrafos = extractParas(parasElements, rua.referencias)
    rua.casas = extractCasas(casasElements, rua.referencias)

    return rua

}