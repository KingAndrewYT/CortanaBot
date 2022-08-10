const translate = require ('@vitalets/google-translate-api')

const traductor = (texto, idioma) => {
    return new Promise(async (resolve, reject) => {
        translate(texto, {client: 'gtx', to: idioma})
        .then((res) => resolve(res.text))
        .catch((error) => reject (error))
    })
}

module.exports = traductor