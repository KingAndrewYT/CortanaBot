const fs = require('fs')

const _level = JSON.parse(fs.readFileSync('./JSONS/leveling.json'))


//OBTENER EL ID DEL USUARIO
const getLevelingId = (sender) => { let position = false; Object.keys(_level).forEach(i => { if (_level[i].id === sender){  position = i }}); if (position == false){ const obj = {id: sender, xp: 0, level: 1, coins: 0, diamonds:0 }; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return sender }else{return _level[position].time}}

//OBTENER NIVEL
const getLevelingLevel = (sender) => { let position = false; Object.keys(_level).forEach(i => { if (_level[i].id === sender){  position = i }}); if (position == false){ const obj = {id: sender, xp: 0, level: 1, coins: 0, diamonds:0 }; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return sender }else{return _level[position].level}}

//OBTENER XP
const getLevelingXp = (sender) => { let position = false; Object.keys(_level).forEach(i => { if (_level[i].id === sender){  position = i }}); if (position == false){ const obj = {id: sender, xp: 0, level: 1, coins: 0, diamonds:0 }; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return sender }else{return _level[position].xp}}

//OBTENER MONEDAS
const getLevelingCoins = (sender) => { let position = false; Object.keys(_level).forEach(i => { if (_level[i].id === sender){  position = i }}); if (position == false){ const obj = {id: sender, xp: 0, level: 1, coins: 0, diamonds:0 }; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return sender }else{return _level[position].coins}}

//OBTENER DIAMANTES
const getLevelingDiamonds = (sender) => { let position = false; Object.keys(_level).forEach(i => { if (_level[i].id === sender){  position = i }}); if (position == false){ const obj = {id: sender, xp: 0, level: 1, coins: 0, diamonds:0 }; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return sender }else{return _level[position].diamonds}}

//AÑADIR NIVEL
const addLevelingLevel = (sender, ammount) => { let position = false; Object.keys(_level).forEach(i => {  if (_level[i].id === sender){ position = i } }); if (position !== false){ _level[position].level += ammount; fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)) } }

//AÑADIR XP
const addLevelingXp = (sender, ammount) => { let position = false; Object.keys(_level).forEach(i => {  if (_level[i].id === sender){ position = i } }); if (position !== false){ _level[position].xp += ammount; fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)) } }

//AÑADIR COINS
const addLevelingCoins = (sender, ammount) => { let position = false; Object.keys(_level).forEach(i => {  if (_level[i].id === sender){ position = i } }); if (position !== false){ _level[position].coins += ammount; fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)) } }

//AÑADIR DIAMONDS
const addLevelingDiamonds = (sender, ammount) => { let position = false; Object.keys(_level).forEach(i => {  if (_level[i].id === sender){ position = i } }); if (position !== false){ _level[position].diamonds += ammount; fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)) } }

//OBTENER RANGO DE USUARIO
const getUserRank = (sender) => { let position = false; _level.sort((a, b) => ( a.xp < b.xp ) ? 1 : -1); Object.keys(_level).forEach(i => { if (_level[i].id === sender){ position = i } }); if (position === false ){ const obj = {id: sender, xp: onabort, level: 1}; _level.push(obj); fs.writeFileSync('./JSONS/leveling.json', JSON.stringify(_level)); return 99 } else { return position + 1 } }

//COOLDOWN XP 
const xpGain = new Set()
const isGained = (sender) => { return !!xpGain.has(sender)}

const addCooldown = (sender) => { xpGain.add(sender); setTimeout(() => { return xpGain.delete(sender) }, 0)}


module.exports = {addCooldown, isGained, getUserRank, addLevelingDiamonds, addLevelingCoins, addLevelingXp, addLevelingLevel, getLevelingDiamonds, getLevelingCoins, getLevelingXp, getLevelingLevel, getLevelingId}