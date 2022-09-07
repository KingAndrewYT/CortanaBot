const fs = require ('fs')
const {readFileSync, writeFileSync } = fs
const {stringify, parse} = JSON

const _afk = parse(readFileSync('./JSONS/afk.json'))

const addAfkUser = (sender, time, reason) => {
    const obj = {id: sender, time: time, reason: reason}
    _afk.push(obj)
    writeFileSync('./JSONS/afk.json', stringify(_afk))
}

const checkAfkUser = (sender) => {
    let status = false
    Object.keys(_afk).forEach(i => {
        if(_afk[i].id === sender){
            status = true
        }
    })
    return status
}

const getAfkReason = (sender) => {
    let position = false
    Object.keys(_afk).forEach(i =>{
        if(_afk[i].id === sender){
            position = i
        }
    })
    if (position !== false){
        return _afk[position].reason
    }
}

const getAfkTime = (sender) => {
    let position = false
    Object.keys(_afk).forEach(i =>{
        if(_afk[i].id === sender){
            position = i
        }
    })
    if (position !== false){
        return _afk[position].time
    }
}

const getAfkId = (sender) => {
    let position = false
    Object.keys(_afk).forEach(i =>{
        if(_afk[i].id === sender){
            position = i
        }
    })
    if (position !== false){
        return _afk[position].id
    }
}

const getAfkPosition = (sender) => {
    let position = false
    Object.keys(_afk).forEach(i => {
        if (_afk[i].id === sender){
            position = i
        }
    })
    return position
}


module.exports = {getAfkPosition, getAfkId, getAfkTime, getAfkReason, checkAfkUser, addAfkUser}