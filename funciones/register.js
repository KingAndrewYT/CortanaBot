const fs = require('fs')
const crypto = require('crypto')

const _registered = JSON.parse(fs.readFileSync('./JSONS/registered.json'))

//OBTENER FECHA DE REGISTRO
const getRegisteredTime = (sender) => { let position = false;  Object.keys(_registered).forEach(i => { if (_registered[i].id === sender){ position = i } }); if (position !== false){ return _registered[position].time }}

//OBTIENE LA EDAD DEL REGISTRADO
const getRegisteredAge = (sender) => { let position = false; Object.keys(_registered).forEach(i => { if (_registered[i].id === sender){ position = i } }); if (position !== false){ return _registered[position].age } }

//OBTENER SERIAL DEL REGISTRADO
const getRegisteredSerial = (sender) => { let position = false; Object.keys(_registered).forEach(i => { if (_registered[i].id === sender){ position = i } }); if (position !== false){ return _registered[position].serial } }

//OBTENER NOMBRE DEL REGISTRADO
const getRegisteredName = (sender) => { let position = false; Object.keys(_registered).forEach(i => { if (_registered[i].id === sender){ position = i } });  if (position !== false){ return _registered[position].name } }

//OBTENER ID DEL REGISTRADO
const getRegisteredId = (sender) => { let position = false; Object.keys(_registered).forEach(i => { if (_registered[i].id === sender){ position = i } });  if (position !== false){ return _registered[position].id } }

//OBTENER USUARIO RANDOM
const getRandomUserId = () => { return _registered[Math.floor(Math.random() * _registered.length)].id }

//REGISTRAR USUARIO
const addRegisteredUser = (id, username, time, /*age,*/ serial) => { const data = {id: id, name: username, time: time, /*age: age,*/ serial: serial}; _registered.push(data); fs.writeFileSync('./JSONS/registered.json', JSON.stringify(_registered)) }

//CREAR SERIAL
const createSerial = (size) => { return crypto.randomBytes(size).toString('hex').slice(0, size) }

//VERIFICAR SI UN USUARIO ESTA REGISTRADO
const checkRegisteredUser = (sender) => { let status = false; Object.keys(_registered).forEach(i => { if (_registered[i].id === sender) { status = true } }); return status }

//ELIMINAR USUARIO REGISTRADO
const unRegisterUser = (sender) => {
    let well = _registered.indexOf(sender)
    _registered.splice(well, 1)
    fs.writeFileSync('./JSONS/registered.json', JSON.stringify(_registered))
}
module.exports = {unRegisterUser, getRandomUserId, getRegisteredAge, getRegisteredId, getRegisteredName, getRegisteredSerial, getRegisteredTime, addRegisteredUser, createSerial, checkRegisteredUser}