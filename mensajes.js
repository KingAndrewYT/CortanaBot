"use strict"
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
/*----------MODULOS----------*/
const {assertMediaContent, downloadMediaMessage, WA_DEFAULT_EPHEMERAL, downloadContentFromMessage, getContentType } = require ('@adiwajshing/baileys')
const { RAE } = require('rae-api'); const rae = new RAE();
const acrcloud = require ('acrcloud'); const acr = new acrcloud({ host: "identify-eu-west-1.acrcloud.com", access_key: "e82b8f70d39b088e8166835b1b3f0eb9", access_secret: "6C6g5TccDAE1FeBx6iJph2dwkANZb4cbarwj7jRj"})
//const bibliaApi = require('@amanda-mitchell/biblia-api'); const biblia = bibliaApi.createBibliaApiClient({apiKey: 'cddf6c0b615e0da8e8f8f5e0073190b8', fetch})
const gis = require('g-i-s')
const gir = require('another-node-reverse-image-search')
const google = require ('google-it')
const imgbbUp = require('imgbb-uploader')
const scraper = require('@bochilteam/scraper')
const fakeyou = require('./funciones/fakeyou.js')
const fetch = require('node-fetch')
const { writeFile } =  require ('fs/promises')
const {exec} = require ('child_process')
const {generate} = require ('flaming-text-generator')
const moment = require ('moment-timezone'); moment.tz.setDefault('America/Bogota').locale('es')
const gtts = require ('node-gtts'); const tts = gtts('es')
const ffmpeg = require ('fluent-ffmpeg')
const axios = require ('axios')
const fs = require('fs')
const translate = require ('./funciones/traductor.js')
const textToSpeak = require ('./funciones/IBM.js')
const funciones = require ('./funciones')
const utilidades = require('./utilidades')
const { color} = utilidades
const toast = require('./JSONS/toasts.js')
const menu = require('./JSONS/menus.js')
const mintake = require('mintake')
const { text } = require('figlet')
const { Aki } = require('aki-api')
const yts = require('yt-search')

let {inWA, groupSettings, getAdmins, getAll, getParticipants} = funciones
const {sendSticker, sendStickerFromUrl} = require ('./funciones/stickerprocess.js')
const {getRules, addRules, checkRules, resetRules} = require('./funciones/reglas.js')
const {unRegisterUser, getRandomUserId, getRegisteredAge, getRegisteredId, getRegisteredName, getRegisteredSerial, getRegisteredTime, addRegisteredUser, createSerial, checkRegisteredUser} = require('./funciones/register.js')
const {addCooldown, isGained, getUserRank, addLevelingDiamonds, addLevelingCoins, addLevelingXp, addLevelingLevel, getLevelingDiamonds, getLevelingCoins, getLevelingXp, getLevelingLevel, getLevelingId} = require('./funciones/level.js')
const {getAfkPosition, getAfkId, getAfkTime, getAfkReason, checkAfkUser, addAfkUser} = require('./funciones/afk.js')
let { readFileSync, writeFileSync, unlinkSync, existsSync} = fs
let { stringify, parse } = JSON

const log = console.log;
const error = console.error;

/*--------------ESPECIALES--------------*/
function padTo2Digits (num){ return num.toString().padStart(2, '0') }
function duracion (milisegundos){const minutos = Math.floor(milisegundos / 60000); const segundos = Math.floor((milisegundos % 60000) / 1000);return segundos === 60 ? `${minutos + 1}:00` : `${minutos}:${padTo2Digits(segundos)}`}
function getRandom (ext){return Math.floor(Math.random() * 1000)+ext}

const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const time = moment.tz('America/Bogota').format('H:mm:ss a')
const date = moment.tz('America/Bogota').format('DD/MM/YY')
const timeDate = moment.tz('America/Bogota').format('DD/MM/YY h:mm a')
const processTime = async (timestamp, now) => {return moment.duration(now - moment(timestamp * 1000)).asSeconds()}
const randomizer = (value) => {const random = value[Math.floor(Math.random() * value.length)]; return random}
const loose = ['Buena suerte para la próxima crack.','Esta vez no fue, talvez luego.', 'Date un baño de azucar para quitarte la sal que llevas encima.', 'Buen intento crack ;).', 'Le apuntaste pero no le pegaste.', 'Por poco ganas']
let looser = loose[Math.floor(Math.random() * loose.length)]

/*--------------JSON'S--------------*/
const info = parse(readFileSync('./JSONS/settings.json'))
let {numeroCreador, nombreCreador, nombreBot, copyright, igCreador, fbCreador, ytCreador, discordCreador, prefix, banChats, nopref, onepref, multipref } = info
const banned = parse(readFileSync('./JSONS/banned.json'))
const bienvenida = parse(readFileSync('./JSONS/bienvenida.json'))
const despedida = parse(readFileSync('./JSONS/despedida.json'))
const promovidos = parse(readFileSync('./JSONS/promovidos.json'))
const degradados = parse(readFileSync('./JSONS/degradados.json'))
const vip = parse(readFileSync('./JSONS/vip.json'))
const antienlaces = parse(readFileSync('./JSONS/antienlaces.json'))
const ceroenlaces = parse(readFileSync('./JSONS/ceroenlaces.json'))
const premium = parse(readFileSync('./JSONS/premium.json'))
const _afk = parse(readFileSync('./JSONS/afk.json'))
const leveling = parse(readFileSync('./JSONS/leveling.json'))
const _registered = parse(readFileSync('./JSONS/registered.json'))
const _rules = parse(readFileSync('./JSONS/rules.json'))
const _level = parse(readFileSync('./datos/level.json'))
const antiarabes = parse(readFileSync('./JSONS/antiarabes.json'))
const antifakes = parse(readFileSync('./JSONS/antifakes.json'))
const onlyowner = parse(readFileSync('./JSONS/onlyowner.json'))
const onlyvip = parse(readFileSync('./JSONS/onlyvip.json'))
const onlypremium = parse(readFileSync('./JSONS/onlypremium.json'))
const onlyadmins = parse(readFileSync('./JSONS/onlyadmins.json'))
const nsfw = parse(readFileSync('./JSONS/nsfw.json'))
const porno = parse(readFileSync('./JSONS/porno.json'))
const antivuv = parse(readFileSync('./JSONS/antivuv.json'))
const simi = parse(readFileSync('./JSONS/simi.json'))
const cortana = parse(readFileSync('./JSONS/cortana.json'))
const autostickers = parse(readFileSync('./JSONS/autostickers.json'))
const { apiNoBg, apiSimi, imgbb } = parse(readFileSync('./datos/apis.json'))

/*--------AKINATOR------------*/
let haIniciado = false
let aki = false
let usuarioJugando = false

module.exports = async (msg ,client) => {
    if (!msg.message) return
    if (msg.key && msg.key.remoteJid === 'status@broadcast') return
    const isMe = msg.key.fromMe
    var from = msg.key.remoteJid 

/*----------PLANTILLAS BOTONES ETC----------*/
    //const botones = [ {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1}, {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1}, {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1} ]        
    //const botonTemplate = [ {index: 1, urlButton: {displayText: 'Suscribete', url: 'https://www.youtube.com/c/KingAndrewYT'}}, {index: 2, callButton: {displayText: 'llamame', phoneNumber: '+57 322 8125090'}}, {index: 3, quickReplyButton: {displayText: 'Menu', id: '!menu'}}]
    //const listas = [{ title: "Section 1", rows: [ {title: "Option 1", rowId: "option1"}, {title: "Option 2", rowId: "option2", description: "This is a description"} ]}, { title: "Section 2", rows: [ {title: "Option 3", rowId: "option3"}, {title: "Option 4", rowId: "option4", description: "This is a description V2"} ]}]

/*----------ENVIO DE MENSAJES----------*/
    const sendText = async (texto, quote) => {client.sendMessage(from, {text: texto}, {quoted: quote})}
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const sendReplyWithMentions = async (texto, menciones) => {client.sendMessage(from, {text: texto, mentions: menciones}, {quoted: msg})}
    const sendTextWithMentions = async (texto, menciones) => {client.sendMessage(from, {text: texto, mentions: menciones})}
    const sendLocation = async (latitud, longitud) => {client.sendMessage(from, {location: {degreesLatitude: latitud, degreesLongitude: longitud}})}
    const sendVcard = async (texto, vcard) =>{client.sendMessage(from, {contacts:{displayName: texto, contacts: [{vcard}]}})}
    const sendButtonText = async (texto, botones = []) => {client.sendMessage(from, {text: texto, footer: copyright, buttons: botones, headerType: 1})}
    const sendButtonImage = async (imagen, texto, botones) => {client.sendMessage(from, {image: {url: imagen}, caption: texto, footer: copyright, buttons: botones, headerType: 4})}
    const sendTemplateButtonText = async (texto, botones) => {client.sendMessage(from, { text: texto, footer: copyright, templateButtons: botones}) }
    const sendTemplateButtonImage = async (imagen, texto, botones) => {client.sendMessage(from, { image: {url: imagen}, caption: texto, footer: copyright, templateButtons: botones })}
    const sendListText = async (text, btext, sections) => {client.sendMessage(from, {text: text, footer: copyright, title: '', buttonText: btext, sections },{quoted: msg})}
    const sendReaction = async (texto, para) => {client.sendMessage(para, { react: { text: texto, key: msg.key } })}
    const sendGif = async (ubicacion, texto) => {client.sendMessage(from, {video: {url: ubicacion}, caption: texto, gifPlayback: true})}
    const sendGifReply = async (ubicacion, texto) => {client.sendMessage(from, {video: ubicacion, caption: texto, gifPlayback: true},{quoted: msg})}
    const sendVideo = async (ubicacion, texto) => {client.sendMessage(from, {video: {url: ubicacion, caption: texto}})}
    const sendVideoReply = async (ubicacion, texto) => {client.sendMessage(from, {video: ubicacion, caption: texto},{quoted: msg})}
    const sendImageReply = async (ubicacion, texto) => {client.sendMessage(from, {image: {url:ubicacion}, caption: texto},{quoted: msg})}
    const sendAudio = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4' })}
    const sendAudioReply = async (ubicacion) => {client.sendMessage(from, { audio: ubicacion, mimetype: 'audio/mp4' },{quoted: msg})}
    const sendAudioDocReply = async (ubicacion, title) => {client.sendMessage(from, {document: ubicacion, mimetype: 'audio/mp3', fileName: `${title}.mp3`}, {quoted: msg})}
    const sendVideoDocReply = async (ubicacion, title) => {client.sendMessage(from, {document: ubicacion, mimetype: 'video/mp4', fileName: `${title}.mp4`}, {quoted: msg})}
    const sendPresence = async (presence) => {await client.sendPresenceUpdate(presence, from)} //recording -  paused - composing - unavailable - available
    const sendPtt = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4', ptt: true})}
    const sendPttReply = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4', ptt: true},{quoted: msg})}
    const sentSticker = async (ran) => {client.sendMessage(from, {sticker: readFileSync(ran)},{quoted:msg})}
    const grabando = () => { client.sendPresenceUpdate('recording', from)}
    const escribiendo = () => {client.sendPresenceUpdate('composing', from)}
    

/*--------------TIPOS DE MENSAJES--------------*/
    var messageType = Object.keys(msg.message)[0]
    var messageType2 = Object.keys(msg.message)[1]
    const isText = messageType === 'conversation' 
    const isImage = messageType === 'imageMessage'
    const isVideo = messageType === 'videoMessage'
    const isViewOnce = messageType === 'viewOnceMessage'
    const isMedia = (isImage || isVideo)
    const isAudio = messageType === 'audioMessage'
    const isSticker = messageType === 'stickerMessage'
    const isContact = messageType === 'contactMessage'
    const isLocation = messageType === 'locationMessage'
    const isLiveLocation = messageType === 'liveLocationMessage'
    const isDocument = messageType === 'documentMessage'
    const isDelete = messageType === 'protocolMessage'
    const isStatus = messageType === 'senderKeyDistributionMessage'
    const isReaction = messageType === 'reactionMessage'
    const isQuoted = messageType === 'extendedTextMessage'
    const isButtonResp = messageType === 'buttonsResponseMessage'
    const isTemplateButtonResp = messageType === 'templateButtonReplyMessage'
    const isListResp = messageType === 'listResponseMessage'
    const isInviteLink = messageType === 'groupInviteMessage'

 /*----------TIPOS DE MENSAJES RESPONDIDOS----------*/
    const quoted = messageType == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null  ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    var quotedMessageType = Object.keys(quoted)[0]
    const isQuotedText = quotedMessageType === 'conversation'
    const isQuotedImage = quotedMessageType === 'imageMessage'
    const isQuotedVideo = quotedMessageType === 'videoMessage'
    const isQuotedViewOnce = quotedMessageType === 'viewOnceMessage'
    const isQuotedMedia = (isQuotedImage || isQuotedVideo)
    const isQuotedAudio = quotedMessageType === 'audioMessage'
    const isQuotedSticker = quotedMessageType === 'stickerMessage'
    const isQuotedContact = quotedMessageType === 'contactMessage'
    const isQuotedLocation = quotedMessageType === 'locationMessage'
    const isQuotedLiveLocation = quotedMessageType === 'liveLocationMessage'
    const isQuotedDocument = quotedMessageType === 'documentMessage'
    const isQuotedDelete = quotedMessageType === 'protocolMessage'
    const isQuotedStatus = quotedMessageType === 'senderKeyDistributionMessage'
    const isQuotedReaction = quotedMessageType === 'reactionMessage'
    const isQuotedQuoted = quotedMessageType === 'extendedTextMessage'
    const isQuotedInviteLink = quotedMessageType === 'groupInviteMessage'

    const isTag = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant != '' : false
    const isMentionedTag = isQuoted && msg.message.extendedTextMessage.contextInfo.mentionedJid != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : false
    const isTagStick = isSticker && msg.message.stickerMessage.contextInfo != null ? msg.message.stickerMessage.contextInfo.quotedMessage : false

/*----------VIEW ONCE MESSAGES----------*/
    const typeVO = isViewOnce ? msg.message.viewOnceMessage.message : ''
    var VO = Object.keys(typeVO)[0]
    const isVOContext = VO === 'messageContextInfo'
    const isVOImage = VO === 'imageMessage'
    const isVOVideo = VO === 'videoMessage'

    const typeQVO = isQuotedViewOnce ? msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage.message : false
    var quotedVO = Object.keys(typeQVO)[0]
    const isQVOImage = quotedVO === 'imageMessage'
    const isQVOVideo = quotedVO === 'videoMessage'

/*-----------STICKER MESSAGE----------- */
    const typeTagStick = isTagStick ? msg.message.stickerMessage.contextInfo.quotedMessage : ''
    var quotedTagStick = Object.keys(typeTagStick)[0]
    const isExtendedTagStick = quotedTagStick === 'extendedTextMessage'
    const isTextTagStick = quotedTagStick === 'conversation'
    
    
/*----------OBTENCION DE MENSAJES----------*/
    const body = isText && msg.message[messageType] ? msg.message[messageType] : isImage && msg.message[messageType].caption ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption ? msg.message[messageType].caption : isQuoted && msg.message[messageType].text ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : isReaction && msg.message[messageType].text ? msg.message[messageType].text : isViewOnce && !isVOContext && msg.message[messageType].message[VO].caption.startsWith(prefix) ? msg.message[messageType].message[VO].caption : isTemplateButtonResp && msg.message[messageType].selectedId.startsWith(prefix) ? msg.message[messageType].selectedId : '' 
    const cmd = isText && msg.message[messageType].startsWith(prefix) ? msg.message[messageType] : isImage && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption :  isQuoted && msg.message[messageType].text.startsWith(prefix) ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId.startsWith(prefix) ? msg.message[messageType].selectedButtonId : isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message.listResponseMessage.singleSelectReply.selectedRowId: isReaction && msg.message[messageType].text ? msg.message[messageType].text : isViewOnce && !isVOContext && msg.message[messageType].message[VO].caption.startsWith(prefix) ? msg.message[messageType].message[VO].caption : isTemplateButtonResp && msg.message[messageType].selectedId.startsWith(prefix) ? msg.message[messageType].selectedId : '' 
    const chats = isText && msg.message[messageType] ? msg.message[messageType]: isQuoted && msg.message[messageType].text ? msg.message[messageType].text : ''
    const selectedButton = isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : ''
    const selectedList = isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const responseList = msg.message.listResponseMessage != null ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : false
    
/*----------PROCESAMIENTO DE MENSAJES----------*/
    const command = cmd.slice(1).trim().split(/ +/).shift().toLowerCase()
    const isCmd = cmd.startsWith(prefix)
    const args = cmd.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const q2 = args.join(' ').toLowerCase()
    const arg = cmd.trim().substring(cmd.indexOf(' ') + 1)
    const url = args.length != 0 ? args[0] : ''    
    const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')

/*--------------IDENTIFICADORES--------------*/
    const isGroup = from.includes('g.us')
    const isParticipant = from.includes('s.whatsapp.net')
    const numeroBotId = client.user.id.split("@")[0].slice(0, -3).concat('@s.whatsapp.net')
    const numeroBot = client.user.id.split("@")[0].slice(0, -3)
    const nombreBot = client.user.name
    const ownerNumber = `${numeroCreador}@s.whatsapp.net`
    const statusBroadcast = 'status@broadcast'
    const myGroupId = '120363028009957173@g.us'

    const sender = msg.key.fromMe ? numeroBotId : isGroup ? msg.key.participant : msg.key.remoteJid
    const pushname = msg.pushName || 'Usuario Desconocido'
    const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const groupDesc = isGroup ? groupMetadata.desc : ''
    const groupId = isGroup ? groupMetadata.id : ''
    const groupOwner = isGroup ? groupMetadata.owner : ''
    const groupAdmins = isGroup ? getAdmins(groupMetadata.participants) : ''
    const groupParticipants = isGroup ? getAll(groupMetadata.participants) : ''
    const miembros = isGroup ? getParticipants(groupMetadata.participants) : ''
    const isEphemeral = isGroup ? groupMetadata.ephemeralDuration != undefined : ''
    const isRestrict = isGroup ? groupMetadata.restrict : false
    const restrict = isRestrict ? 'administradores' : 'todos'
    const isAnnounce = isGroup ? groupMetadata.announce : false
    const announce = isAnnounce ? 'administradores' : 'todos'
    //const groupEphemeral = isEphemeral ? groupMetadata.ephemeralDuration : ''

/*-------------INCLUSORES---------------*/
    const isOwner = ownerNumber.includes(sender)
    const isAdmin = groupAdmins.includes(sender)
    const isBotAdmin = groupAdmins.includes(numeroBotId)
    const isRegistered = checkRegisteredUser(sender)
    const isBot = numeroBotId.includes(sender)
    const isBanned = banned.includes(sender)
    const isVip = vip.includes(sender)
    const isPremium = premium.includes(sender)
    const isBienvenida = isGroup ?  bienvenida.includes(from) : false
    const isDespedida = isGroup ?  despedida.includes(from) : false
    const isPromovidos = isGroup ?  promovidos.includes(from) : false
    const isDegradados = isGroup ?  degradados.includes(from) : false
    const isAfkOn = isGroup ? checkAfkUser(sender) : false
    const isAntienlaces = isGroup ? antienlaces.includes(from) : false
    const isCeroenlaces = isGroup ? ceroenlaces.includes(from) : false
    const isLeveling = isGroup ? leveling.includes(from) : false
    const isAntiarabes = isGroup ? antiarabes.includes(from) : false
    const isAntifakes = isGroup ? antifakes.includes(from) : false
    const isPrivate = banChats == true;
    const isOnlyvip = isGroup ? onlyvip.includes(from) : false
    const isOnlypremium = isGroup ? onlypremium.includes(from) : false
    const isOnlyowner = isGroup ? onlyowner.includes(from) : false
    const isOnlyadmins = isGroup ? onlyadmins.includes(from) : false
    const isNsfw = isGroup ? nsfw.includes(from) : false
    const isPorno = isGroup ? porno.includes(from) : false
    const isAntivuv = isGroup ? antivuv.includes(from) : false
    const isSimi = isGroup ? simi.includes(from) : false
    const isCortana = isGroup ? cortana.includes(from) : false
    const isAutostickers = isGroup ? autostickers.includes(from) : false

/*------------APIS-------------*/
    const nekos = `https://nekos.life/api/v2/img/`
    const memeapi = `https://meme-api.herokuapp.com/gimme/`

/*------------REGEX-------------*/
    const isYoutube = url.match(new RegExp(/https?:\/\/(www\.)?youtube\.com|https?:\/\/youtu\.be/gi))
    const isFacebook = url.match(new RegExp(/https?:\/\/(www\.)?facebook\.com|https?:\/\/fb\.watch|https?:\/\/(web\.)?facebook\.com/gi))
    const isTiktok = url.match(new RegExp(/https?:\/\/(m\.)?tiktok.com|https?:\/\/(www\.)?tiktok.com|https?:\/\/(vm\.)?tiktok.com|https?:\/\/(vt\.)?tiktok.com/gi))
    const isSoundcloud = url.match(new RegExp(/https?:\/\/(www\.)?soundcloud.com/gi))
    const isInstagram = url.match(new RegExp(/https?:\/\/(www\.)?instagram\.com/gi))
    const isSpotify = url.match(new RegExp(/https?:\/\/(open\.)?spotify\.com/gi))
    const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
    const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
    const isLine = url.match(new RegExp(/https?:\/\/(store\.)?line\.me\/stickershop/gi))
    const isTelegram = chats.match(new RegExp(/https?:\/\/(www\.)?t\.me\/addstickers/gi))    
    const isWaLink = url.match(new RegExp(/https?:\/\/(www\.)?chat.whatsapp.com/gi))
    const isLinkWa = chats.includes('chat.whatsapp.com/')
    const isLink = chats.match(new RegExp(/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi))
    const linkWA = q.split('https://chat.whatsapp.com/')[1]

/*----------VARIABLES----------*/ 
    const horario = moment().format('HH')
    var saludo = 'feliz media noche 🌃' 
    if (horario >= '01' && horario <= '04') { var saludo = 'feliz madrugada 🌃'}
    if (horario >= '05' && horario <= '07') { var saludo = 'feliz inicio de dia 🌥️'}
    if (horario >= '08' && horario <= '11') { var saludo = 'buenos dias 🌤️'}
    if (horario >= '12' && horario <= '17') { var saludo = 'buenas tardes🌇'}
    if (horario >= '18' && horario <= '23') { var saludo = 'buenas noches 🌃'}

    var tipoDeUsr = '·🔮 Participante·'    
    if (isAdmin){ var tipoDeUsr = '·•🛂 Administrador·' }
    if (isPremium) { var tipoDeUsr = '·•🌟 Usuario Premium·' }
    if (isBot){ var tipoDeUsr = '·•🤖 BOT·' }
    if (isVip){ var tipoDeUsr = '·•⚜ Usuario VIP·' }
    if (isOwner) { var tipoDeUsr = '·•💻 Desarrollador·' }
    
    const informacion = toast.info(pushname, tipoDeUsr)

    const akil0 = [{ rows: [{ title: `Si`, rowId: `${prefix}aki 0` },{ title: `No`, rowId: `${prefix}aki 1` }, { title: `No lo se`, rowId: `${prefix}aki 2` }, { title: `Probablemente`, rowId: `${prefix}aki 3` },{ title: `Probablemente no`, rowId: `${prefix}aki 4` }] }]
    const akil1 = [{ rows: [{ title: `Si`, rowId: `${prefix}aki 0` },{ title: `No`, rowId: `${prefix}aki 1` }, { title: `No lo se`, rowId: `${prefix}aki 2` }, { title: `Probablemente`, rowId: `${prefix}aki 3` },{ title: `Probablemente no`, rowId: `${prefix}aki 4` },{ title: `<= Anterior`, rowId: `${prefix}aki atras` }] }]
    
    /*if (isReaction){
        const emojiReaction = msg.message.reactionMessage.text
        var reactionEmoji = 'Reaccion Desconocida'
        if (emojiReaction === '😂'){var reactionEmoji = 'Reaccion de Risa 😂'}
        if ((emojiReaction === '❤️')||(emojiReaction === '❤')){var reactionEmoji = 'Reaccion de Amor ❤️'}
        if (emojiReaction === '😮'){var reactionEmoji = 'Reaccion de Sorpresa 😮'}
        if (emojiReaction === '😢'){var reactionEmoji = 'Reaccion de Tristeza 😢'}
        if (emojiReaction === '👍'){var reactionEmoji = 'Reaccion de Gusto 👍'}
        if (emojiReaction === '🙏'){var reactionEmoji = 'Reaccion de Agradecimiento 🙏'}
        log(reactionEmoji)
    }*/
/*----------FUNCIONES----------*/
    if (!isMe && !isGroup && !isOwner) return
    if (!isMe && isBanned && !isOwner) return
    
    if (!isMe && isCmd && isPrivate && !isOwner ) {return sendReply('[ERROR] => Comandos deshabilitados.')}
    if (!isMe && isCmd && !isGroup && !isVip && !isOwner) {return sendReply( toast.novip())}
    if (!isMe && isCmd && isOnlyowner && !isOwner) {return sendReply( toast.msgonlyowners())}
    if (!isMe && isCmd && isOnlyvip && !isVip && !isOwner ) {return sendReply( toast.msgonlyvips())}
    if (!isMe && isCmd && isOnlypremium && !isPremium && !isVip && !isOwner) {return sendReply( toast.msgonlypremiums())}
    if (!isMe && isCmd && isOnlyadmins && !isAdmin && !isVip && !isOwner ) {return sendReply( toast.msgonlyadms())}

    if (!isMe && isGroup && isLink && isCeroenlaces && !isAdmin && !isOwner && isBotAdmin) return await client.groupParticipantsUpdate(from,[sender], 'remove').then(() => client.sendMessage(from, { delete: {remoteJid: msg.key.remoteJid, fromMe: msg.key.fromMe, id:msg.key.id , participant: msg.key.participant} })).then(() => `El usuario @${sender.split(('@')[0])}`)
    if (!isMe && isGroup && isLinkWa && isAntienlaces && !isAdmin && !isOwner && isBotAdmin) return await client.groupParticipantsUpdate(from,[sender], 'remove').then(() => client.sendMessage(from, { delete: {remoteJid: msg.key.remoteJid, fromMe: msg.key.fromMe, id:msg.key.id , participant: msg.key.participant} }))
    if (!isMe && !isCmd && chats.toLowerCase().startsWith('@everyone')){ escribiendo(); const msg = chats.slice(10); sendTextWithMentions('@everyone ' + msg, groupParticipants) }
    if (!isMe && !isCmd && chats.toLowerCase().startsWith('@participantes')){ escribiendo(); const msg = chats.slice(15); sendTextWithMentions('@participantes ' + msg, miembros) }
    if (!isMe && !isCmd && chats.toLowerCase().startsWith('@admins')){ escribiendo(); const msg = chats.slice(8); sendTextWithMentions('@admins ' + msg, groupAdmins) }
    if (!isMe && !isCmd && chats.toLowerCase().includes('bot') && chats.toLowerCase().includes('te')&& chats.toLowerCase().includes('amo')){ sendReaction('❤️', from ) }
    
/*----------FUNCION DE REGISTRO----------*/
    if (!isMe && isCmd && !isRegistered || chats.toLowerCase() === 'registrar'){
        if (isRegistered) return sendReply(toast.userRegistered())
        const serialUser = createSerial(10); sendReply(toast.registering())
        try { var profile = await client.profilePictureUrl(sender, 'image') } catch { var profile = 'https://i.ibb.co/j4rsNvy/nopp.png' }
        const text = `◢┏━━━━━━━━━━━━━━━┓◣\n┏┫Registro: • Exitoso •\n┃┗┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┛\n┃┏┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┓\n┣┫• Id: ${serialUser}\n┣┫• Fecha: ${date}\n┣┫• Hora: ${time}\n┗┃• Nombre: ${pushname}\n◥┗━━━━━━━━━━━━━━━┛◤`
        const buttons = [{  buttonId:`${prefix}menu`, buttonText:{ displayText:'·MENU·' }, type:1  }]
        addRegisteredUser(sender, pushname, time, serialUser)
        sendButtonImage(profile, text, buttons)
    }
    if(chats.toLowerCase() === 'unregister'){
        if (!isRegistered) return sendReply(toast.userUnRegistered())
        unRegisterUser(sender)
        sendReply(toast.unregistered())
    }

/*----------FUNCION DE NIVEL----------*/
    const levelRole = getLevelingLevel(sender, _level)
        var role = 'Pre Super Saiyajin'
        if (levelRole >= 15){ role = 'Super Saiyajin Fase I' } 
        if (levelRole >= 30){ role = 'Super Saiyajin Fase II' }
        if (levelRole >= 45){ role = 'Super Saiyajin Fase III' }
        if (levelRole >= 60){ role = 'Super Saiyajin Fase IV' }
        if (levelRole >= 75){ role = 'Super Saiyajin Fase V' }
        if (levelRole >= 90){ role = 'Super Saiyajin Fase VI' }
        if (levelRole >= 105){ role = 'Super Saiyajin Legendario' }
        if (levelRole >= 120){ role = 'Super Saiyajin Rage' }
        if (levelRole >= 135){ role = 'Super Saiyajin Dios' }
        if (levelRole >= 150){ role = 'Super Saiyajin Azul' }
        if (levelRole >= 165){ role = 'Super Saiyajin Rosa' }
        if (levelRole >= 180){ role = 'Super Saiyajin Azul Perfecto' }
        if (levelRole >= 195){ role = 'Super Saiyajin Evolucionado' }
        if (levelRole >= 210){ role = 'Super Saiyajin Ultrainstinto' }
        if (levelRole >= 225){ role = 'Super Saiyajin Ultrainstinto Masterizado' }

    if (!isMe && isGroup && !isGained(sender) && isLeveling) {
        addCooldown(sender)
        const currentLevel = getLevelingLevel(sender)
        const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
        const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
        addLevelingXp(sender, amountXp)
        if (requiredXp <= getLevelingXp(sender)){
            addLevelingLevel(sender, 1)
            const userLevel = getLevelingXp(sender)
            const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
            sendReply(toast.levelUp(pushname, sender, fetchXp, currentLevel, role))
        }
    }
/*----------FUNCION AFK----------*/
    if(!isMe && isGroup && isMentionedTag){
        let jids = [...new Set([...(msg.message.extendedTextMessage.contextInfo.mentionedJid || []), ...(isQuoted ? [msg.message.extendedTextMessage.contextInfo.participant] : [])])]
        for (let i of jids){
            if(checkAfkUser(i)){
                const getId = getAfkId(i)
                const getReason = getAfkReason(getId)
                const getTime = getAfkTime(getId)
                sendReplyWithMentions(`*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_⋆⋅⊱∘[✧MODO AFK✧]∘⊰⋅⋆_\n\n_¡Ssshhhh🤫! @${getId.split("@")[0]} esta *AFK* actualmente, no le molestes!_\n   \n    ➸ *Razon*: ${getReason}\n    ➸ *Tiempo*: ${getTime}\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n`, [getId])
            }
        }
        if (checkAfkUser(sender) && !isCmd){
            _afk.splice(getAfkPosition(sender), 1)
            writeFileSync('./JSONS/afk.json', stringify(_afk))
            sendReplyWithMentions( `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola *·@${sender.split("@")[0]}·* estás de vuelta, *bienvenid@*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, [sender])
        }
    }

/*----------RESPUESTAS DE LA BOT----------*/
    if (!isMe && chats.toLowerCase().startsWith('..')){ sendReaction('🫶', from)}
    if (!isCmd && (chats).toLowerCase().startsWith('di ')){ const text = chats.slice(3) ; tts.save('./media/temp/di.mp3', text, async function(){ grabando(from) ; await sendPttReply('./media/temp/di.mp3').catch(e => {return sendReply('¡ERROR 404! Not Found.')}) })}

/*----------COMANDOS SIN PREFIJO----------*/
    if(!isMe && chats.toLowerCase().startsWith('reproduce')){
        if (chats.slice(10) == '') return tts.save('./media/temp/reproduce.mp3', 'por favor indica el nombre de la cancion que quieres escuchar', function (){sendPttReply('./media/temp/reproduce.mp3')})
        tts.save('./media/temp/reproduce.mp3', `Reproduciendo: ${chats.slice(10)}`, function (){sendPttReply('./media/temp/reproduce.mp3')})
        const ytUrl = await yts(chats.slice(10)).then(async res =>{return res.videos[0].url}).catch(async () => sendReply(toast.error()))
        const ytRep = await scraper.youtubedl(ytUrl).catch(async () => await scraper.youtubedlv2(ytUrl)).catch(async () => sendReply(toast.error()))
        const dlRep = await ytRep.audio['128kbps'].download()
        await sendPttReply(dlRep)
        }
    /*if(!isMe && chats.toLowerCase().startsWith('biblia')){ //ESM MODULE
        const pasaje = chats.slice(7)
        if(chats.slice(7) == '') return sendReply(toast.biblia())
        biblia.content({passage: chats.slice(7),format: 'txt', bible : 'leb'}).then(async res => {
        const bTrans = await translate(res, 'es').then(async () => {return res})}).catch(async () => sendReply(toast.error()))
        tts.save('./media/temp/biblia.mp3', bTrans, function(){sendPttReply('./media/temp/biblia.mp3')})
    }*/
    if (!isMe && chats.toLowerCase().startsWith('define')){
        const Tts = gtts('es')
        const word = chats.slice(7)
        log(word)
        if (word == '') return Tts.save('./media/temp/dict.mp3', 'Por favor escribe la palabra que quieres que defina para ti.', function (){ sendPtt('./media/temp/dict.mp3') })
        const search = await rae.searchWord(word);
        const wordId = search.getRes()[0].getId(); // gets 'hola' word id

        const result = await rae.fetchWord(wordId); // fetches the word as object
        const definitions = result.getDefinitions(); // gets all 'hola' definitions as Defintion[]
        const first = definitions[0].getDefinition();
        Tts.save('./media/temp/dict.mp3', 'Definición de' + word + first, function(){
            sendPtt('./media/temp/dict.mp3')
        })

    }

/*----------CHAT BOTS----------*/
    if(!isMe && isTag && !isCmd){
        const idMsg = msg.message.extendedTextMessage.contextInfo.participant
        if (idMsg != numeroBotId) return 
        await translate(chats, 'es').then(async (res) => {
            const {data} = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(res)}&lc=es&cf=false`)
            const {success} = data
            escribiendo()
            sendReply(success)
        })
    }
    if (!isMe && !isCmd && chats.toLowerCase().startsWith('simi ')){
        const text = chats.slice(5)
        const {data} = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=es&cf=false`)
        const {success} = data
        escribiendo()
        sendReply(success)
    }
    if (!isMe && !isCmd && chats.toLowerCase().startsWith('cortana ')){
        escribiendo()
        const text = chats.slice(8)
        await translate(text, 'en').then(async (res)=>{
            const {data} = await axios.get(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(res)}&key=l00NB88YglRMSz69Uocfjgvq1`)
            const {response} = data
            log(decodeURIComponent(response))
            await translate(response, 'es').then(async (res) =>{ await escribiendo(); await sendReply(res) }).catch(e => sendReply('¡ERROR 404!')) }).catch(e => sendReply('¡ERROR 405!'))
    }

/*----------ENVIO DE AUDIOS----------*/
    if (!isCmd && chats.toLowerCase().startsWith('ara')){ var fAra = fs.readdirSync('./media/ara'); let chosenAra = fAra[Math.floor(Math.random() * fAra.length)]; grabando(from); sendPttReply(`./media/ara/${chosenAra}`) }    
    if (!isCmd && chats.toLowerCase().startsWith('baka')){ var fBaka = fs.readdirSync('./media/baka'); let chosenBaka = fBaka[Math.floor(Math.random() * fBaka.length)]; grabando(from); sendPttReply(`./media/baka/${chosenBaka}`) }
    if (!isCmd && chats.toLowerCase().startsWith('nya')){ var fNya = fs.readdirSync('./media/nya'); let chosenNya = fNya[Math.floor(Math.random() * fNya.length)]; grabando(from); sendPttReply(`./media/nya/${chosenNya}`) }
    if (!isCmd && chats.toLowerCase().startsWith('onichan')){ var fOni = fs.readdirSync('./media/oniichan'); let chosenOni = fOni[Math.floor(Math.random() * fOni.length)]; grabando(from); sendPttReply(`./media/oniichan/${chosenOni}`) }
    if (!isCmd && chats.toLowerCase().startsWith('yamete')){ var fYam = fs.readdirSync('./media/yamete'); let chosenYam = fYam[Math.floor(Math.random() * fYam.length)]; grabando(from); sendPttReply(`./media/yamete/${chosenYam}`) }
    if (!isCmd && chats.toLowerCase().startsWith('meow')){ var fCat = fs.readdirSync('./media/gatito'); let chosenCat = fCat[Math.floor(Math.random() * fCat.length)]; grabando(from); sendPttReply(`./media/gatito/${chosenCat}`) }
    
    if (!isCmd && chats.toLowerCase().startsWith('oki')){sendPttReply('./media/resources/okidoki.mp3')}
    if (!isCmd && chats.toLowerCase().startsWith('turip')){sendPttReply('./media/resources/turip.mp3')}
    
/*-----------STICKER COMMAND */
    const u8 = isSticker ? msg.message.stickerMessage.fileSha256 : ''
    const stickerCommand = Buffer.from(u8).toString('base64')

/*---------FUNCION AUTOSTICKERS------ */
    if (!isMe && isMedia && isGroup && isAutostickers || isViewOnce && isGroup && isAutostickers && !isMe){
        if(isImage){ let media = './media/temp/autsticker.png'; await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media);  }
        if(isVideo){ if(msg.message.videoMessage.seconds > 10) return; let media = './media/temp/sticker.mp4'; await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media)}
        if (isVOImage){
            let media = './media/temp/sticker.png';
            const encmedia = msg.message.viewOnceMessage;
            await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});
            sendSticker(client,msg,from,media)
        }
        if (isVOVideo){
            let media = './media/temp/sticker.mp4';
            const encmedia = msg.message.viewOnceMessage;
            if(encmedia.message.videoMessage.seconds > 10) return
            await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});
            sendSticker(client,msg,from,media)
        }
    }

/*---------FUNCION ANTI VER UNA VEZ------ */
    if (isAntivuv){
        if(isVOImage){
            log('[ ViewOnce Image Detected ]')
            let media = './media/temp/antivo.png';
            const encmedia = msg.message.viewOnceMessage;
            await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});
            sendImageReply(media, toast.avoactive())
        }
        if(isVOVideo){
            log('[ ViewOnce Video Detected ]')
            let media = './media/temp/antivo.mp4';
            const encmedia = msg.message.viewOnceMessage;
            await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});
            sendVideoReply(readFileSync(media), toast.avoactive())
        }
    }

/*----------LOGS----------*/    
    if (isCmd && !isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname), 'a las: ' ,color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }
    if (isCmd && isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname),  'en',  color (groupName),  'a las: ',color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }

    switch(command){
        /*---------AJUSTES DE GRUPOS----------*/
        case 'abrir': case 'open': case 'desmutear':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (!isAnnounce) return sendReply(toast.notannounce(pushname))
            client.groupSettingUpdate(from, 'not_announcement')
            break
        case 'cerrar': case 'close': case 'mutear':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isAnnounce) return sendReply(toast.announce(pushname))
            await client.groupSettingUpdate(from, 'announcement')
            break
        case 'bloquear': case 'lock':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isRestrict) return sendReply(toast.desclock(pushname))
            client.groupSettingUpdate(from, 'locked')
            break
        case 'desbloquear': case 'unlock':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (!isRestrict) return sendReply(toast.descunclock(pushname))
            client.groupSettingUpdate(from, 'unlocked')
            break
        case 'promover': case 'promote': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isTag){
                const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.prombot(pushname))
                if (groupAdmins.includes(etiqueta)) return sendReply(toast.promadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido promovido al rango *Administrador*`
                return client.groupParticipantsUpdate(from,[etiqueta], 'promote').then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } if (isMentionedTag){
                const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentionedTag.length === 1){
                    if (!groupParticipants.includes(mentionedTag[0])) return sendReply(toast.outGroup(pushname))
                    if (mentionedTag[0] == numeroBotId) return sendReply(toast.prombot(pushname))
                    if (groupAdmins.includes(mentionedTag[0])) return sendReply(toast.promadmin(pushname))
                    const text = `[Success] => El usuario *@${mentionedTag[0].split("@")[0]}* ha sido promovido al rango *Administrador*`
                    return client.groupParticipantsUpdate(from,[mentionedTag[0]], 'promote').then(()=>{sendReplyWithMentions(text, [mentionedTag[0]])})    
                } if (mentionedTag.length > 1){
                    let texto = '·[...] Participantes a promover:\n'; let omitidos = '*⋆⋅⋅⋅⊱∘[✧PROMOTE LOG✧]∘⊰⋅⋅⋅⋆*\n\n·[...] Participantes omitidos·\n' ; let añadidos = [] ; let omited = [];
                    mentionedTag.map(i => {
                        if(añadidos.includes(i)) {omitidos += `➔Repetido: @${i.split('@')[0]}\n` ; return omited.push(i)}
                        if(i == numeroBotId) {omitidos += `➔Bot: @${i.split('@')[0]}\n` ; return omited.push(i) }
                        if(groupAdmins.includes(i)) {omitidos += `➔Admin: @${i.split('@')[0]}\n`; return omited.push(i) }
                        if(!groupParticipants.includes(i)) {omitidos += `No es integrante ➔: @${i.split('@')[0]}\n`; return omited.push(i)}
                        añadidos.push(i)
                        texto += `➔ @${i.split('@')[0]}\n`
                    })
                    if(añadidos.length == 0) texto += '*No se promovera a ningun participante*'
                    if(omited.length == 0) omitidos += '*Se promoveran a todos los usuarios etiquetados*\n'
                    texto += '\n\n' + copyright
                    return client.groupParticipantsUpdate(from, añadidos, 'promote').then(()=>{sendReplyWithMentions(omitidos + '\n' + texto, mentionedTag)})
                }}
            if (args.length == 0) return sendReplyWithMentions(toast.noprom(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.prombot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.promadmin(pushname))
            const promotetext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido promovido al rango *Administrador*`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'promote'); sendReplyWithMentions(promotetext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'degradar': case 'demote': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isTag){
                const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.dembot(pushname))
                if (!groupAdmins.includes(etiqueta)) return sendReply(toast.demadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido degradado del rango *Administrador*`
                return client.groupParticipantsUpdate(from,[etiqueta], 'demote').then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } 
            if (isMentionedTag){
                const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentionedTag.length === 1){
                    if (!groupParticipants.includes(mentionedTag[0])) return sendReply(toast.outGroup(pushname))
                    if (mentionedTag[0] == numeroBotId) return sendReply(toast.dembot(pushname))
                    if (!groupAdmins.includes(mentionedTag[0])) return sendReply(toast.demadmin(pushname))
                    const text = `[Success] => El usuario *@${mentionedTag[0].split("@")[0]}* ha sido degradado del rango *Administrador*`
                    return client.groupParticipantsUpdate(from,[mentionedTag[0]], 'demote').then(()=>{sendReplyWithMentions(text, [mentionedTag[0]])})    
                }
                if (mentionedTag.length > 1){
                    let texto = '·[...] Participantes a degradar:\n'; let omitidos = '*⋆⋅⋅⋅⊱∘[✧demote LOG✧]∘⊰⋅⋅⋅⋆*\n\n·[...] Participantes omitidos·\n' ; let añadidos = [] ; let omited = [];
                    mentionedTag.map(i => {
                        if(añadidos.includes(i)) {omitidos += `➔Repetido: @${i.split('@')[0]}\n` ; return omited.push(i)}
                        if(i == ownerNumber) {omitidos += `➔Creador: @${i.split("@")[0]}\n` ; return omited.push(i)}
                        if(i == numeroBotId) {omitidos += `➔Bot: @${i.split('@')[0]}\n` ; return omited.push(i) }
                        if(!groupParticipants.includes(i)) {omitidos += `No es integrante ➔: @${i.split('@')[0]}\n`; return omited.push(i)}
                        añadidos.push(i)
                        texto += `➔ @${i.split('@')[0]}\n`
                    })
                    if(añadidos.length == 0) texto += '*No se degradara a ningun participante*'
                    if(omited.length == 0) omitidos += '*Se degradaran a todos los usuarios etiquetados*\n'
                    texto += '\n\n' + copyright
                    return client.groupParticipantsUpdate(from, añadidos, 'demote').then(()=>{sendReplyWithMentions(omitidos + '\n' + texto, mentionedTag)})
                }
            }
            if (args.length == 0) return sendReplyWithMentions(toast.noprom(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.dembot(pushname))
            if (!groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.demadmin(pushname))
            const demotetext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido eliminado del grupo`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'demote'); sendReplyWithMentions(demotetext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'eliminar': case 'remove': case 'kick': case 'ban':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isTag){
                const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.rembot(pushname))
                if (groupAdmins.includes(etiqueta)) return sendReply(toast.remadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido eliminado grupo`
                return client.groupParticipantsUpdate(from,[etiqueta], 'remove').then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } 
            if (isMentionedTag){
                const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentionedTag.length === 1){
                    if (!groupParticipants.includes(mentionedTag[0])) return sendReply(toast.outGroup(pushname))
                    if (mentionedTag[0] == numeroBotId) return sendReply(toast.rembot(pushname))
                    if (groupAdmins.includes(mentionedTag[0])) return sendReply(toast.remadmin(pushname))
                    const text = `[Success] => El usuario *@${mentionedTag[0].split("@")[0]}* ha sido eliminado del grupo`
                    return client.groupParticipantsUpdate(from,[mentionedTag[0]], 'remove').then(()=>{sendReplyWithMentions(text, [mentionedTag[0]])})    
                }
                if (mentionedTag.length > 1){
                    let texto = '·[...] Participantes a eliminar:\n'; let omitidos = '*⋆⋅⋅⋅⊱∘[✧BAN LOG✧]∘⊰⋅⋅⋅⋆*\n\n·[...] Participantes omitidos·\n' ; let eliminados = [] ; let omited = [];
                    mentionedTag.map(i => {
                        if(eliminados.includes(i)) {omitidos += `➔Repetido: @${i.split('@')[0]}\n` ; return omited.push(i)}
                        if(i == ownerNumber) {omitidos += `➔Creador: @${i.split("@")[0]}\n` ; return omited.push(i)}
                        if(i == numeroBotId) {omitidos += `➔Bot: @${i.split('@')[0]}\n` ; return omited.push(i) }
                        if(groupAdmins.includes(i)) {omitidos += `➔Admin: @${i.split('@')[0]}\n`; return omited.push(i) }
                        if(!groupParticipants.includes(i)) {omitidos += `No Pertenece ➔: @${i.split('@')[0]}\n`; return omited.push(i)}
                        eliminados.push(i)
                        texto += `➔ @${i.split('@')[0]}\n`
                    })
                    if(eliminados.length == 0) texto += '*No se realizara ninguna eliminacion*'
                    if(omited.length == 0) omitidos += '*No se omitira ningun participante*\n'
                    texto += '\n\n' + copyright
                    return client.groupParticipantsUpdate(from, eliminados, 'remove').then(()=>{sendReplyWithMentions(omitidos + '\n' + texto, mentionedTag)})
                }
            }
            if (args.length == 0) return sendReplyWithMentions(toast.norem(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.rembot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.remadmin(pushname))
            const remtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido eliminado del grupo`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'remove'); sendReplyWithMentions(remtext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'añadir': case 'add': case 'unkick': case 'unban':
                if (!isGroup) return sendReply(toast.groups())
                if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
                if (!isBotAdmin) return sendReply(toast.adminbot())
                if (isTag){
                    const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                    if (groupParticipants.includes(etiqueta)) return sendReply(toast.onGroup(pushname))
                    if (etiqueta == numeroBotId) return sendReply(toast.addbot(pushname))
                    if (groupAdmins.includes(etiqueta)) return sendReply(toast.addadmin(pushname))
                    const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido añadido al grupo`
                    return client.groupParticipantsUpdate(from,[etiqueta], 'add').then(()=>{sendReplyWithMentions(text, [etiqueta])})
                } 
                if (isMentionedTag){
                    const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentionedTag.length === 1){
                        if (groupParticipants.includes(mentionedTag[0])) return sendReply(toast.onGroup(pushname))
                        if (mentionedTag[0] == numeroBotId) return sendReply(toast.addbot(pushname))
                        if (groupAdmins.includes(mentionedTag[0])) return sendReply(toast.addadmin(pushname))
                        const text = `[Success] => El usuario *@${mentionedTag[0].split("@")[0]}* ha sido eliminado del grupo`
                        return client.groupParticipantsUpdate(from,[mentionedTag[0]], 'add').then(()=>{sendReplyWithMentions(text, [mentionedTag[0]])})    
                    }
                    if (mentionedTag.length > 1){
                        let texto = '·[...] Participantes a añadir:\n'; let omitidos = '*⋆⋅⋅⋅⊱∘[✧ADD LOG✧]∘⊰⋅⋅⋅⋆*\n\n·[...] Participantes omitidos·\n' ; let añadidos = [] ; let omited = [];
                        mentionedTag.map(i => {
                            log(i)
                            if(añadidos.includes(i)) {omitidos += `➔Repetido: @${i.split('@')[0]}\n` ; return omited.push(i)}
                            if(i == numeroBotId) {omitidos += `➔Bot: @${i.split('@')[0]}\n` ; return omited.push(i) }
                            if(groupParticipants.includes(i)) {omitidos += `Ya Pertenece ➔: @${i.split('@')[0]}\n`; return omited.push(i)}
                            añadidos.push(i)
                            texto += `➔ @${i.split('@')[0]}\n`
                        })
                        if(añadidos.length == 0) texto += '*No se realizara ninguna adicion al grupo*'
                        if(omited.length == 0) omitidos += '*No se omitira ningun participante*\n'
                        texto += '\n\n' + copyright
                        if(añadidos.length == 0 ) return sendReplyWithMentions(omitidos + '\n' + texto, mentionedTag)
                        return client.groupParticipantsUpdate(from, añadidos, 'add').then(()=>{sendReplyWithMentions(omitidos + '\n' + texto, mentionedTag)})
                    }
                }
                if (args.length == 0) return sendReplyWithMentions(toast.noadd(informacion), ['573228125090@s.whatsapp.net'])
                if (groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.onGroup(pushname))
                if (regExp == numeroBot) return sendReply(toast.addbot(pushname))
                if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.addadmin(pushname))
                const addtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido eliminado del grupo`
                inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add'); sendReplyWithMentions(addtext, [`${regExp}@s.whatsapp.net`])}})
                break
        case 'enlace': case 'link':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            await client.groupInviteCode(from).then((res) => {sendReply(toast.link(res))})
            break
        case 'anular': case 'revoke':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            client.groupRevokeInvite(from).then(()=>{sendReply(toast.revoke())})
            break
        case 'salir': case 'leave':
            if (!isOwner) return (toast.owners())
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            client.groupLeave(from).then(() => {client.sendMessage(sender, {text: toast.leave()}, {quoted: msg})})
            break
        case 'entrar': case 'join':
            if (!isOwner) return sendReply(toast.owners())
            if (args.length == 0) return sendReply(toast.nojoin(informacion))
            if (!isWaLink) return sendReply(toast.nowalink())
            await client.groupAcceptInvite(linkWA).then(() => {sendReply(toast.join())}).catch(() => {sendReply(toast.nowalink())})
            break
        case 'nombre': case 'name':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (args.length == 0) return sendReply(toast.name())
            if (q.length > 35 ) return sendReply(toast.longname())
            client.groupUpdateSubject(from, q).then(()=>{sendReply(toast.namechanged(groupName))})
            break
        case 'descripcion': case 'desc': case 'description':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (args.length == 0) return sendReply(toast.desc())
            if (q.length > 522 ) return sendReply(toast.longdesc())
            client.groupUpdateDescription(from, q).then(() => {sendReply(toast.descchanged(groupDesc))})
            break
        case 'icono': case 'icon':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (isQuotedImage){
                const profile = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(profile).then(async res => {await writeFile('./media/profile.jpg', res)})
                return client.updateProfilePicture(from,readFileSync('./media/profile.jpg')).then(()=>{sendReply(toast.profileg())})
            }; if(isImage){
                await downloadMediaMessage(msg).then(async res => {await writeFile('./media/profile.jpg', res)})
                return client.updateProfilePicture(from,readFileSync('./media/profile.jpg')).then(()=>{sendReply(toast.profileg())})
            }; sendReply(toast.noprofileg(informacion))
            break
        case 'creargrupo': case 'groupcreate':
            if (!isOwner) return sendReply(toast.owners())
            if (args.length == 0) return sendReply(toast.groupcreate(informacion))
            if(q.length > 35 ) return sendReply(toast.longname())
            await client.groupCreate(q, [sender]).then(res => { client.groupInviteCode(res.id).then((link) => {client.sendMessage(res.id, {text: toast.joinmessage()});sendReply(toast.gpcreate(link))})})
            break
    
    /*---------ACTIVADORES----------*/
        case 'ceroenlaces': case 'cerolink': case 'cerolinks':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const ceroenlacesCheck = isCeroenlaces ? toast.ceroenlaceson(pushname, saludo) : toast.ceroenlacesoff(pushname, saludo)
            if (args.length == 0) {
                if(isCeroenlaces){
                    const buttons = [{  buttonId:`${prefix}ceroenlaces off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(ceroenlacesCheck, buttons)}
                if(!isCeroenlaces){
                    const buttons = [{  buttonId:`${prefix}ceroenlaces on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(ceroenlacesCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}ceroenlaces off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isCeroenlaces) return sendButtonText(ceroenlacesCheck, buttons)
                ceroenlaces.push(from)
                writeFileSync('./JSONS/ceroenlaces.json', stringify(ceroenlaces))
                sendReply(toast.ceroenlaces1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}ceroenlaces on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isCeroenlaces) return sendButtonText(ceroenlacesCheck, buttons)
                let del = ceroenlaces.indexOf(from)
                ceroenlaces.splice(del, 1)
                writeFileSync('./JSONS/ceroenlaces.json', stringify(ceroenlaces))
                sendReply(toast.ceroenlaces0())}
        break
        case 'antienlaces': case 'antilink': case 'antilinks':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const antienlacesCheck = isAntienlaces ? toast.antienlaceson(pushname, saludo) : toast.antienlacesoff(pushname, saludo)
            if (args.length == 0) {
                if(isAntienlaces){
                    const buttons = [{  buttonId:`${prefix}antienlaces off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(antienlacesCheck, buttons)}
                if(!isAntienlaces){
                    const buttons = [{  buttonId:`${prefix}antienlaces on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(antienlacesCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}antienlaces off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isAntienlaces) return sendButtonText(antienlacesCheck, buttons)
                antienlaces.push(from)
                writeFileSync('./JSONS/antienlaces.json', stringify(antienlaces))
                sendReply(toast.antienlaces1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}antienlaces on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isAntienlaces) return sendButtonText(antienlacesCheck, buttons)
                let del = antienlaces.indexOf(from)
                antienlaces.splice(del, 1)
                writeFileSync('./JSONS/antienlaces.json', stringify(antienlaces))
                sendReply(toast.antienlaces0())}
        break
        case 'simi': case 'simsimi': case 'simisimi':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            const simiCheck = isSimi ? toast.simion(pushname, saludo) : toast.simioff(pushname, saludo)
            if (args.length == 0) {
                if(isSimi){
                    const buttons = [{  buttonId:`${prefix}simi off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(simiCheck, buttons)}
                if(!isSimi){
                    const buttons = [{  buttonId:`${prefix}simi on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(simiCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}simi off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isSimi) return sendButtonText(simiCheck, buttons)
                simi.push(from)
                writeFileSync('./JSONS/simi.json', stringify(simi))
                sendReply(toast.simi1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}simi on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isSimi) return sendButtonText(simiCheck, buttons)
                let del = simi.indexOf(from)
                simi.splice(del, 1)
                writeFileSync('./JSONS/simi.json', stringify(simi))
                sendReply(toast.simi0())}
            break
        case 'bienvenida': case 'welcome': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            const bienvenidaCheck = isBienvenida ? toast.bienvenidaon(pushname, saludo) : toast.bienvenidaoff(pushname, saludo)
            if (args.length == 0) {
                if(isBienvenida){
                    const buttons = [{  buttonId:`${prefix}bienvenida off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(bienvenidaCheck, buttons)}
                if(!isBienvenida){
                    const buttons = [{  buttonId:`${prefix}bienvenida on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(bienvenidaCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}bienvenida off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isBienvenida) return sendButtonText(bienvenidaCheck, buttons)
                bienvenida.push(from)
                writeFileSync('./JSONS/bienvenida.json', stringify(bienvenida))
                sendReply(toast.bienvenida1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}bienvenida on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isBienvenida) return sendButtonText(bienvenidaCheck, buttons)
                let del = bienvenida.indexOf(from)
                bienvenida.splice(del, 1)
                writeFileSync('./JSONS/bienvenida.json', stringify(bienvenida))
                sendReply(toast.bienvenida0())}
        break
        case 'despedida': case 'leave': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            const despedidaCheck = isDespedida ? toast.despedidaon(pushname, saludo) : toast.despedidaoff(pushname, saludo)
            if (args.length == 0) {
                if(isDespedida){
                    const buttons = [{  buttonId:`${prefix}despedida off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(despedidaCheck, buttons)}
                if(!isDespedida){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(despedidaCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}despedida off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isDespedida) return sendButtonText(despedidaCheck, buttons)
                despedida.push(from)
                writeFileSync('./JSONS/despedida.json', stringify(despedida))
                sendReply(toast.despedida1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}despedida on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isDespedida) return sendButtonText(despedidaCheck, buttons)
                let del = despedida.indexOf(from)
                despedida.splice(del, 1)
                writeFileSync('./JSONS/despedida.json', stringify(despedida))
                sendReply(toast.despedida0())}
        break
        case 'cortana': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const cortanaCheck = isCortana ? toast.cortanaon(pushname, saludo) : toast.cortanaoff(pushname, saludo)
            if (args.length == 0) {
                if(isCortana){
                    const buttons = [{  buttonId:`${prefix}cortana off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(cortanaCheck, buttons)}
                if(!isCortana){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(cortanaCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}cortana off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isCortana) return sendButtonText(cortanaCheck, buttons)
                cortana.push(from)
                writeFileSync('./JSONS/cortana.json', stringify(cortana))
                sendReply(toast.cortana1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}cortana on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isCortana) return sendButtonText(cortanaCheck, buttons)
                let del = cortana.indexOf(from)
                cortana.splice(del, 1)
                writeFileSync('./JSONS/cortana.json', stringify(cortana))
                sendReply(toast.cortana0())}
        break
        case 'nsfw': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const nsfwCheck = isNsfw ? toast.nsfwon(pushname, saludo) : toast.nsfwoff(pushname, saludo)
            if (args.length == 0) {
                if(isNsfw){
                    const buttons = [{  buttonId:`${prefix}nsfw off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(nsfwCheck, buttons)}
                if(!isNsfw){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(nsfwCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}nsfw off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isNsfw) return sendButtonText(nsfwCheck, buttons)
                nsfw.push(from)
                writeFileSync('./JSONS/nsfw.json', stringify(nsfw))
                sendReply(toast.nsfw1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}nsfw on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isNsfw) return sendButtonText(nsfwCheck, buttons)
                let del = nsfw.indexOf(from)
                nsfw.splice(del, 1)
                writeFileSync('./JSONS/nsfw.json', stringify(nsfw))
                sendReply(toast.nsfw0())}
        break
        case 'promovidos': case 'promoted':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const promovidosCheck = isPromovidos ? toast.promovidoson(pushname, saludo) : toast.promovidosoff(pushname, saludo)
            if (args.length == 0) {
                if(isPromovidos){
                    const buttons = [{  buttonId:`${prefix}promovidos off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(promovidosCheck, buttons)}
                if(!isPromovidos){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(promovidosCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}promovidos off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isPromovidos) return sendButtonText(promovidosCheck, buttons)
                promovidos.push(from)
                writeFileSync('./JSONS/promovidos.json', stringify(promovidos))
                sendReply(toast.promovidos1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}promovidos on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isPromovidos) return sendButtonText(promovidosCheck, buttons)
                let del = promovidos.indexOf(from)
                promovidos.splice(del, 1)
                writeFileSync('./JSONS/promovidos.json', stringify(promovidos))
                sendReply(toast.promovidos0())}
        break
        case 'degradados': case 'demoted': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const degradadosCheck = isDegradados ? toast.degradadoson(pushname, saludo) : toast.degradadosoff(pushname, saludo)
            if (args.length == 0) {
                if(isDegradados){
                    const buttons = [{  buttonId:`${prefix}degradados off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(degradadosCheck, buttons)}
                if(!isDegradados){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(degradadosCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}degradados off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isDegradados) return sendButtonText(degradadosCheck, buttons)
                degradados.push(from)
                writeFileSync('./JSONS/degradados.json', stringify(degradados))
                sendReply(toast.degradados1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}degradados on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isDegradados) return sendButtonText(degradadosCheck, buttons)
                let del = degradados.indexOf(from)
                degradados.splice(del, 1)
                writeFileSync('./JSONS/degradados.json', stringify(degradados))
                sendReply(toast.degradados0())}
        break
        case 'antiarabes':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const antiarabesCheck = isAntiarabes ? toast.antiarabeson(pushname, saludo) : toast.antiarabesoff(pushname, saludo)
            if (args.length == 0) {
                if(isAntiarabes){
                    const buttons = [{  buttonId:`${prefix}antiarabes off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(antiarabesCheck, buttons)}
                if(!isAntiarabes){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(antiarabesCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}antiarabes off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isAntiarabes) return sendButtonText(antiarabesCheck, buttons)
                antiarabes.push(from)
                writeFileSync('./JSONS/antiarabes.json', stringify(antiarabes))
                sendReply(toast.antiarabes1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}antiarabes on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isAntiarabes) return sendButtonText(antiarabesCheck, buttons)
                let del = antiarabes.indexOf(from)
                antiarabes.splice(del, 1)
                writeFileSync('./JSONS/antiarabes.json', stringify(antiarabes))
                sendReply(toast.antiarabes0())}
        break
        case 'antifakes':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const antifakesCheck = isAntifakes ? toast.antifakeson(pushname, saludo) : toast.antifakesoff(pushname, saludo)
            if (args.length == 0) {
                if(isAntifakes){
                    const buttons = [{  buttonId:`${prefix}antifakes off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(antifakesCheck, buttons)}
                if(!isAntifakes){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(antifakesCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}antifakes off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isAntifakes) return sendButtonText(antifakesCheck, buttons)
                antifakes.push(from)
                writeFileSync('./JSONS/antifakes.json', stringify(antifakes))
                sendReply(toast.antifakes1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}antifakes on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isAntifakes) return sendButtonText(antifakesCheck, buttons)
                let del = antifakes.indexOf(from)
                antifakes.splice(del, 1)
                writeFileSync('./JSONS/antifakes.json', stringify(antifakes))
                sendReply(toast.antifakes0())}
        break
        case 'autostickers': case 'autostikers': case 'autosticker': case 'autostiker': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const autostickersCheck = isAutostickers ? toast.autostickerson(pushname, saludo) : toast.autostickersoff(pushname, saludo)
            if (args.length == 0) {
                if(isAutostickers){
                    const buttons = [{  buttonId:`${prefix}autostickers off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(autostickersCheck, buttons)}
                if(!isAutostickers){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(autostickersCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}autostickers off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isAutostickers) return sendButtonText(autostickersCheck, buttons)
                autostickers.push(from)
                writeFileSync('./JSONS/autostickers.json', stringify(autostickers))
                sendReply(toast.autostickers1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}autostickers on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isAutostickers) return sendButtonText(autostickersCheck, buttons)
                let del = autostickers.indexOf(from)
                autostickers.splice(del, 1)
                writeFileSync('./JSONS/autostickers.json', stringify(autostickers))
                sendReply(toast.autostickers0())}
        break
        case 'leveling': case 'niveles': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const levelingCheck = isLeveling ? toast.levelingon(pushname, saludo) : toast.levelingoff(pushname, saludo)
            if (args.length == 0) {
                if(isLeveling){
                    const buttons = [{  buttonId:`${prefix}leveling off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(levelingCheck, buttons)}
                if(!isLeveling){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(levelingCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}leveling off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isLeveling) return sendButtonText(levelingCheck, buttons)
                leveling.push(from)
                writeFileSync('./JSONS/leveling.json', stringify(leveling))
                sendReply(toast.leveling1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}leveling on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isLeveling) return sendButtonText(levelingCheck, buttons)
                let del = leveling.indexOf(from)
                leveling.splice(del, 1)
                writeFileSync('./JSONS/leveling.json', stringify(leveling))
                sendReply(toast.leveling0())}
        break
        case 'porno': case 'xxx': 
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const pornoCheck = isPorno ? toast.pornoon(pushname, saludo) : toast.pornooff(pushname, saludo)
            if (args.length == 0) {
                if(isPorno){
                    const buttons = [{  buttonId:`${prefix}porno off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(pornoCheck, buttons)}
                if(!isPorno){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(pornoCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}porno off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isPorno) return sendButtonText(pornoCheck, buttons)
                porno.push(from)
                writeFileSync('./JSONS/porno.json', stringify(porno))
                sendReply(toast.porno1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}porno on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isPorno) return sendButtonText(pornoCheck, buttons)
                let del = porno.indexOf(from)
                porno.splice(del, 1)
                writeFileSync('./JSONS/porno.json', stringify(porno))
                sendReply(toast.porno0())}
        break
        case 'antivuv': case 'antivo':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            const antivuvCheck = isAntivuv ? toast.antivuvon(pushname, saludo) : toast.antivuvoff(pushname, saludo)
            if (args.length == 0) {
                if(isAntivuv){
                    const buttons = [{  buttonId:`${prefix}antivuv off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                    sendButtonText(antivuvCheck, buttons)}
                if(!isAntivuv){
                    const buttons = [{  buttonId:`${prefix}despe on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                    sendButtonText(antivuvCheck, buttons)}}
            if (args[0] == 'on' || args[0] == '1') {
                const buttons = [{  buttonId:`${prefix}antivuv off`, buttonText:{ displayText:'·❌ DESACTIVAR·' }, type:1  }]
                if(isAntivuv) return sendButtonText(antivuvCheck, buttons)
                antivuv.push(from)
                writeFileSync('./JSONS/antivuv.json', stringify(antivuv))
                sendReply(toast.antivuv1())}
            if (args[0] == 'off' || args[0] == '0') {
                const buttons = [{  buttonId:`${prefix}antivuv on`, buttonText:{ displayText:'·✅ ACTIVAR·' }, type:1  }]
                if(!isAntivuv) return sendButtonText(antivuvCheck, buttons)
                let del = antivuv.indexOf(from)
                antivuv.splice(del, 1)
                writeFileSync('./JSONS/antivuv.json', stringify(antivuv))
                sendReply(toast.antivuv0())}
        break
        case 'ajustes':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            const gData = await client.groupMetadata(from)
            const admins = getAdmins(gData.participants)
            const creacion = moment(gData.creation * 1000).tz('America/Bogota').format('dddd, DD MMM YYYY')
            const horaCreacion = moment(gData.creation * 1000).tz('America/Bogota').format('h:mm:ss a') 
            const botadmin = isBotAdmin ? '·Si·' : '·No·'
            const Antifakes = isAntifakes ? '·Si·' : '·No·'
            const Antiarabes = isAntiarabes ? '·Si·' : '·No·'
            const Antivuv = isAntivuv ? '·Si·' : '·No·'
            const Nsfw = isNsfw ? '·Si·' : '·No·'
            const Porno = isPorno ? '·Si·' : '·No·'
            const Simi = isSimi ? '·Si·' : '·No·'
            const Cortana = isCortana ? '·Si·' : '·No·'
            const Autostickers = isAutostickers ? '·Si·' : '·No·'
            const Leveling = isLeveling ? '·Si·' : '·No·'
            const Bienvenida = isBienvenida ? '·Si·' : '·No·'
            const Despedida = isDespedida ? '·Si·' : '·No·'
            const Promovidos = isPromovidos ? '·Si·' : '·No·'
            const Degradados = isDegradados ? '·Si·' : '·No·'
            const Antienlaces = isAntienlaces ? '·Si·' : '·No·'
            const Ceroenlaces = isCeroenlaces ? '·Si·' : '·No·'
            const Onlyowners = isOnlyowner ? '·Si·' : '·No·'
            const Onlypremium = isOnlypremium ? '·Si·' : '·No·'
            const Onlyadmins = isOnlyadmins ? '·Si·' : '·No·'
            const Onlyvip = isOnlyvip ? '·Si·' : '·No·'
            const datas = {admins, gData, creacion, horaCreacion, botadmin, Antifakes, Antiarabes, Antivuv, Nsfw, Porno, Simi, Cortana, Autostickers, Leveling, Bienvenida, Despedida, Promovidos, Degradados, Antienlaces, Ceroenlaces,  Onlyowners, Onlypremium, Onlyadmins, Onlyvip}
            sendReplyWithMentions(toast.ajustes(datas), [gData.owner])
            break
    /*--------COMANDOS TEST-------- */
        case 'sacame':
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (args[0] == 'si') { sendReply(toast.sacamesi(pushname, tipoDeUsr));await client.groupParticipantsUpdate(from,[sender], 'remove').then(()=>{sendReply('[Eliminacion Finalizada]')})}
            if (args[0] == 'no') return sendReply(toast.sacameno())
            const texto = toast.sacame(pushname, tipoDeUsr)
            const buttons = [{buttonId: `${prefix}sacame si`, buttonText: {displayText: 'SI⚠️'}, type: 1}, {buttonId: `${prefix}sacame no`, buttonText: {displayText: 'NO✅'}, type: 1}]
            sendButtonText(texto, buttons)
            break
        case 'repite':
            if (args.length == 0) return sendReply('*⋆⊱∘[✧repite✧]∘⊰⋆*\n_Si deseas que yo repita algo envia un mensaje con el siguiente formato: *${prefix}repite + mensaje que quieres que repita*_\n\n_Ejemplo: *${prefix}repite Hola usuario como estas?*_\n*⋆⊱∘[✧cortana✧]∘⊰⋆*')
            sendReply(q)
            break
        case 'traducir': //TRADUCIR MENSAJES ENVIADOS O ELIMINADOS
            try {
                const alerta = `*⋆⊱∘[✧traductor✧]∘⊰⋆*\n_Si deseas traducir un mensaje enviado responde al mensaje con el comando: *${prefix}traducir + código de idioma*_\n⋆⊱∘[✧cortana✧]∘⊰⋆*`
                const alerta2 = `*⋆⊱∘[✧traductor✧]∘⊰⋆*\n_Si deseas traducir un texto o un mensaje escribe o etiqueta el mensaje con el comando: *${prefix}traducir + código de idioma*_ ó \n*${prefix}traducir + codigo de idioma + texto*\n\n_Ejemplo: *${prefix}traducir es Hi, I Love You*_\n⋆⊱∘[✧cortana✧]∘⊰⋆*`
                const error1 = `*⋆⊱∘[✧traductor✧]∘⊰⋆*\n¡Error! por favor envia un codigo de idioma compatible seguido del texto a traducir\n\n${prefix}idiomas para ver la lista de idiomas compatibles con la funcion traductor.\n\n_Si deseas traducir un texto o un mensaje escribe o etiqueta el mensaje con el comando: *${prefix}traducir + código de idioma*_ ó \n*${prefix}traducir + codigo de idioma + texto*\n\n_Ejemplo: *${prefix}traducir es Hi, I Love You*_\n⋆⊱∘[✧cortana✧]∘⊰⋆*`
                const error2 = `*⋆⊱∘[✧traductor✧]∘⊰⋆*\n¡Error! por favor envia un codigo de idioma compatible\n\n${prefix}idiomas para ver la lista de idiomas compatibles con la funcion traductor.\n\n_Si deseas traducir un mensaje enviado responde al mensaje con el comando: *${prefix}traducir + código de idioma*_\n⋆⊱∘[✧cortana✧]∘⊰⋆*`
                if (isQuotedText){
                    var mensaje = msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation
                    if (args.length < 1 ) return sendReply(alerta)
                    if (args.length == 1) {
                        await translate(mensaje, args[0])
                        .then(async (res) => { sendReply(res) })
                        .catch(() => { return sendReply(error2) })
                    } else {
                        await translate(cmd.slice(12), args[0])
                        .then(async (res) => { sendReply(res) })
                        .catch(() => { return sendReply(error1) })
                    }
                } else if (isText){
                    if (args.length == 0) return await sendReply(alerta2)
                    if (args.length == 1) return await sendReply(error1)
                    const texto = cmd.slice(12)
                    await translate(texto, args[0])
                    .then(async (res) =>{ sendReply(res) })
                    .catch(() => { return sendReply(error1)})
                } else { sendReply(alerta2) }
            } catch (e) {
                error(e)
            }
            break
        case 'borrar': //ELIMINAR MENSAJES ENVIADOS POR EL BOT
            if (!isGroup) return sendReply(toast.groups())
            if (!isBotAdmin) return sendReply(toast.adminbot())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
                if (!isQuoted) return sendReply('_*Borrador de Mensajes*_\n\n_Si deseas eliminar mensajes enviados por mi, por favor etiqueta mi mensaje con el comando *!borrar*_')
                const identificacion = msg.message.extendedTextMessage.contextInfo.participant
                const stanza = msg.message.extendedTextMessage.contextInfo.stanzaId
                if (identificacion != numeroBotId){
                    const key = {remoteJid:from, fromMe: false, id:stanza, participant: identificacion}
                    client.sendMessage(from, { delete: key }).then(() => {sendReaction('👍', from)})
                } else {
                    const key = {remoteJid:from, fromMe: true, id:stanza}
                    client.sendMessage(from, { delete: key }).then(() => {sendReaction('👍', from)})
                }
                break
        case 'chat':// MUTEAR, DESMUTEAR, ARCHIVAR, DESARCHIVAR, LEER, MARCAR COMO NO LEIDO
            if(!isOwner) return sendReply(toast.owners())
            if (args.length == 0) return sendReply('funciones disponibles para administracion del chat:\n\n1. !chat mute\n2. !chat unmute \n3. !chat archive\n4. chat unarchive\n5. !chat read\n6.0')
            if (q2 == 'archive') return await client.chatModify({archive: true, lastMessages:[msg]}, from)
            if (q2 == 'unarchive') return await client.chatModify({archive: false, lastMessages:[msg]}, from)
            if (q2 == 'mute') return client.chatModify({ mute: new Date(new Date().getTime()+ 8*60*60*1000).getTime() },from, [])
            if (q2 == 'unmute') return await client.chatModify({ mute: null },from, [])
            if (q2 == 'read') return await client.chatModify({markRead: true, lastMessages: [msg]}, from)
            if (q2 == 'unread') return await client.chatModify({markRead: false, lastMessages: [msg]}, from)
            if (q2 == 'pin') return await client.chatModify({ pin: true },from, [])
            if (q2 == 'unpin') return await client.chatModify({ pin: false },from, [])
            if (q2 == 'delete') return await client.chatModify({delete: true, lastMessages:[msg]}, from)
            //if (args[0] == 'nombre') return await client.chatModify({pushNameSetting: q},from, [])
            //if (q2 == 'clear') return await client.chatModify({clear:true}, from)
            sendReply('funciones disponibles para administracion del chat:\n\n1. !chat mute\n2. !chat unmute \n3. !chat archive\n4. chat unarchive\n5. !chat read\n6.0')
            break
        case 'temporales': //MENSAJES TEMPORALES 24 HORAS - 7 DIAS - 90 DIAS
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            if (args.length == 0) return
            if (q2 == 'on') client.sendMessage(from,{disappearingMessagesInChat:  WA_DEFAULT_EPHEMERAL})
            if (q2 == 'off') client.sendMessage(from,{disappearingMessagesInChat:  null})
            if (q2 == '1') client.sendMessage(from,{disappearingMessagesInChat:  24 * 60 * 60})
            if (q2 == '7') client.sendMessage(from,{disappearingMessagesInChat:  7 * 24 * 60 * 60})
            if (q2 == '90') client.sendMessage(from,{disappearingMessagesInChat:  90 * 24 * 60 * 60})
            break
        case 'check': //VERIFICAR SI UN NUMERO EXISTE EN WHATSAPP
            if (args.length == 0 ) return sendReply('por vavor ingresa el numero de telefono despues del comando')
            inWA(msg,client,q).then((res) => {if (res == true){
                const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                return sendReply(`¡Busqueda finalizada!\nEl numero ${regExp} si existe en whatsapp.\n\nclick en el siguiente enlace para ir a su chat directamente: https://wa.me/${regExp}`)
            }})
            break
        case 'info': //EXTRAER FOTO DE PERFIL Y ESTADO DE UNA PERSONA
            if (args.length == 0 ) return sendReply('Si deseas obtener informacion de una cuenta de whatsapp como su foto de perfil y estado por favor envia un mensaje con el comando *!info + numero de whatsapp con codigo de pais*\n\nEjemplo: !info 573228125090')
            inWA(msg,client,q).then(async (res) => { if (res == true){
                const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                const isB = await client.getBusinessProfile(`${regExp}@s.whatsapp.net`)
                if (isB != undefined) {
                    const { address, description, website, email, category, business_hours} = isB
                    log(business_hours)
                    try { var status = await client.fetchStatus(`${regExp}@s.whatsapp.net`)  } catch (e){ var status = {status: '', setAt: ''} }
                    try { var profile = await client.profilePictureUrl(`${regExp}@s.whatsapp.net`, 'image') } catch (e){ var profile = './media/test.jpg' }
                    var time = moment(status.setAt).tz('America/Bogota').format('DD/MM/YY h:mm a')
                    if (time == 'Fecha inválida') var time = ''
                    const texto = `*🪀[ CUENTA DE EMPRESA DETECTADA ]🪀*\n\n*INFORMACION DE: _${q}_*\n\n❯ Direccion: ${address}\n❯ Descripcion: ${description}\n❯ Sitios Web: ${website}\n❯ Email: ${email}\n❯ Categoria: ${category}\n❯ Estado: ${status.status}.\n❯ Cambiado el: ${time}`
                    sendImageReply(profile, texto.replace(/undefined/g, 'No Disponible'))
                    return
                } 
                try { var status = await client.fetchStatus(`${regExp}@s.whatsapp.net`)  } catch (e){ var status = {status: '', setAt: ''} }
                try { var profile = await client.profilePictureUrl(`${regExp}@s.whatsapp.net`, 'image') } catch (e){ var profile = './media/test.jpg' }
                var time = moment(status.setAt).tz('America/Bogota').format('DD/MM/YY h:mm a')
                if (time == 'Fecha inválida') var time = ''
                const texto = `[*🪀CUENTA NORMAL DETECTADA🪀*]\n\n*INFORMACION DE: _${q}_*\n\n_*[Estado]:* ${status.status}._\n_*[Fecha]:* ${time}._`
                sendImageReply(profile, texto)
            }})
            break
        case 'change':
            if(!isOwner) return sendReply(toast.owners())
            if (args.length == 0) return sendReply('Si deseas realizar cambios en mi perfil o estado envia un mensaje con los siguientes comandos.\n\n1. !change profile + imagen (para cambiar mi foto de perfil)\n2. !change status + texto (para cambiar mi informacion de estado)\n3. !change name + nombre (para cambiar mi nombre)')
            if (args[0].startsWith('status')) {
                if (args.length == 1) return sendReply('mensaje vacio, por favor escribe un estado')
                if (q.slice(7).length > 256) return sendReply('Lo siento, el texto ingresado supera los 256 caracteres permitidos por la aplicacion, por favor intenta de nuevo con un estado mas corto.')
                client.updateProfileStatus(q.slice(7)).then(()=>{sendReply('¡GENIAL! He cambiado mi estado correctamente.')})
            }
            if (args[0].startsWith('name')){
                log(AnyWASocket)
                if (args.length == 1) return sendReply('mensaje vacio, por favor escribe un nombre')
                if (q.slice(7).length > 15) return sendReply('a')
                client.updateProfileName(q.slice(7))
                sendReply('[INFORMACIÒN]\n\n_Lamentamos informarle que la funcion de cambio de nombre no esta disponible por el momento, estaremos trabajando para brindarte una solucion lo mas pronto posible._')
            }
            if (args[0].startsWith('profile')){
                //if (!isImage || !isQuotedImage) return sendReply('¡ERROR! por favor envia o etiqueta una imagen con el comando !change profile')
                if (isImage){
                    const buffer = await downloadMediaMessage(msg, 'buffer', {})
                    await writeFile('./media/profile.jpg', buffer)
                    await client.updateProfilePicture(numeroBotId, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
                    //fs.unlinkSync('./media/profile.jpg')
                }
                if (isQuotedImage){
                    const profile = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage
                    stream = await downloadContentFromMessage(profile, "image");
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) {
                      buffer = Buffer.concat([buffer, chunk]);
                    }
                    await writeFile('./media/profile.jpg', buffer)
                    await client.updateProfilePicture(numeroBotId, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
                    fs.unlinkSync('./media/profile.jpg')
                }
            }
            break        
        case 'ephemeral':
            client.sendMessage(from, {text: q}, {ephemeralExpiration : WA_DEFAULT_EPHEMERAL})
            break
        case 'block':
            if(!isOwner) return sendReply(toast.owners())
            if (!isGroup) return client.updateBlockStatus(from, 'block')
            if (isGroup){
                if (isQuoted) {
                    const jid  = msg.message.extendedTextMessage.contextInfo.participant
                    if (jid == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'block')
                } else {
                    if (args.length == 0 ) return sendReply('')
                    inWA(msg,client,q).then(async (res) => {if (res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if (numero == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(numero, 'block')
                }
            }
            break
        case 'unblock':
            if(!isOwner) return sendReply(toast.owners())
            if (!isGroup) return client.updateBlockStatus(from, 'block')
            if (isGroup){
                if (isQuoted) {
                    const jid  = msg.message.extendedTextMessage.contextInfo.participant
                    if (jid == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'unblock')
                } else {
                    if (args.length == 0 ) return sendReply('por vavor ingresa el numero de telefono despues del comando')
                    inWA(msg,client,q).then(async (res) => {if (res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if (numero == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(numero, 'unblock')
                }
            }
            break
        case 'infolink':case'infogrupo':
            //if (!isGroup) return sendReply('esta opcion solo esta disponible dentro de grupos')
            groupSettings(msg, client, q, args, command)
            break
        case 'gpperfil':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            groupSettings(msg, client, q, args, command)
            break
        case 'acceppt':if (!isGroup) return sendReply(toast.groups())
            if (!isOwner) return sendReply(toast.owners())
            const inviteMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage.groupInviteMessage
            await client.groupAcceptInviteV4(from, inviteMessage)        
            break
        case 'admins':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            sendReplyWithMentions(q, groupAdmins)
        break
        case 'todos':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            sendReplyWithMentions(q, groupParticipants)
            break
    
    /*---------MINTAKE - TEXTPRO----------*/
        case 'textpro':
            if (args.length == 0) return sendReply(menu.textpro1(informacion))
            if (args[0] == 1) return mintake.textpro('https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Gradient Neon Light', args[0]))}).catch((err) => error(err))
            if (args[0] == 2) return mintake.textpro('https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('BlackPink', args[0]))}).catch((err) => error(err))
            if (args[0] == 3) return mintake.textpro('https://textpro.me/create-a-summer-neon-light-text-effect-online-1076.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Summer Neon', args[0]))}).catch((err) => error(err))
            if (args[0] == 4) return mintake.textpro('https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Light Glow Sliced', args[0]))}).catch((err) => error(err))
            if (args[0] == 5) return mintake.textpro('https://textpro.me/neon-light-glitch-text-generator-online-1063.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Neon Light Glitch', args[0]))}).catch((err) => error(err))
            if (args[0] == 6) return mintake.textpro('https://textpro.me/create-neon-light-on-brick-wall-online-1062.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Neon Light On Brick', args[0]))}).catch((err) => error(err))
            if (args[0] == 7) return mintake.textpro('https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Glowing Neon Light', args[0]))}).catch((err) => error(err))
            if (args[0] == 8) return mintake.textpro('https://textpro.me/online-thunder-text-effect-generator-1031.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Thunder', args[0]))}).catch((err) => error(err))
            if (args[0] == 9) return mintake.textpro('https://textpro.me/create-3d-neon-light-text-effect-online-1028.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('3D Neon Light', args[0]))}).catch((err) => error(err))
            if (args[0] == 10) return mintake.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glitch Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 11) return mintake.textpro('https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Devil Wings', args[0]))}).catch((err) => error(err))
            if (args[0] == 12) return mintake.textpro('https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Futuristic Tecnology', args[0]))}).catch((err) => error(err))
            if (args[0] == 13) return mintake.textpro('https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Galaxy', args[0]))}).catch((err) => error(err))
            if (args[0] == 14) return mintake.textpro('https://textpro.me/holographic-3d-text-effect-975.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Holographic 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 15) return mintake.textpro('https://textpro.me/neon-text-effect-online-963.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 16) return mintake.textpro('https://textpro.me/happ-new-year-card-firework-gif-959.html', [q.slice(3)]).then(res => {sendGifReply(readFileSync(res), toast.mintake('New Year Card', args[0]))}).catch((err) => error(err))
            if (args[0] == 17) return mintake.textpro('https://textpro.me/firework-sparkle-text-effect-930.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Firework Sparkle', args[0]))}).catch((err) => error(err))
            if (args[0] == 18) return mintake.textpro('https://textpro.me/rainbow-equalizer-text-effect-902.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Equializer', args[0]))}).catch((err) => error(err))
            if (args[0] == 19) return mintake.textpro('https://textpro.me/matrix-style-text-effect-online-884.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Matrix', args[0]))}).catch((err) => error(err))
            if (args[0] == 20) return mintake.textpro('https://textpro.me/neon-light-text-effect-online-882.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Wall', args[0]))}).catch((err) => error(err))
            if (args[0] == 21) return mintake.textpro('https://textpro.me/create-thunder-text-effect-online-881.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Lightning', args[0]))}).catch((err) => error(err))
            if (args[0] == 22) return mintake.textpro('https://textpro.me/neon-text-effect-online-879.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Simple', args[0]))}).catch((err) => error(err))
            if (args[0] == 23) return mintake.textpro('https://textpro.me/bokeh-text-effect-876.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bokeh', args[0]))}).catch((err) => error(err))
            if (args[0] == 24) return mintake.textpro('https://textpro.me/green-neon-text-effect-874.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Green Neon', args[0]))}).catch((err) => error(err))
            if (args[0] == 25) return mintake.textpro('https://textpro.me/free-advanced-glow-text-effect-873.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Butterfly Neon', args[0]))}).catch((err) => error(err))
            if (args[0] == 26) return mintake.textpro('https://textpro.me/create-decorative-gold-glitter-3d-text-effect-online-1089.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Gold Glitter', args[0]))}).catch((err) => error(err))
            if (args[0] == 27) return mintake.textpro('https://textpro.me/create-a-rusted-metal-text-effect-online-1087.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Rushed Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 28) return mintake.textpro('https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Golden Valentine', args[0]))}).catch((err) => error(err))
            if (args[0] == 29) return mintake.textpro('https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Golden', args[0]))}).catch((err) => error(err))
            if (args[0] == 30) return mintake.textpro('https://textpro.me/create-a-3d-luxury-metallic-text-effect-for-free-1071.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Luxury Metallic', args[0]))}).catch((err) => error(err))
            if (args[0] == 31) return mintake.textpro('https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('White Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 32) return mintake.textpro('https://textpro.me/create-text-effects-arcane-tv-series-online-1067.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Arcane', args[0]))}).catch((err) => error(err))
            if (args[0] == 33) return mintake.textpro('https://textpro.me/3d-golden-ancient-text-effect-online-free-1060.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Ancient', args[0]))}).catch((err) => error(err))
            if (args[0] == 34) return mintake.textpro('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Deep Sea', args[0]))}).catch((err) => error(err))
            if (args[0] == 35) return mintake.textpro('https://textpro.me/create-a-metallic-text-effect-free-online-1041.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Black Metalic', args[0]))}).catch((err) => error(err))
            //if (args[0] == 36) return mintake.textpro('https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glossy Metalic', args[0]))}).catch((err) => error(err))
            if (args[0] == 36) return sendReply(toast.noeffect())
            if (args[0] == 37) return mintake.textpro('https://textpro.me/create-a-transformer-text-effect-online-1035.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Transformers', args[0]))}).catch((err) => error(err))
            //if (args[0] == 38) return mintake.textpro('https://textpro.me/create-harry-potter-text-effect-online-1025.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Harry Potter', args[0]))}).catch((err) => error(err))
            if (args[0] == 38) return sendReply(toast.noeffect())
            if (args[0] == 39) return mintake.textpro('https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Glossy Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 40) return mintake.textpro('https://textpro.me/metal-dark-gold-text-effect-984.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Dark Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 41) return mintake.textpro('https://textpro.me/metal-purple-dual-effect-973.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Purple Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 42) return mintake.textpro('https://textpro.me/deluxe-silver-text-effect-970.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Deluxe Silver', args[0]))}).catch((err) => error(err))
            //if (args[0] == 43) return mintake.textpro('https://textpro.me/color-full-luxury-metal-text-effect-969.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Metal Luxury', args[0]))}).catch((err) => error(err))
            if (args[0] == 43) return sendReply(toast.noeffect())
            if (args[0] == 44) return mintake.textpro('https://textpro.me/glossy-blue-metal-text-effect-967.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glossy Blue Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 45) return mintake.textpro('https://textpro.me/deluxe-gold-text-effect-966.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Deluxe Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 46) return mintake.textpro('https://textpro.me/metal-dark-gold-text-effect-online-939.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Dark Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 47) return mintake.textpro('https://textpro.me/steel-text-effect-online-921.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Steel', args[0]))}).catch((err) => error(err))
            if (args[0] == 48) return mintake.textpro('https://textpro.me/rusty-metal-text-effect-860.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Rusty Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 49) return mintake.textpro('https://textpro.me/metal-rainbow-text-effect-854.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Metal Rainbow', args[0]))}).catch((err) => error(err))
            if (args[0] == 50) return mintake.textpro('https://textpro.me/shiny-metal-text-effect-852.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Shiny Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 51) return mintake.textpro('https://textpro.me/hot-metal-text-effect-843.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Hot Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 52) return mintake.textpro('https://textpro.me/eroded-metal-text-effect-834.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Eroded Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 53) return mintake.textpro('https://textpro.me/blue-metal-text-effect-831.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 54) return mintake.textpro('https://textpro.me/black-metal-text-effect-829.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Black Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 55) return mintake.textpro('https://textpro.me/3d-glowing-metal-text-effect-828.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Glowing Metal', args[0]))}).catch((err) => error(err))
            if (args[0] == 56) return mintake.textpro('https://textpro.me/3d-chrome-text-effect-827.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Chrome', args[0]))}).catch((err) => error(err))
            if (args[0] == 57) return mintake.textpro('https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Orange Juice', args[0]))}).catch((err) => error(err))
            if (args[0] == 58) return mintake.textpro('https://textpro.me/create-berry-text-effect-online-free-1033.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Berry', args[0]))}).catch((err) => error(err))
            if (args[0] == 59) return mintake.textpro('https://textpro.me/chocolate-cake-text-effect-890.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Chocolate', args[0]))}).catch((err) => error(err))
            if (args[0] == 60) return mintake.textpro('https://textpro.me/strawberry-text-effect-online-889.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Strawberry', args[0]))}).catch((err) => error(err))
            if (args[0] == 61) return mintake.textpro('https://textpro.me/bread-text-effect-online-887.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bread', args[0]))}).catch((err) => error(err))
            if (args[0] == 62) return mintake.textpro('https://textpro.me/honey-text-effect-868.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Honey', args[0]))}).catch((err) => error(err))
            if (args[0] == 63) return mintake.textpro('https://textpro.me/biscuit-text-effect-858.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Biscuit', args[0]))}).catch((err) => error(err))
            if (args[0] == 64) return mintake.textpro('https://textpro.me/bagel-text-effect-857.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bagel', args[0]))}).catch((err) => error(err))
            if (args[0] == 65) return mintake.textpro('https://textpro.me/pink-candy-text-effect-832.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Candy', args[0]))}).catch((err) => error(err))
            if (args[0] == 66) return mintake.textpro('https://textpro.me/create-a-quick-sparkling-diamonds-text-effect-1077.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Diamond', args[0]))}).catch((err) => error(err))
            if (args[0] == 67) return mintake.textpro('https://textpro.me/3d-luxury-gold-text-effect-online-1003.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Luxury Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 68) return mintake.textpro('https://textpro.me/peridot-stone-text-effect-916.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Peridot Stone', args[0]))}).catch((err) => error(err))
            if (args[0] == 69) return mintake.textpro('https://textpro.me/pink-sparkling-jewelry-text-effect-899.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Pink Sparkling Jewerly', args[0]))}).catch((err) => error(err))
            if (args[0] == 70) return mintake.textpro('https://textpro.me/marble-text-effect-863.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Marble', args[0]))}).catch((err) => error(err))
            if (args[0] == 71) return mintake.textpro('https://textpro.me/abstra-gold-text-effect-859.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Abstra Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 72) return mintake.textpro('https://textpro.me/purple-gem-text-effect-853.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Purple Gem', args[0]))}).catch((err) => error(err))
            if (args[0] == 73) return mintake.textpro('https://textpro.me/red-jewelry-text-effect-849.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Red Jewerly', args[0]))}).catch((err) => error(err))
            if (args[0] == 74) return mintake.textpro('https://textpro.me/blue-glitter-text-effect-841.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Glitter', args[0]))}).catch((err) => error(err))
            if (args[0] == 75) return mintake.textpro('https://textpro.me/blue-gem-text-effect-830.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Gem', args[0]))}).catch((err) => error(err))
            if (args[0] == 76) return mintake.textpro('https://textpro.me/hexa-golden-text-effect-842.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Hexa Golden', args[0]))}).catch((err) => error(err))
            if (args[0] == 77) return mintake.textpro('https://textpro.me/create-a-3d-stone-text-effect-online-for-free-1073.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Stone', args[0]))}).catch((err) => error(err))
            //if (args[0] == 78) return mintake.textpro('https://textpro.me/free-online-country-flag-3d-text-effect-generator-1052.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Country Flag 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 78) return sendReply(toast.noeffect())
            if (args[0] == 79) return mintake.textpro('https://textpro.me/create-american-flag-3d-text-effect-online-1051.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('American Flag 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 80) return mintake.textpro('https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Rainbow Calligraphy', args[0]))}).catch((err) => error(err))
            if (args[0] == 81) return mintake.textpro('https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Water Pipe', args[0]))}).catch((err) => error(err))
            if (args[0] == 82) return mintake.textpro('https://textpro.me/create-space-text-effects-online-free-1042.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Space 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 83) return mintake.textpro('https://textpro.me/online-3d-gradient-text-effect-generator-1020.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Gradient', args[0]))}).catch((err) => error(err))
            //if (args[0] == 84) return mintake.textpro('https://textpro.me/create-3d-realistic-text-effect-on-the-beach-online-1018.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Beach', args[0]))}).catch((err) => error(err))
            if (args[0] == 84) return sendReply(toast.noeffect())
            if (args[0] == 85) return mintake.textpro('https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Paper Cut Multicolor', args[0]))}).catch((err) => error(err))
            if (args[0] == 86) return mintake.textpro('https://textpro.me/3d-underwater-text-effect-generator-online-1013.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Underwater', args[0]))}).catch((err) => error(err))
            if (args[0] == 87) return mintake.textpro('https://textpro.me/3d-gradient-text-effect-online-free-1002.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Gradient', args[0]))}).catch((err) => error(err))
            if (args[0] == 88) return mintake.textpro('https://textpro.me/minion-text-effect-3d-online-978.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Minion 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 89) return mintake.textpro('https://textpro.me/new-year-cards-3d-by-name-960.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('New Year Card', args[0]))}).catch((err) => error(err))
            //if (args[0] == 90) return mintake.textpro('https://textpro.me/create-avatar-gold-online-956.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Avatar Gold', args[0]))}).catch((err) => error(err))
            if (args[0] == 90) return sendReply(toast.noeffect())
            if (args[0] == 91) return mintake.textpro('https://textpro.me/3d-box-text-effect-online-880.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Box', args[0]))}).catch((err) => error(err))
            if (args[0] == 92) return mintake.textpro('https://textpro.me/color-led-display-screen-text-effect-1059.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Color Led', args[0]))}).catch((err) => error(err))
            if (args[0] == 93) return mintake.textpro('https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Sci-Fi', args[0]))}).catch((err) => error(err))
            if (args[0] == 94) return mintake.textpro('https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Circuit', args[0]))}).catch((err) => error(err))
            if (args[0] == 95) return mintake.textpro('https://textpro.me/create-science-fiction-text-effect-online-free-1038.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Science Fiction', args[0]))}).catch((err) => error(err))
            if (args[0] == 96) return mintake.textpro('https://textpro.me/robot-r2-d2-text-effect-903.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Star Wars', args[0]))}).catch((err) => error(err))
            if (args[0] == 97) return mintake.textpro('https://textpro.me/sci-fi-text-effect-855.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Sci-Fi', args[0]))}).catch((err) => error(err))
            if (args[0] == 98) return mintake.textpro('https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Wonderful Graffiti', args[0]))}).catch((err) => error(err))
            if (args[0] == 99) return mintake.textpro('https://textpro.me/happy-new-year-2022-greeting-3d-card-1058.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('New Year Greeting', args[0]))}).catch((err) => error(err))
            if (args[0] == 100) return mintake.textpro('https://textpro.me/christmas-tree-text-effect-online-free-1057.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmass Tree', args[0]))}).catch((err) => error(err))
            if (args[0] == 101) return mintake.textpro('https://textpro.me/create-christmas-candy-cane-text-effect-1056.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmas Candy', args[0]))}).catch((err) => error(err))
            if (args[0] == 102) return mintake.textpro('https://textpro.me/3d-christmas-text-effect-by-name-1055.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Christmas', args[0]))}).catch((err) => error(err))
            if (args[0] == 103) return mintake.textpro('https://textpro.me/sparkles-merry-christmas-text-effect-1054.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sparkles Christmas', args[0]))}).catch((err) => error(err))
            if (args[0] == 104) return mintake.textpro('https://textpro.me/xmas-cards-3d-online-942.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Xmas Cards 3D', args[0]))}).catch((err) => error(err))
            if (args[0] == 105) return mintake.textpro('https://textpro.me/chrismast-gift-text-effect-869.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Chistmas Gift', args[0]))}).catch((err) => error(err))

            if (args[0] == 106) return mintake.textpro('https://textpro.me/create-3d-pottery-text-effect-online-1088.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Pottery', args[0]))}).catch((err) => error(err))
            if (args[0] == 107) return mintake.textpro('https://textpro.me/create-artistic-typography-online-1086.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Artistic Typography', args[0]))}).catch((err) => error(err))
            if (args[0] == 108) return mintake.textpro('https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Summer Beach', args[0]))}).catch((err) => error(err))
            if (args[0] == 109) return mintake.textpro('https://textpro.me/create-a-blackpink-logo-decorated-with-roses-online-free-1080.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Pink', args[0]))}).catch((err) => error(err))
            if (args[0] == 110) return mintake.textpro('https://textpro.me/create-blackpink-style-logo-effects-online-1079.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Pink', args[0]))}).catch((err) => error(err))
            if (args[0] == 111) return mintake.textpro('https://textpro.me/3d-business-sign-text-effect-1078.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Business', args[0]))}).catch((err) => error(err))
            if (args[0] == 112) return mintake.textpro('https://textpro.me/create-carved-stone-text-effect-online-1074.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Carved Stone', args[0]))}).catch((err) => error(err))
            if (args[0] == 113) return mintake.textpro('https://textpro.me/create-3d-style-glass-text-effect-online-1072.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Style Glass', args[0]))}).catch((err) => error(err))
            if (args[0] == 114) return mintake.textpro('https://textpro.me/create-3d-giraffe-text-effect-online-1069.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Giraffe', args[0]))}).catch((err) => error(err))
            if (args[0] == 115) return mintake.textpro('https://textpro.me/make-a-batman-logo-online-free-1066.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Batman Logo', args[0]))}).catch((err) => error(err))
            if (args[0] == 116) return mintake.textpro('https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Halloween Skeleton', args[0]))}).catch((err) => error(err))
            if (args[0] == 117) return mintake.textpro('https://textpro.me/create-a-sketch-text-effect-online-1044.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sketch Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 118) return mintake.textpro('https://textpro.me/video-game-classic-8-bit-text-effect-1037.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Video Game Classic', args[0]))}).catch((err) => error(err))
            if (args[0] == 119) return mintake.textpro('https://textpro.me/create-green-horror-style-text-effect-online-1036.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Green Horror', args[0]))}).catch((err) => error(err))
            if (args[0] == 120) return mintake.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Magma Hot', args[0]))}).catch((err) => error(err))
            if (args[0] == 121) return mintake.textpro('https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Stone Cracked', args[0]))}).catch((err) => error(err))
            if (args[0] == 122) return mintake.textpro('https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Embossed Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 123) return mintake.textpro('https://textpro.me/broken-glass-text-effect-free-online-1023.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Broken Glass', args[0]))}).catch((err) => error(err))
            if (args[0] == 124) return mintake.textpro('https://textpro.me/create-art-paper-cut-text-effect-online-1022.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Paper Cut', args[0]))}).catch((err) => error(err))
            if (args[0] == 125) return mintake.textpro('https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Watercolor', args[0]))}).catch((err) => error(err))
            if (args[0] == 126) return mintake.textpro('https://textpro.me/write-text-on-foggy-window-online-free-1015.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Foggy Windows', args[0]))}).catch((err) => error(err))
            if (args[0] == 127) return mintake.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Bear', args[0]))}).catch((err) => error(err))
            if (args[0] == 128) return mintake.textpro('https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmas Holiday', args[0]))}).catch((err) => error(err))
            if (args[0] == 129) return mintake.textpro('https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Snow Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 130) return mintake.textpro('https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Cloud text', args[0]))}).catch((err) => error(err))
            if (args[0] == 131) return mintake.textpro('https://textpro.me/create-blackpink-logo-style-online-1001.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Blackpink', args[0]))}).catch((err) => error(err))
            if (args[0] == 132) return mintake.textpro('https://textpro.me/create-realistic-cloud-text-effect-online-free-999.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Realistic Cloud', args[0]))}).catch((err) => error(err))
            if (args[0] == 133) return mintake.textpro('https://textpro.me/create-a-cloud-text-effect-in-the-sky-online-997.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Cloud Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 134) return mintake.textpro('https://textpro.me/write-in-sand-summer-beach-free-online-991.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Summer Beach', args[0]))}).catch((err) => error(err))
            if (args[0] == 135) return mintake.textpro('https://textpro.me/sand-writing-text-effect-online-990.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Writing', args[0]))}).catch((err) => error(err))
            if (args[0] == 136) return mintake.textpro('https://textpro.me/sand-engraved-3d-text-effect-989.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Engraved', args[0]))}).catch((err) => error(err))
            if (args[0] == 137) return mintake.textpro('https://textpro.me/create-a-summery-sand-writing-text-effect-988.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Summery Sand', args[0]))}).catch((err) => error(err))
            if (args[0] == 138) return mintake.textpro('https://textpro.me/foil-balloon-text-effect-for-birthday-987.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Balloon Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 139) return mintake.textpro('https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Glue', args[0]))}).catch((err) => error(err))
            if (args[0] == 140) return mintake.textpro('https://textpro.me/1917-style-text-effect-online-980.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('1917', args[0]))}).catch((err) => error(err))
            if (args[0] == 141) return mintake.textpro('https://textpro.me/double-exposure-text-effect-black-white-976.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Double Exposure', args[0]))}).catch((err) => error(err))
            if (args[0] == 142) return mintake.textpro('https://textpro.me/glossy-carbon-text-effect-965.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Glossy Carbon', args[0]))}).catch((err) => error(err))
            if (args[0] == 143) return mintake.textpro('https://textpro.me/fabric-text-effect-online-964.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Fabric', args[0]))}).catch((err) => error(err))
            if (args[0] == 144) return mintake.textpro('https://textpro.me/fullcolor-balloon-text-effect-958.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Full Color Balloon', args[0]))}).catch((err) => error(err))
            if (args[0] == 145) return mintake.textpro('https://textpro.me/blood-text-on-the-frosted-glass-941.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Blood Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 146) return mintake.textpro('https://textpro.me/halloween-fire-text-effect-940.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Halloween Fire', args[0]))}).catch((err) => error(err))
            if (args[0] == 147) return mintake.textpro('https://textpro.me/create-logo-joker-online-934.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Joker Logo', args[0]))}).catch((err) => error(err))
            if (args[0] == 148) return mintake.textpro('https://textpro.me/wicker-text-effect-online-932.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Wicker', args[0]))}).catch((err) => error(err))
            if (args[0] == 149) return mintake.textpro('https://textpro.me/natural-leaves-text-effect-931.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Natural Leaves', args[0]))}).catch((err) => error(err))
            if (args[0] == 150) return mintake.textpro('https://textpro.me/skeleton-text-effect-online-929.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Skeleton', args[0]))}).catch((err) => error(err))
            if (args[0] == 151) return mintake.textpro('https://textpro.me/red-foil-balloon-text-effect-928.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Red Foil', args[0]))}).catch((err) => error(err))
            if (args[0] == 152) return mintake.textpro('https://textpro.me/ultra-gloss-text-effect-online-920.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Ultra Gloss', args[0]))}).catch((err) => error(err))
            if (args[0] == 153) return mintake.textpro('https://textpro.me/denim-text-effect-online-919.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Denim', args[0]))}).catch((err) => error(err))
            if (args[0] == 154) return mintake.textpro('https://textpro.me/decorate-purple-text-effect-917.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Decorate Purple', args[0]))}).catch((err) => error(err))
            if (args[0] == 155) return mintake.textpro('https://textpro.me/rock-text-effect-online-915.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Rock', args[0]))}).catch((err) => error(err))
            if (args[0] == 156) return mintake.textpro('https://textpro.me/lava-text-effect-online-914.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Lava', args[0]))}).catch((err) => error(err))
            if (args[0] == 157) return mintake.textpro('https://textpro.me/purple-glass-text-effect-912.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Glass', args[0]))}).catch((err) => error(err))
            if (args[0] == 158) return mintake.textpro('https://textpro.me/purple-shiny-glass-text-effect-906.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Shiny', args[0]))}).catch((err) => error(err))
            if (args[0] == 159) return mintake.textpro('https://textpro.me/captain-america-text-effect-905.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Captain America', args[0]))}).catch((err) => error(err))
            if (args[0] == 160) return mintake.textpro('https://textpro.me/toxic-text-effect-online-901.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Toxic Effect', args[0]))}).catch((err) => error(err))
            if (args[0] == 161) return mintake.textpro('https://textpro.me/purple-glass-text-effect-online-892.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Glass', args[0]))}).catch((err) => error(err))
            if (args[0] == 162) return mintake.textpro('https://textpro.me/decorative-glass-text-effect-891.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Decorative Glass', args[0]))}).catch((err) => error(err))
            if (args[0] == 163) return mintake.textpro('https://textpro.me/koi-fish-text-effect-online-888.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Koi Fish', args[0]))}).catch((err) => error(err))
            if (args[0] == 164) return mintake.textpro('https://textpro.me/horror-blood-text-effect-online-883.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Horror Blood', args[0]))}).catch((err) => error(err))
            if (args[0] == 165) return mintake.textpro('https://textpro.me/road-warning-text-effect-878.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Road Warning', args[0]))}).catch((err) => error(err))
            if (args[0] == 166) return mintake.textpro('https://textpro.me/dropwater-text-effect-872.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Dropwater', args[0]))}).catch((err) => error(err))
            if (args[0] == 167) return mintake.textpro('https://textpro.me/break-wall-text-effect-871.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Break Wall', args[0]))}).catch((err) => error(err))
            if (args[0] == 168) return mintake.textpro('https://textpro.me/plastic-bag-drug-text-effect-867.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Plastic Bag', args[0]))}).catch((err) => error(err))
            if (args[0] == 169) return mintake.textpro('https://textpro.me/horror-gift-text-effect-866.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Horror Gift', args[0]))}).catch((err) => error(err))
            if (args[0] == 170) return mintake.textpro('https://textpro.me/marble-slabs-text-effect-864.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Marble Slaps', args[0]))}).catch((err) => error(err))
            if (args[0] == 171) return mintake.textpro('https://textpro.me/ice-cold-text-effect-862.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Ice Cold', args[0]))}).catch((err) => error(err))
            if (args[0] == 172) return mintake.textpro('https://textpro.me/fruit-juice-text-effect-861.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Fruit Juice', args[0]))}).catch((err) => error(err))
            if (args[0] == 173) return mintake.textpro('https://textpro.me/wood-text-effect-856.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Wood Text', args[0]))}).catch((err) => error(err))
            if (args[0] == 174) return mintake.textpro('https://textpro.me/carbon-text-effect-833.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Carbon', args[0]))}).catch((err) => error(err))
            if (args[0] == 175) return mintake.textpro('https://textpro.me/misc-style-c29-p6', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Misc Style', args[0]))}).catch((err) => error(err))
            break

    /*---------JUEGOS----------*/
        case 'top3':
            if(args.length == 0) return 
            var t3m = []; 
            const p31 = randomizer(groupMetadata.participants); const p32 = randomizer(groupMetadata.participants); const p33 = randomizer(groupMetadata.participants);
            t3m.push(sender, p31.id, p32.id, p33.id)
            sendReplyWithMentions(toast.top3(sender, q, groupName, p31, p32, p33), t3m)
            break
        case 'top5':
            if(args.length == 0) return 
            var t5m = []; 
            const p51 = randomizer(groupMetadata.participants); const p52 = randomizer(groupMetadata.participants); const p53 = randomizer(groupMetadata.participants); const p54 = randomizer(groupMetadata.participants); const p55 = randomizer(groupMetadata.participants);
            t5m.push(sender, p51.id, p52.id, p53.id, p54.id, p55.id)
            sendReplyWithMentions(toast.top5(sender, q, groupName, p51, p52, p53, p54, p55), t5m)
            break
        case 'top10':
            if(args.length == 0) return 
            var t10m = []; 
            const p11 =randomizer(groupMetadata.participants); const p12 = randomizer(groupMetadata.participants); const p13 = randomizer(groupMetadata.participants); const p14 = randomizer(groupMetadata.participants); const p15 = randomizer(groupMetadata.participants); const p16 = randomizer(groupMetadata.participants); const p17 = randomizer(groupMetadata.participants); const p18 = randomizer(groupMetadata.participants); const p19 = randomizer(groupMetadata.participants); const p110 = randomizer(groupMetadata.participants);
            t10m.push(sender, p11.id, p12.id, p13.id, p14.id, p15.id, p16.id, p17.id, p18.id, p19.id, p110.id)
            sendReplyWithMentions(toast.top10(sender, q, groupName, p11, p12, p13, p14, p15, p16, p17, p18, p19, p110), t10m)
            break
        case 'akinator': case 'aki':
                if (sender !== usuarioJugando && haIniciado == true && !isOwner) return sendReplyWithMentions(toast.noPlayer(usuarioJugando), [usuarioJugando])
                if (q.toLowerCase() == 'start'){
                    if(haIniciado == true) return sendReply(toast.akiEnd())
                    const region = 'es'
                    aki = new Aki({region})
                    await aki.start()
                    usuarioJugando = sender
                    haIniciado = true
                    const text = toast.akiStart(aki)
                    const btext = 'Elige una opcion ✨'
                    return sendListText(text, btext, akil0)
                } else if (q == '0' || q == '1' || q == '2' || q == '3' || q == '4'){
                    if(haIniciado == false){return sendReply(toast.akiStoped())}
                    const myAnswer = q
                    await aki.step(myAnswer)
                    if(aki.progress >= 70 || aki.currentStep >= 78){
                        await aki.win()
                        var akiwon = aki.answers[0]
                        const text = toast.akiWon(akiwon)
                        const image = akiwon.absolute_picture_path
                        const buttons = [{buttonId: `${prefix}aki si`, buttonText: {displayText: 'SI'}, type: 1},{buttonId: `${prefix}aki 1`, buttonText: {displayText: 'NO'}, type: 1}]
                        return sendButtonImage(image, text, buttons)
                    } else {
                        const text = toast.akiStep(aki)
                        const btext = 'Elige una opcion ✨'
                        return sendListText( text, btext, akil1)
                    }
                } else if (q.toLowerCase() == 'atras'){
                    await aki.back()
                    const text = toast.akiStep(aki)
                    const btext = 'Elige una opcion ✨'
                    return sendListText( text, btext, akil1)
                }
                if (q.toLowerCase() == 'si'){
                    const text = toast.akiWin()
                    const buttons = [{  buttonId:`${prefix}akinator start`, buttonText:{ displayText:'[ JUGAR DE NUEVO ]' }, type:3  }, { buttonId:`${prefix}akinator terminar`, buttonText:{ displayText:'[ TERMINAR ]' }, type:3  }]
                    const image = `https://es.akinator.com/bundles/elokencesite/images/akitudes_670x1096/triomphe.png?v94`
                    return sendButtonImage(image, text, buttons)
                }
                if (q.toLowerCase() == 'terminar'){
                    haIniciado = false
                    usuarioJugando = false
                    const text = toast.akiFinish()
                    const image = `https://es.akinator.com/bundles/elokencesite/images/logo_akinator.png?v94`
                    const buttons = [{  buttonId:`${prefix}aki start`, buttonText:{ displayText:'[JUEGO NUEVO]' }, type:1  }]    
                    return sendButtonImage(image, text, buttons)
                }
                const textAki = toast.akiPlay(pushname)
                const image = `https://es.akinator.com/bundles/elokencesite/images/akinator.png?v94`
                const buttonsAki = [{  buttonId:`${prefix}akinator start`, buttonText:{ displayText:'[ JUGAR ]' }, type:1  }]
                sendButtonImage(image, textAki, buttonsAki)  
            break
        case 'casino':
            var casino = ['- 🍒 ', '- 🎃 ', '- 🍐 ', '- 🍋 ', '- 7️⃣ ', '- 🍇 ']
            var resultado = randomizer(casino) + randomizer(casino) + randomizer(casino) + '-'
            var resultado2 = randomizer(casino) + randomizer(casino) + randomizer(casino) + '-'
            var resultado3 = randomizer(casino) + randomizer(casino) + randomizer(casino) + '-'
            if (resultado == '- 🍒 - 🍒 - 🍒 -' || resultado == '- 🍐 - 🍐 - 🍐 -' || resultado == '- 🎃 - 🎃 - 🎃 -' || resultado == '- 🍋 - 🍋 - 🍋 -' || resultado == '- 7️⃣ - 7️⃣ - 7️⃣ -' || resultado == '- 🍇 - 🍇 - 🍇 -')  { 
                await sendReply(toast.casinoWin(resultado)) 
            } else { 
                await sendReply(toast.casinoLoose(resultado, looser)) 
            }
            break
        case 'dado': case 'dados':
            const dados = ['./media/resources/dados/1.webp','./media/resources/dados/2.webp','./media/resources/dados/3.webp','./media/resources/dados/4.webp','./media/resources/dados/5.webp','./media/resources/dados/6.webp']
            let random = dados[Math.floor(Math.random() * dados.length)]
            sentSticker(random)
            break      
        
    /*--------STICKERS Y MAS-------- */
        case 'sticker': case 's': case 'stiker':
            if (isImage){ let media = './media/temp/sticker.png'; await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media) };                
            if (isQuotedImage ){ let media = './media/temp/sticker.png';  const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo; await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});  sendSticker(client,msg,from,media) } ;            
            if (isVOImage){ let media = './media/temp/sticker.png'; const encmedia = msg.message.viewOnceMessage; await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media)}
            if (isQVOImage){ let media = './media/temp/reveal.png'; const encmedia = msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage; await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media) }
            if (isVideo){ if (msg.message.videoMessage.seconds > 10) return sendReply(toast.longSticker()); let media = './media/temp/sticker.mp4'; await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media); };            
            if (isQuotedVideo ){ if(msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 10 ) return sendReply(toast.longSticker()); let media = './media/temp/sticker.mp4'; const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo; await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media) };            
            if (isVOVideo){ let media = './media/temp/sticker.mp4'; const encmedia = msg.message.viewOnceMessage; if(encmedia.message.videoMessage.seconds > 10) return sendReply(toast.longSticker()); await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)}); sendSticker(client,msg,from,media) }
            if (isQVOVideo){ let media = './media/temp/sticker.mp4'; const encmedia = msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage;  if(encmedia.message.videoMessage.seconds > 10) return sendReply(toast.longSticker());  await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});  sendSticker(client,msg,from,media) }
        break
        
    /*--------PROCESADORES DE AUDIO, IMAGEN Y VIDEO-------- */
        case 'toimg': case 'stimg':
            if (isQuotedSticker){
                var ran = `${Math.floor(Math.random() * 10000)}${'.png'}`
                let media = './media/temp/toimg.png'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                exec(`ffmpeg -i ${media} ${ran}`, () => {client.sendMessage(from, {image: readFileSync(ran), caption: toast.processed()},{quoted: msg}); unlinkSync(ran); unlinkSync(media)})
            }
            break
        case 'tovid': case 'stvid':
            if (isQuotedSticker){
                let media = './media/temp/tovid.mp4'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                sendGifReply(readFileSync(media), toast.processed)
            }
            break
        case 'tovn':
            if (isQuotedAudio || isQuotedVideo){
                var ran = `${Math.floor(Math.random() * 10000)}${'.mp4'}`
                let media = './media/temp/tovn.mp4'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                exec(`ffmpeg -i ${media} ${ran}`, () => { const buffer = readFileSync(ran); client.sendMessage(from, { audio: buffer, mimetype: 'audio/mp4', ptt: true},{quoted: msg}); unlinkSync(ran); unlinkSync(media)})
            }
            break
        case 'tomp3':
            if (isQuotedAudio || isQuotedVideo){
                var ran = `${Math.floor(Math.random() * 10000)}${'.mp4'}`
                let media = './media/temp/tovn.mp4'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                exec(`ffmpeg -i ${media} ${ran}`, () => { const buffer = readFileSync(ran) ; client.sendMessage(from, { audio: buffer, mimetype: 'audio/mp4' },{quoted: msg}); unlinkSync(ran); unlinkSync(media) })
            }
            break
        case 'tts':
            try {
                if (args.length == 0) return sendButtonText(toast.tts(), [{  buttonId:`${prefix}listatts`, buttonText:{ displayText:'·Lista Idiomas·' }, type:1  }])
                const dataText = q.slice(3)
                const ttsGB = gtts(args[0])
                if (dataText == '') return sendReply(toast.ttsError()) 
                ttsGB.save('./media/temp/tts.mp3', dataText, async function(){ grabando(from); await sendPttReply('./media/temp/tts.mp3').catch(() => {sendReply(toast.error())})})
            } catch(e){
                log(e)
            }
            break
        case 'listatts':
            sendReply(menu.ttsList(informacion))
            break
        case 'clima':
            if(args.length == 0) return sendReply(toast.clima())
            const {data} = await axios.get(`https://api.weatherapi.com/v1/current.json?key=0a00314faabd4e3ab39175815211712&q=${encodeURIComponent(q)}&aqi=no`)
            const {name, region, country, lat, lon, tz_id, localtime} = data.location
            const {temp_c, temp_f, condition} = data.current
            translate(condition.text, 'es').then(async (res) => {
                const text = `*⋆⋅⋅⋅⊱∘──[✧CLIMA✧]──∘⊰⋅⋅⋅⋆*\n_*${name} - ${region} - ${country}*_\n*${localtime}*\n*${res}*\n\n*${temp_c}ºc - ${temp_f}ºf*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
                sendImageReply(`https:${condition.icon}`, text)
            })
            break
        case 'newrule': case 'addrule': case 'nuevaregla':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            addRules(groupId,q)
            sendReply(toast.rulesUpdated(q))
            break
        case 'reglas': case 'rules':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            const isRule = checkRules(groupId)
            if (isRule === false){
                if (groupDesc === undefined){ var reglas = 'Este grupo aun no tiene reglas definidas.' } else { var reglas = groupDesc }
                sendReply(toast.rules(groupName, reglas))
            } else {
                const rules = getRules(groupId)
                sendReply(toast.rules(groupName, rules))
            }
            break
        case 'resetrules':
            if (!isGroup) return sendReply(toast.groups())
            if (!isAdmin && !isOwner && !isVip) return sendReply(toast.admins())
            try {
                const isRule = checkRules(groupId)
                if (isRule == false) return sendReply(toast.notRules())
                resetRules(groupId)
                sendReply(toast.rulesReset())
            } catch (e) {
                log(e)
            }
            break
        case 'revelar':
            if(isQuotedViewOnce){
                const encmedia = msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage
                let media = './media/temp/reveal.png'
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                sendImageReply(media, toast.sucess)
            } else {
                sendReply('[Error] => Funcion no disponible para mensajes normales')
            }
            break
        case 'afk':
            if (!isGroup) return await sendReply( toast.groups())
            const timee = moment.tz('America/Bogota').format('DD/MM/YY HH:mm:ss')
            if (isAfkOn) return await sendReply( `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_⋆⋅⊱∘[✧MODO AFK✧]∘⊰⋅⋆_\n\n_La función AFK ya se ha *ACTIVADO* antes._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
            const reason = q ? q : 'Ninguna.'
            addAfkUser(sender, timee, reason)
            await sendReply( `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_⋆⋅⊱∘[✧MODO AFK✧]∘⊰⋅⋆_\n\n_La función AFK se ha *ACTIVADO* con éxito_\n   \n    ➸ *Usuario*: ${pushname}\n    ➸ *Razón*: ${reason}\n    \n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
            break
        
    //AJUSTES DE PREFIJOS Y PRIVACIDAD
        case 'private': case '🔒':
            if (!isOwner) return sendReply( toast.owners())
            if (banChats === true) return sendReply('·El bot ya esta configurado como privado·')
            info.banChats = true
            banChats = true
            writeFileSync('./JSONS/settings.json', stringify(info))
            sendReply('Bot configurado como privado')
            break
        case 'public': case '🔓':
            if (!isOwner) return sendReply( toast.owners())
            if (banChats === false) return sendReply('·El bot ya esta configurado como publico')
            info.banChats = false
            banChats = false
            writeFileSync('./JSONS/settings.json', stringify(info))
            sendReply('Bot configurado como publico')
            break
        case 'onepref':
            if (!isOwner) return sendReply( toast.owners())
            if (onepref == true ) return sendReply('·la funcion [UN PREFIX] ya esta activa·')
            info.onepref = true; onepref = true; info.nopref = false; nopref = false; info.multipref = false; multipref = false; 
            writeFileSync('./JSONS/settings.json', stringify(info))
            sendReply(toast.onepref())
            break
        case 'nopref':
            if (!isOwner) return sendReply( toast.owners())
            if (nopref == true ) return sendReply('·la funcion [SIN PREFIX] ya esta activa·')
            info.onepref = false; onepref = false; info.nopref = true; nopref = true; info.multipref = false; multipref = false; 
            writeFileSync('./JSONS/settings.json', stringify(info))
            sendReply(toast.nopref())
            break
        case 'multipref':
            if (!isOwner) return sendReply( toast.owners())
            if (multipref == true ) return sendReply('·la funcion [MULTI PREFIX] ya esta activa·')
            info.onepref = false; onepref = false; info.nopref = false; nopref = false; info.multipref = true; multipref = true; 
            writeFileSync('./JSONS/settings.json', stringify(info))
            sendReply(toast.multipref())
            break
        case 'prefix':
            if (!isOwner) return sendReply( toast.owners())
            const sections = [{ rows: [{ title: `·SIN PREFIJO·`, rowId: `${prefix}nopref` },{ title: `·MULTI PREFIJO·`, rowId: `${prefix}multipref` }, { title: `UN PREFIJO`, rowId: `${prefix}onepref` }]}]
            sendListText(toast.prefixes(pushname), '· ✍️ Opciones·', sections)
            break
        case 'newpref':
            if (!isOwner) return sendReply( toast.owners());
            if (args.length === 0) return sendReply(toast.nonewpref());
            if (q.length > 1) return sendReply(toast.newpreflong()); 
            info.prefix = q;
            prefix = q;
            writeFileSync('./JSONS/settings.json', stringify(info)); sendReply(toast.newpref(q));
            break
    
    //EFECTOS DE AUDIO
        case 'ardilla':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var ranard = './media/temp/'+getRandom('.mp4');  const ardmed = './media/temp/ardilla.mp4'
            const ardenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(ardenc).then(async res => {await writeFile(ardmed, res)})
            exec(`ffmpeg -i ${ardmed} -filter:a "atempo=0.6,asetrate=85000" ${ranard}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(ranard) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'bajos':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var bassrand = './media/temp/'+getRandom('.mp4');  const bassmedia = './media/temp/bajos.mp4'
            const bassenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(bassenc).then(async res => {await writeFile(bassmedia, res)})
            exec(`ffmpeg -i ${bassmedia} -af equalizer=f=94:width_type=o:width=2:g=30 ${bassrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(bassrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'ruido': case 'trigger':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var trigerrand = './media/temp/'+getRandom('.mp4');  const trigermedia = './media/temp/ruido.mp4'
            const trigerenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(trigerenc).then(async res => {await writeFile(trigermedia, res)})
            exec(`ffmpeg -i ${trigermedia} -af acrusher=.1:1:64:0:log:1 ${trigerrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(trigerrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'profundo': case 'deep':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var deeprand = './media/temp/'+getRandom('.mp4');  const deepmedia = './media/temp/profundo.mp4'
            const deepenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(deepenc).then(async res => {await writeFile(deepmedia, res)})
            exec(`ffmpeg -i ${deepmedia} -af atempo=4/4,asetrate=44500*2/3 ${deeprand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(deeprand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'volumen': case 'earrape':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var earraperand = './media/temp/'+getRandom('.mp4');  const earrapemedia = './media/temp/volumen.mp4'
            const earrapeenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(earrapeenc).then(async res => {await writeFile(earrapemedia, res)})
            exec(`ffmpeg -i ${earrapemedia} -af volume=12 ${earraperand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(earraperand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'rapido': case 'fast':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var fastrand = './media/temp/'+getRandom('.mp4');  const fastmedia = './media/temp/rapido.mp4'
            const fastenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(fastenc).then(async res => {await writeFile(fastmedia, res)})
            exec(`ffmpeg -i ${fastmedia} -filter:a "atempo=1.63,asetrate=44100" ${fastrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(fastrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'gordo': case 'fat':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var fatrand = './media/temp/'+getRandom('.mp4');  const fatmedia = './media/temp/gordo.mp4'
            const fatenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(fatenc).then(async res => {await writeFile(fatmedia, res)})
            exec(`ffmpeg -i ${fatmedia} -filter:a "atempo=1.6,asetrate=22100" ${fatrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(fatrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'hombre': case 'man': //error
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var manrand = './media/temp/'+getRandom('.mp4');  const manmedia = './media/temp/hombre.mp4'
            const manenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(manenc).then(async res => {await writeFile(manmedia, res)})
            exec(`ffmpeg -i ${manmedia} atempo=4/3,asetrate=44500*3/4 ${manrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(manrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'niño': case 'boy': //error
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var boyrand = './media/temp/'+getRandom('.mp4');  const boymedia = './media/temp/niño.mp4'
            const boyenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(boyenc).then(async res => {await writeFile(boymedia, res)})
            exec(`ffmpeg -i ${boymedia} atempo=3/4,asetrate=44500*4/3 ${boyrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(boyrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'fantasma': case 'ghost': //error
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var ghostrand = './media/temp/'+getRandom('.mp4');  const ghostmedia = './media/temp/fantasma.mp4'
            const ghostenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(ghostenc).then(async res => {await writeFile(ghostmedia, res)})
            exec(`ffmpeg -i ${ghostmedia} atempo=1.0,asetrate=3486 ${ghostrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(ghostrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'noche': case 'nightcore':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var nightcorerand = './media/temp/'+getRandom('.mp4');  const nightcoremedia = './media/temp/noche.mp4'
            const nightcoreenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(nightcoreenc).then(async res => {await writeFile(nightcoremedia, res)})
            exec(`ffmpeg -i ${nightcoremedia} -filter:a atempo=1.06,asetrate=44100*1.25 ${nightcorerand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(nightcorerand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'reversa': case 'reverse':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var reverserand = './media/temp/'+getRandom('.mp4');  const reversemedia = './media/temp/reversa.mp4'
            const reverseenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(reverseenc).then(async res => {await writeFile(reversemedia, res)})
            exec(`ffmpeg -i ${reversemedia} -filter_complex "areverse" ${reverserand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(reverserand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'robot': case 'robot':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var robotrand = './media/temp/'+getRandom('.mp4');  const robotmedia = './media/temp/robot.mp4'
            const robotenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(robotenc).then(async res => {await writeFile(robotmedia, res)})
            exec(`ffmpeg -i ${robotmedia} -filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75" ${robotrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(robotrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'lento': case 'slow':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var slowrand = './media/temp/'+getRandom('.mp4');  const slowmedia = './media/temp/lento.mp4'
            const slowenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(slowenc).then(async res => {await writeFile(slowmedia, res)})
            exec(`ffmpeg -i ${slowmedia} -filter:a "atempo=0.7,asetrate=44100" ${slowrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(slowrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        case 'suave': case 'smooth':
            if (!isQuotedAudio) return sendReply(`[ERROR] => por favor etiqueta una cancion`)
            sendReply(toast.audioproc())
            var smoothrand = './media/temp/'+getRandom('.mp4');  const smoothmedia = './media/temp/suave.mp4'
            const smoothenc = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(smoothenc).then(async res => {await writeFile(smoothmedia, res)})
            exec(`ffmpeg -i ${smoothmedia} -filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'" ${smoothrand}`, async () => { 
                await client.sendMessage(from, { audio: readFileSync(smoothrand) , mimetype: 'audio/mp4', ptt: true},{quoted:msg}); 
            })
            break
        
    //MULTIMEDIA Y DESCARGAS
        case 'stik': case 'stick':
            if (args.length == 0) return sendReply(toast.stick())
            var opts = {searchTerm: q, queryStringAddition: '&hl=es-419&tbm=isch&tbs=ic:trans'}
            gis(opts, stiks)
            function stiks (error, result){
                if(error) return (sendReply(toast.error()))
                sendStickerFromUrl(client, msg, from, result[Math.floor(Math.random() * result.length)].url)
            }
            break
        case 'imagereverse':
            if (!isImage && !isQuotedImage) return sendReply(toast.girInf())
            if (isImage){ let media = './media/temp/gir.png'; 
                await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)}); 
                const options = {apiKey: imgbb, imagePath: media, expiration: 3600};
                const img = await imgbbUp(options);
                const girRes = img.display_url;
                await gir(girRes, Gir);
                function Gir(result){sendReply(toast.gir(result)).catch(() => sendReply(toast.error()))}
            };
            if (isQuotedImage ){ let media = './media/temp/gir.png';  
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo; 
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)});  
                const options = {apiKey: imgbb, imagePath: media, expiration: 3600};
                const img = await imgbbUp(options);
                const girRes = img.display_url;
                await gir(girRes, Gir);
                function Gir(result){sendReply(toast.gir(result)).catch(() => sendReply(toast.error()))}
            };
            break
        case 'imagen': case 'imagenes': case 'image': case 'images':
            if (args.length == 0) return sendReply(toast.gis())
            const messageOptions = {
                quoted:msg,
                contextInfo:{ forwardingScore : 580,isForwarded: true},
                caption: 'hey tu XD',
                jpegThumbnail: null,
                fileName: 'ardilla.mp4',
                ptt: true,
                ephemeralDuration: WA_DEFAULT_EPHEMERAL
            }
            gis(q, results)
            function results (error, result){
                if(error) return (sendReply(toast.error()))
                var random = result[Math.floor(Math.random() * result.length)].url
                client.sendMessage(from, {image: {url:random}, caption: toast.searched(), jpegThumbnail: null},messageOptions)
                //sendImageReply(random, toast.searched())
            }
            break
        case 'ytmp3':
            if (args.length == 0) return sendReply(toast.ytmp3())
            if (!isLink && !isYoutube) return sendReply(toast.noytlink())
            const ytmp3 = await scraper.youtubedl(q).catch(async () => await scraper.youtubedlv2(q))
            if (ytmp3.thumbnail === 'https://i.ytimg.com/vi/xKKeqlBQass/0.jpg') { sendImageReply('./media/resources/ytunk.png', toast.ytunk())}
            const dlMp3 = await ytmp3.audio['128kbps'].download()
            await sendImageReply(ytmp3.thumbnail, toast.ytmres(ytmp3))
            await sendAudioReply({url: dlMp3})
            break
        case 'ytptt':
            if (args.length == 0) return sendReply(toast.ytptt())
            if (!isLink && !isYoutube) return sendReply(toast.noytlink())
            const ytaudio = await scraper.youtubedl(q).catch(async () => await scraper.youtubedlv2(q))
            if (ytaudio.thumbnail === 'https://i.ytimg.com/vi/xKKeqlBQass/0.jpg') { sendImageReply('./media/resources/ytunk.png', toast.ytunk())}
            const dlAudio = await ytaudio.audio['128kbps'].download()
            await sendImageReply(ytaudio.thumbnail, toast.ytmres(ytaudio))
            await sendPttReply(dlAudio)
            break
        case 'ytdoc':
            if (args.length == 0) return sendReply(toast.ytdoc())
            if (!isLink && !isYoutube) return sendReply(toast.noytlink())
            const ytdoc = await scraper.youtubedl(q).catch(async () => await scraper.youtubedlv2(q))
            if (ytdoc.thumbnail === 'https://i.ytimg.com/vi/xKKeqlBQass/0.jpg') { sendImageReply('./media/resources/ytunk.png', toast.ytunk())}
            const dlDoc = await ytdoc.audio['128kbps'].download()
            await sendImageReply(ytdoc.thumbnail, toast.ytmres(ytdoc))
            await sendAudioDocReply({url: dlDoc}, ytdoc.title)
            break
        case 'yts':
            if(args.length == 0) return sendReply(toast.yts())
            yts(q).then(async res => {
                var ytRes = '';
                ytRes += '[ *RESULTADOS DE BUSQUEDA* ]'
                ytRes += '\n________________________\n\n'
                res.videos.map((video) =>{ ytRes += `*📖 Título:* ${video.title} \n`; ytRes += `*🔗 Enlace:* ${video.url} \n`; ytRes += `*⏳ Duración:* ${video.timestamp} \n`; ytRes += `*📢 Publicado:* ${video.ago}\n________________________\n\n` });
                ytRes += copyright
                sendImageReply(res.videos[0].image, ytRes)
            })
            break
        case 'musica': case 'música': case 'music':
            if (args.length == 0) return sendReply(toast.ytmusic())
            yts(q).then(async res => {
                const {url, title, description, image, timestamp, ago, views, author} = res.videos[0]
                var visitas = new Intl.NumberFormat().format(views);
                if (visitas == NaN){var visitas = 'Sin'}
                const hace = await translate(ago, 'es')
                /*const buttons = [

                    {index: 1, urlButton: {displayText: '·URL·', url: url}},
                    {index: 2, urlButton: {displayText: '·CANAL·', url: author.url}},
                    {index: 3, quickReplyButton: {displayText: '·MP3·', id: `${prefix}ytmp3 ${url}`}},
                    {index: 4, quickReplyButton: {displayText: '·DOCUMENTO·', id: `${prefix}ytdoc ${url}`}},
                    {index: 5, quickReplyButton: {displayText: '·MAS RESULTADOS·', id: `${prefix}ytmusic ${url}`}}
                ]*/
                const buttons = [
                    {  buttonId:`${prefix}ytmp3 ${url}`, buttonText:{ displayText:'·MP3·' }, type:1  },
                    {  buttonId:`${prefix}ytdoc ${url}`, buttonText:{ displayText:'·DOCUMENTO·' }, type:1  },
                    {  buttonId:`${prefix}yts ${q}`, buttonText:{ displayText:'·MAS RESULTADOS·' }, type:1  }
                  ]
                sendButtonImage(image, toast.musica(timestamp, title, visitas, hace, description), buttons)
            })
            break
        case 'video': case 'vídeo':
            if (args.length == 0) return sendReply(toast.ytvid())
            yts(q).then(async res => {
                const {url, title, description, image, timestamp, ago, views} = res.videos[0]
                var visitas = new Intl.NumberFormat().format(views);
                if (visitas == NaN){var visitas = 'Sin'}
                const hace = await translate(ago, 'es')
                const buttons = [
                    {  buttonId:`${prefix}ytmp4 ${url}`, buttonText:{ displayText:'·MP4·' }, type:1  },
                    {  buttonId:`${prefix}ytvdoc ${url}`, buttonText:{ displayText:'·DOCUMENTO·' }, type:1  },
                    {  buttonId:`${prefix}yts ${q}`, buttonText:{ displayText:'·MAS RESULTADOS·' }, type:1  }
                  ]
                return sendButtonImage(image, toast.video(timestamp, title, visitas, hace, description), buttons)
            })
            break
        case 'ytmusic':
            if(!isOwner) return sendReply(toast.owners())
            break
        case 'ytvideo':
            if(!isOwner) return sendReply(toast.owners())
            break
        case 'ytmp4':
            if (args.length == 0) return sendReply(toast.ytmp4())
            if (!isLink && !isYoutube) return sendReply(toast.noytlink())
            const ytmp4 = await scraper.youtubedl(q).catch(async () => await scraper.youtubedlv2(q))
            if (ytmp4.thumbnail === 'https://i.ytimg.com/vi/xKKeqlBQass/0.jpg') { sendImageReply('./media/resources/ytunk.png', toast.ytunkv())}
            const dlMp4 = await ytmp4.video['360p'].download().catch(async () => ytmp4.video['144p'].download())
            await sendImageReply(ytmp4.thumbnail, toast.ytmresv(ytmp4))
            await sendVideoReply({url: dlMp4})
            break
        case 'ytvdoc':
            if (args.length == 0) return sendReply(toast.ytvdoc())
            if (!isLink && !isYoutube) return sendReply(toast.noytlink())
            const ytvdoc = await scraper.youtubedl(q).catch(async () => await scraper.youtubedlv2(q))
            if (ytvdoc.thumbnail === 'https://i.ytimg.com/vi/xKKeqlBQass/0.jpg') { sendImageReply('./media/resources/ytunk.png', toast.ytunkv())}
            const dlvDoc = await ytvdoc.video['360p'].download().catch(async () => ytvdoc.video['144p'].download())
            await sendImageReply(ytvdoc.thumbnail, toast.ytmresv(ytvdoc))
            await sendVideoDocReply({url: dlvDoc}, ytvdoc.title)
            break
        case 'play': case 'reproducir':
            if (args.length == 0) return sendReply(toast.ytplay())
            yts(q).then(async res => {
                const {url, title, description, image, timestamp, ago, views, author} = res.videos[0]
                var visitas = new Intl.NumberFormat().format(views);
                if (visitas == NaN){var visitas = 'Sin'}
                const hace = await translate(ago, 'es')
                const buttons = [
                    {  buttonId:`${prefix}ytmp3 ${url}`, buttonText:{ displayText:'·MUSICA·' }, type:1  },
                    {  buttonId:`${prefix}ytmp4 ${url}`, buttonText:{ displayText:'·VIDEO·' }, type:1  },
                    {  buttonId:`${prefix}yts ${q}`, buttonText:{ displayText:'·MAS RESULTADOS·' }, type:1  }
                  ]
                sendButtonImage(image, toast.musica(timestamp, title, visitas, hace, description), buttons)
            })
            break
        case 'google':
            if(args.length == 0 ) return 
            google({ 'query': q }).then(async res => {
                var gresult = ''
                gresult += `_Resultados de: *${q}*_\n`
                gresult += '\n________________________\n\n'
                res.map(({title, link, snippet}) => {
                    gresult += `*${title}*\n_${snippet}_\n${link}\n________________________\n\n`
                })
                gresult += copyright
                sendReply(gresult)
            })
            break
        case 'shazam':
            if (!isOwner) return (toast.owners())
            if (!isQuotedAudio && !isQuotedVideo) return
            if (isQuotedAudio) sendReply(toast.audioproc()); if (isQuotedVideo) sendReply(toast.videoproc())
            const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            await downloadMediaMessage(encmedia).then(async res => {await writeFile('./media/temp/shazam.mp3', res)})
            acr.identify(readFileSync('./media/temp/shazam.mp3')).then(async res => {
                log(res.status.msg)
                if (res.status.msg != 'Success') return sendReply(toast.error())
                var musics = []; var artistas = []; var generos = []; var titulo = ''
                musics += '*⋆⋅⋅⋅⊱∘[✧SHAZAM✧]∘⊰⋅⋅⋅⋆*\n\n_🎧 RESULTADOS DE BUSQUEDA_\n'
                musics += '________________________\n'
                res.metadata.music.map(({title, score, duration_ms, release_date, artists, genres, album}) => {
                    titulo += title
                    artists.map(({name})=>{ artistas += name })
                    genres.map(({name})=> {generos += name})
                    musics += `Nombre: ${title}\nArtistas: ${artistas.toString()}\nAlbum: ${album.name}\nGeneros: ${generos.toString()}\nDuracion: ${duracion(duration_ms)}\nPuntuacion: ${score}\nFecha de lanzamiento: ${release_date}\n\n`
                })
                musics += '·⏬ DESCARGAR CANCION·'
                yts(titulo+artistas).then(async res => {
                    const buttons = [{  buttonId:`${prefix}ytdoc ${res.videos[0].url}`, buttonText:{ displayText:'·DESCARGAR·' }, type:1  }]
                    sendButtonImage(res.videos[0].image, musics ,buttons)
                })
            })
            break
        case 'voz':
            //if(!isOwner) return sendReply(toast.owners())
            if (args[0] == 1){textToSpeak(q.slice(2), 'es-ES_EnriqueV3Voice', sendPttReply)}
            if (args[0] == 2){textToSpeak(q.slice(2), 'es-ES_LauraV3Voice', sendPttReply)}
            if (args[0] == 3){textToSpeak(q.slice(2), 'es-LA_SofiaV3Voice', sendPttReply)}
            if (args[0] == 4){textToSpeak(q.slice(2), 'es-US_SofiaV3Voice', sendPttReply)}
            if (args[0] == 5){ const trans = await translate(q.slice(2), 'ar'); textToSpeak(trans, 'ar-MS_OmarVoice', sendPttReply)}
            if (args[0] == 6){ const trans = await translate(q.slice(2), 'en'); textToSpeak(trans, 'en-AU_CraigVoice', sendPttReply)}
            if (args[0] == 7){ const trans = await translate(q.slice(2), 'cs'); textToSpeak(trans, 'cs-CZ_AlenaVoice', sendPttReply)}
            break
        case 'voz2':
            if (args.length == 0) return sendButtonText(toast.voz2(), [{  buttonId:`${prefix}listavoz2`, buttonText:{ displayText:'·Lista Idiomas·' }, type:1  }])
            const dataText = q.slice(3)
            const voz2trans = await translate(dataText, args[0])
            const ttsGB = gtts(args[0])
            if (dataText == '') return sendReply(toast.ttsError()) 
            ttsGB.save('./media/temp/tts.mp3', voz2trans, async function(){ grabando(from); await sendPttReply('./media/temp/tts.mp3').catch(() => {sendReply(toast.error())})})
            break
        case 'listavoz2':
            sendReply(menu.voz2List(informacion))
            break
        /*case 'fakeyou':
            fakeyou('mario', q)
            break*/
        case 'test':
            const letra = q
            const array = ['0','1','2','3','4','5','6','7','8']
            let res = 'Letras encontradas: '

            for (let i of array){
                if(!isNaN(i)) 
                res += `${i},`
            }
            console.log(res)

            break
            default:
    }
    switch(stickerCommand){
        case 'G9tTADIZWkqyKB46Hhxlg5qex17XLQ9e/H6psMqX/aY=': //degradar
            if (!isGroup) return 
            if (!isAdmin && !isOwner && !isVip) return sentSticker('./media/resources/noeresadmin.webp')
            if (!isBotAdmin) return sentSticker('./media/resources/nosoyadmin.webp')
            if (isTagStick){
                const etiqueta = msg.message.stickerMessage.contextInfo.participant
                /*if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.dembot(pushname))
                if (!groupAdmins.includes(etiqueta)) return sendReply(toast.demadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido degradado rango *Administrador*`*/
                client.groupParticipantsUpdate(from,[etiqueta], 'demote')//.then(()=>{sendReplyWithMentions(text, [etiqueta])})
            }
            break
        case 'bpBZYs84+GEOkiydmHJx3gTW/y0+DgSFxR8lTDRDytI=': //promover
            if (!isGroup) return 
            if (!isAdmin && !isOwner && !isVip) return sentSticker('./media/resources/noeresadmin.webp')
            if (!isBotAdmin) return sentSticker('./media/resources/nosoyadmin.webp')
            if (isTagStick){
                const etiqueta = msg.message.stickerMessage.contextInfo.participant
                /*if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.prombot(pushname))
                if (groupAdmins.includes(etiqueta)) return sendReply(toast.promadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido promovido al rango *Administrador*`*/
                return client.groupParticipantsUpdate(from,[etiqueta], 'promote')//.then(()=>{sendReplyWithMentions(text, [etiqueta])})
            }
            break
        case 'Qh+dbYtW4U6tyUzYXZBlvaQf3bqP3lUVy7pMFdxEKvE=' : case 'wp/ycr49ARhiEWFElIPsKp2wAwLl/bdXOxxTxDrSkj8=': case'Gxd9NTeMC+zaim7v+1byqjDhHd80MHABnByTaK+CgNQ=': //ban
            if (!isGroup) return 
            if (!isAdmin && !isOwner && !isVip) return sentSticker('./media/resources/noeresadmin.webp')
            if (!isBotAdmin) return sentSticker('./media/resources/nosoyadmin.webp')
            if (isTagStick){
                const etiqueta = msg.message.stickerMessage.contextInfo.participant
                /*if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.rembot(pushname))
                if (groupAdmins.includes(etiqueta)) return sendReply(toast.remadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido eliminado grupo`*/
                return client.groupParticipantsUpdate(from,[etiqueta], 'remove')//.then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } 
        break
        case 'RAtob2atehYcVKFbWZS12dqhQXvlXLNYqLigVsLxQGY=': //repetir comandos
            if (isTextTagStick){ const etiqueta = msg.message.stickerMessage.contextInfo.quotedMessage.conversation }
            break
        
        default:
    }
    if (isSticker) {log(stickerCommand)}
}