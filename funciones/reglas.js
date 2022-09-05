const fs = require('fs')

const _rules = JSON.parse(fs.readFileSync('./JSONS/rules.json'))

const getRules = (gpid) => {
    Object.keys(_rules).forEach( i => {
        if (_rules[i].id === gpid){
            position = i
        }
    })
    if (position !== false){
        return _rules[position].rule
    }
}

const addRules = (gpid, regla) => {
    let status = false
    Object.keys(_rules).forEach(i => {
        if(_rules[i].id === gpid){
            status = true
            position = i
        }
    })
    if (status == true){
        if(_rules[position].id === gpid){
            _rules[position].rule = regla
            fs.writeFileSync('./JSONS/rules.json', JSON.stringify(_rules))
        }
    } else {
        const obj = { id: gpid, rule: regla }
        _rules.push(obj)
        fs.writeFileSync('./JSONS/rules.json', JSON.stringify(_rules))
        console.log(obj)
    }
}

const checkRules = (gpid) => {
    let status = false
    Object.keys(_rules).forEach(i => {
        if(_rules[i].id === gpid){
            status = true
        }
    })
    return status
}

const resetRules = (gpid) => {
    let well = _rules.indexOf(gpid)
    _rules.splice(well, 1)
    fs.writeFileSync('./JSONS/rules.json', JSON.stringify(_rules))
}

module.exports = {addRules, getRules, checkRules, resetRules}
