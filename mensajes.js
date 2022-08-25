"use strict"
/*----------MODULOS----------*/
const {assertMediaContent, downloadMediaMessage, WA_DEFAULT_EPHEMERAL, downloadContentFromMessage, getContentType } = require ('@adiwajshing/baileys')
const { writeFile } =  require ('fs/promises')
const {generate} = require ('flaming-text-generator')
const moment = require ('moment-timezone')
const gtts = require ('node-gtts')
const ffmpeg = require ('fluent-ffmpeg')
const axios = require ('axios')
const fetch = require ('node-fetch')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const translate = require ('./funciones/traductor.js')
const funciones = require ('./funciones')
const utilidades = require('./utilidades')
const { color} = utilidades
const toast = require('./JSONS/toasts.js')
const menu = require('./JSONS/menus.js')
const mintake = require('mintake')
const { text } = require('figlet')
const { Aki } = require('aki-api')

let {inWA, groupSettings, getAdmins, getAll, sendSticker} = funciones
let { readFileSync, writeFileSync, unlinkSync, existsSync} = fs
let { stringify, parse } = JSON

const log = console.log;
const error = console.error;

/*--------------ESPECIALES--------------*/
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const time = moment.tz('America/Bogota').format('H:mm:ss a')
const date = moment.tz('America/Bogota').format('DD/MM/YY')
const timeDate = moment.tz('America/Bogota').format('DD/MM/YY h:mm a')
const processTime = async (timestamp, now) => {return moment.duration(now - moment(timestamp * 1000)).asSeconds()}
const randomizer = (value) => {const random = value[Math.floor(Math.random() * value.length)]; return random}
const loose = ['Buena suerte para la próxima crack.','Esta vez no fue, talvez luego.', 'Date un baño de azucar para quitarte la sal que llevas encima.', 'Buen intento crack ;).', 'Le apuntaste pero no le pegaste.', 'Por poco ganas']
let looser = loose[Math.floor(Math.random() * loose.length)]

/*--------------JSON'S--------------*/
const alertas = parse(readFileSync('./JSONS/alertas.json'))
const info = parse(readFileSync('./JSONS/configs.json'))
let {numeroCreador, nombreCreador, nombreBot, copyright, igCreador, fbCreador, ytCreador, discordCreador, prefix, banChats, nopref, onepref, multipref } = info
const banned = parse(readFileSync('./JSONS/banned.json'))
const bienvenida = parse(readFileSync('./JSONS/bienvenida.json'))
const despedida = parse(readFileSync('./JSONS/despedida.json'))
const promote = parse(readFileSync('./JSONS/promote.json'))
const demote = parse(readFileSync('./JSONS/demote.json'))
const vip = parse(readFileSync('./JSONS/vip.json'))
const antienlaces = parse(readFileSync('./JSONS/antienlaces.json'))
const premium = parse(readFileSync('./JSONS/premium.json'))
const _afk = parse(readFileSync('./JSONS/afk.json'))
const _leveling = parse(readFileSync('./JSONS/leveling.json'))
const _registered = parse(readFileSync('./JSONS/registered.json'))
const _level = parse(readFileSync('./datos/level.json'))
const antiarabes = parse(readFileSync('./JSONS/antiarabes.json'))
const antifakes = parse(readFileSync('./JSONS/antifakes.json'))
const onlyowner = parse(readFileSync('./JSONS/onlyowner.json'))
const onlyvip = parse(readFileSync('./JSONS/onlyvip.json'))
const onlypremium = parse(readFileSync('./JSONS/onlypremium.json'))
const onlyadmins = parse(readFileSync('./JSONS/onlyadmins.json'))
const nsfw = parse(readFileSync('./JSONS/nsfw.json'))
const porno = parse(readFileSync('./JSONS/porno.json'))
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
    const sendText = async (texto) => {client.sendMessage(from, {text: texto})}
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const sendReplyWithMentions = async (texto, menciones) => {await client.sendMessage(from, {text: texto, mentions: menciones}, {quoted: msg})}
    const sendTextWithMentions = async (texto, menciones) => {await client.sendMessage(from, {text: texto, mentions: menciones})}
    const sendLocation = async (latitud, longitud) => {await client.sendMessage(from, {location: {degreesLatitude: latitud, degreesLongitude: longitud}})}
    const sendVcard = async (texto, vcard) =>{client.sendMessage(from, {contacts:{displayName: texto, contacts: [{vcard}]}})}
    const sendButtonText = async (texto, botones = []) => {client.sendMessage(from, {text: texto, footer: copyright, buttons: botones, headerType: 1})}
    const sendButtonImage = async (imagen, texto, botones) => { await client.sendMessage(from, {image: {url: imagen}, caption: texto, footer: copyright, buttons: botones, headerType: 4})}
    const sendTemplateButtonText = async (texto, botones) => { await client.sendMessage(from, { text: texto, footer: copyright, templateButtons: botones}) }
    const sendTemplateButtonImage = async (imagen, texto, botones) => { await client.sendMessage(from, { text: texto, footer: copyright, templateButtons: botones, image: {url: imagen}}) }
    const sendListText = async (text, btext, sections) => { client.sendMessage(from, {text: text, footer: copyright, title: '', buttonText: btext, sections })}
    const sendReaction = async (texto, para) => {client.sendMessage(para, { react: { text: texto, key: msg.key } })}
    const sendGif = async (ubicacion, texto) => {client.sendMessage(from, {video: {url: ubicacion}, caption: texto, gifPlayback: true})}
    const sendGifReply = async (ubicacion, texto) => {client.sendMessage(from, {video: {url: ubicacion}, caption: texto, gifPlayback: true},{quoted: msg})}
    const sendVideo = async (ubicacion, texto) => {client.sendMessage(from, {video: {url: ubicacion, caption: texto}})}
    const sendVideoReply = async (ubicacion, texto) => {client.sendMessage(from, {video: {url:ubicacion, caption: texto}},{quoted: msg})}
    const sendImageReply = async (ubicacion, texto) => {client.sendMessage(from, {image: {url:ubicacion}, caption: texto},{quoted: msg})}
    const sendAudio = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4' })}
    const sendAudioReply = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4' },{quoted: msg})}
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
    const isListResp = messageType === 'listResponseMessage'
    const isInviteLink = messageType === 'groupInviteMessage'

 /*----------TIPOS DE MENSAJES RESPONDIDOS----------*/
    const quoted = isQuoted && msg.message.extendedTextMessage.contextInfo.quotedMessage != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage : false
    var quotedMessageType = Object.keys(quoted)[0]
    const isQuotedText = quotedMessageType === 'conversation'
    const isQuotedImage = quotedMessageType === 'imageMessage'
    const isQuotedVideo = quotedMessageType === 'videoMessage'
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

/*----------OBTENCION DE MENSAJES----------*/
    //const body = isText && msg.message[messageType] ? msg.message[messageType] : isImage && msg.message[messageType].caption ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption ? msg.message[messageType].caption : isQuoted && msg.message[messageType].text ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : isReaction && msg.message[messageType].text ? msg.message[messageType].text : ''
    const cmd = isText && msg.message[messageType].startsWith(prefix) ? msg.message[messageType] : isImage && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption :  isQuoted && msg.message[messageType].text.startsWith(prefix) ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId.startsWith(prefix) ? msg.message[messageType].selectedButtonId : isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message.listResponseMessage.singleSelectReply.selectedRowId: isReaction && msg.message[messageType].text ? msg.message[messageType].text : '' 
    const chats = isText && msg.message[messageType] ? msg.message[messageType]: isQuoted && msg.message[messageType].text ? msg.message[messageType].text : ''
    const selectedButton = isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : ''
    const selectedList = isListResp && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    //const responseList = msg.message.listResponseMessage != null ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : false
    
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
    const groupMembers = isGroup ? groupMetadata.participants : ''
    const groupAdmins = isGroup ? getAdmins(groupMembers) : ''
    const groupParticipants = isGroup ? getAll(groupMembers) : ''
    const isEphemeral = isGroup ? groupMetadata.ephemeralDuration != undefined : ''
    const isRestrict = isGroup ? groupMetadata.restrict : false
    const restrict = isRestrict ? 'administradores' : 'todos'
    const isAnnounce = isGroup ? groupMetadata.announce : false
    const announce = isAnnounce ? 'administradores' : 'todos'
    //const groupEphemeral = isEphemeral ? groupMetadata.ephemeralDuration : ''
    const isTag = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant != '' : false
    const isMentionedTag = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : false
    
/*-------------INCLUSORES---------------*/
    const isOwner = ownerNumber.includes(sender)
    const isAdmin = groupAdmins.includes(sender)
    const isBotAdmin = groupAdmins.includes(numeroBotId)
    //const isRegistered = checkRegisteredUser(sender)
    const isBot = numeroBotId.includes(sender)
    const isBanned = banned.includes(sender)
    const isVip = vip.includes(sender)
    const isPremium = premium.includes(sender)
    const isBienvenida = isGroup ?  bienvenida.includes(from) : false
    const isDespedida = isGroup ?  despedida.includes(from) : false
    const isPromote = isGroup ?  promote.includes(from) : false
    const isDemote = isGroup ?  demote.includes(from) : false
    const isLevelingOn = isGroup ? _leveling.includes(from) : false
    //const isAfkOn = isGroup ? checkAfkUser(sender, _afk) : false
    const isAntienlaces = isGroup ? antienlaces.includes(from) : false
    const isLeveling = isGroup ? _leveling.includes(from) : false
    const isAntiarabes = isGroup ? antiarabes.includes(from) : false
    const isAntifakes = isGroup ? antifakes.includes(from) : false
    const isPrivate = banChats == true;
    const isOnlyvip = isGroup ? onlyvip.includes(from) : false
    const isOnlypremium = isGroup ? onlypremium.includes(from) : false
    const isOnlyowner = isGroup ? onlyowner.includes(from) : false
    const isOnlyadmins = isGroup ? onlyadmins.includes(from) : false
    const isNsfw = isGroup ? nsfw.includes(from) : false
    const isPorno = isGroup ? porno.includes(from) : false
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
        await sendText(reactionEmoji)
    }*/

/*----------FUNCIONES----------*/
    if (isGroup && isLinkWa && isAntienlaces && !isAdmin && !isOwner && isBotAdmin) await client.groupParticipantsUpdate(from,[sender], 'remove')
    
/*----------RESPUESTAS DE LA BOT----------*/
    if (!isMe && (chats).toLowerCase().startsWith('....')){
        escribiendo(from)
        sendReply(`Hola *${pushname}* ${saludo}`)
    }
    if (!isCmd && (chats).toLowerCase().startsWith('di ')){
        const tts = gtts('es')
        const text = chats.slice(3)
        tts.save('./media/temp/di.mp3', text, async function(){
            grabando(from)
            await sendPttReply('./media/temp/di.mp3').catch(e => {return sendReply('¡ERROR 404! Not Found.')})
        })
    }
/*----------CHAT BOTS----------*/
    if (!isCmd && chats.toLowerCase().startsWith('simi ')){
        const text = chats.slice(5)
        const {data} = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=es&cf=false`)
        const {success} = data
        await escribiendo(from)
        sendReply(success)
    }
    if (!isCmd && chats.toLowerCase().startsWith('cortana ')){
        await escribiendo(from)
        const text = chats.slice(8)
        await translate(text, 'en').then(async (res)=>{
            const {data} = await axios.get(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(res)}&key=l00NB88YglRMSz69Uocfjgvq1`)
            const {response} = data
            log(decodeURIComponent(response))
            await translate(response, 'es').then(async (res) =>{ await escribiendo(from); await sendReply(res) }).catch(e => sendReply('¡ERROR 404!')) }).catch(e => sendReply('¡ERROR 405!'))
    }
/*----------ENVIO DE AUDIOS----------*/
    if (!isCmd && chats.toLowerCase() === 'yamete'){
        const yamete = ['./media/yamete/1.mp3','./media/yamete/2.mp3','./media/yamete/3.mp3','./media/yamete/4.mp3']
        var randomy = yamete[Math.floor(Math.random() * yamete.length)]
        grabando(from)
        sendPttReply(randomy)
    }
    if (!isCmd && chats.toLowerCase() === 'onichan'){
        const onichan = ['./media/oniichan/oniichan1.mp3','./media/oniichan/oniichan2.mp3','./media/oniichan/oniichan3.mp3','./media/oniichan/oniichan4.mp3','./media/oniichan/oniichan5.mp3','./media/oniichan/oniichan6.mp3','./media/oniichan/oniichan7.mp3','./media/oniichan/oniichan8.mp3','./media/oniichan/oniichan9.mp3','./media/oniichan/oniichan10.mp3','./media/oniichan/oniichan11.mp3','./media/oniichan/oniichan12.mp3','./media/oniichan/oniichan13.mp3','./media/oniichan/oniichan14.mp3','./media/oniichan/oniichan15.mp3','./media/oniichan/oniichan16.mp3','./media/oniichan/oniichan17.mp3','./media/oniichan/oniichan18.mp3','./media/oniichan/oniichan19.mp3','./media/oniichan/oniichan20.mp3','./media/oniichan/oniichan21.mp3','./media/oniichan/oniichan22.mp3','./media/oniichan/oniichan23.mp3','./media/oniichan/oniichan24.mp3','./media/oniichan/oniichan25.mp3','./media/oniichan/oniichan26.mp3','./media/oniichan/oniichan27.mp3']
        var randomo = onichan[Math.floor(Math.random() * onichan.length)]
        grabando(from)
        sendPttReply(randomo)
    }
    if (!isCmd && chats.toLowerCase() === 'baka'){
        const baka = ['./media/baka/1.mp3','./media/baka/2.mp3','./media/baka/3.mp3','./media/baka/4.mp3','./media/baka/5.mp3','./media/baka/6.mp3','./media/baka/7.mp3']
        var randomb = baka[Math.floor(Math.random() * baka.length)]
        grabando(from)
        sendPttReply(randomb)
    }
    if (!isCmd && chats.toLowerCase() === 'ara'){
        const ara = ['./media/ara/1.mp3', './media/ara/2.mp3', './media/ara/3.mp3', './media/ara/4.mp3', './media/ara/5.mp3', './media/ara/6.mp3', './media/ara/7.mp3', './media/ara/8.mp3', './media/ara/9.mp3', './media/ara/10.mp3', './media/ara/11.mp3', './media/ara/12.mp3', './media/ara/13.mp3', './media/ara/14.mp3', './media/ara/15.mp3', './media/ara/16.mp3', './media/ara/17.mp3', './media/ara/18.mp3', './media/ara/19.mp3', './media/ara/20.mp3', './media/ara/21.mp3']
        var randoma = ara[Math.floor(Math.random() * ara.length)]
        grabando(from)
        sendPttReply(randoma)
    }
    if (!isCmd && chats.toLowerCase() === 'nya'){
        const nya = ['./media/nya/1.mp3', './media/nya/2.mp3', './media/nya/3.mp3', './media/nya/4.mp3', './media/nya/5.mp3', './media/nya/6.mp3', './media/nya/7.mp3', './media/nya/8.mp3', './media/nya/9.mp3', './media/nya/10.mp3', './media/nya/11.mp3', './media/nya/12.mp3', './media/nya/13.mp3', './media/nya/14.mp3', './media/nya/15.mp3', './media/nya/16.mp3', './media/nya/17.mp3', './media/nya/18.mp3', './media/nya/19.mp3', './media/nya/20.mp3', './media/nya/21.mp3', './media/nya/22.mp3', './media/nya/23.mp3', './media/nya/24.mp3', './media/nya/25.mp3', './media/nya/26.mp3', './media/nya/27.mp3', './media/nya/28.mp3']
        var randomn = nya[Math.floor(Math.random() * nya.length)]
        grabando(from)
        sendPttReply(randomn)
    }

/*---------FUNCION AUTOSTICKERS------ */
    if (isMedia && isGroup && isAutostickers){
        if(isImage){
            let media = './media/temp/autsticker.png'
            await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)})
            sendSticker(client,msg,from,media)
        }
        if(isVideo){
            if(msg.message.videoMessage.seconds > 10) return
            let media = './media/temp/sticker.mp4'
            await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)})
            sendSticker(client,msg,from,media)
        }
    }
/*----------LOGS----------*/    
    if (isCmd && !isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname), 'a las: ' ,color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }
    if (isCmd && isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname),  'en',  color (groupName),  'a las: ',color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }
    //if (!isOwner && command) return sendReply('{\n    modo desarrollador activado\n}')

    client.chatModify({markRead: true, lastMessages: [msg]}, from)
    switch(command){
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
                if (!isQuoted) return sendReply('_*Borrador de Mensajes*_\n\n_Si deseas eliminar mensajes enviados por mi, por favor etiqueta mi mensaje con el comando *!borrar*_')
                const identificacion = msg.message.extendedTextMessage.contextInfo.participant
                if (identificacion != numeroBotId) return sendReply('_*Borrador de Mensajes*_\n\n_!Error! lamentablemente en este momento aun no esta disponible la funcion de eliminar mensajes de otras personas_\n\n_Si deseas eliminar mensajes enviados por mi, por favor etiqueta mi mensaje con el comando *!eliminar*_')              
                const stanza = msg.message.extendedTextMessage.contextInfo.stanzaId
                const key = {remoteJid: from,id: stanza, fromMe: true }
                client.sendMessage(from, { delete: key })
                log('_Proceso finalizado, he eliminado mi mensaje correctamente._')
                break
        case 'chat':// MUTEAR, DESMUTEAR, ARCHIVAR, DESARCHIVAR, LEER, MARCAR COMO NO LEIDO
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
        case 'bimage':
            const bimage = [ {buttonId: 'id1', buttonText: {displayText: 'Boton 1'}, type: 1}, {buttonId: 'id2', buttonText: {displayText: 'Boton 2'}, type: 1}, {buttonId: 'id3', buttonText: {displayText: 'Boton 3'}, type: 1} ]
            sendButtonImage('./media/test.jpg','¡Hola! Esto es una prueba de envio de botones con imagen',bimage)
            break
        case 'btext':
            const btext = [ {buttonId: 'id1', buttonText: {displayText: 'Boton 1'}, type: 1}, {buttonId: 'id2', buttonText: {displayText: 'Boton 2'}, type: 1}, {buttonId: 'id3', buttonText: {displayText: 'Boton 3'}, type: 1} ]
            sendButtonText('¡Hola! Esto es una prueba de envio de botones',btext)
            break
        case 'tbt':
            const tbt = [ {index: 1, urlButton: {displayText: 'Suscribete', url: 'https://www.youtube.com/c/KingAndrewYT'}}, {index: 2, callButton: {displayText: 'llamame', phoneNumber: '+57 322 8125090'}}, {index: 3, quickReplyButton: {displayText: 'Menu', id: '!menu'}}]
            sendTemplateButtonText('¡Hola! Esto es una prueba de envio de una plantilla de botones', tbt)
            break
        case 'tbi':
            const tbi = [ {index: 1, urlButton: {displayText: 'Suscribete', url: 'https://www.youtube.com/c/KingAndrewYT'}}, {index: 2, callButton: {displayText: 'llamame', phoneNumber: '+57 322 8125090'}}, {index: 3, quickReplyButton: {displayText: 'Menu', id: '!menu'}}]
            sendTemplateButtonImage('./media/text.jpg', '¡Hola! Esto es una prueba de envio de plantilla de botones con imagen', tbi)
            break
        case'infolink':case'entrar':case'infogrupo':case'anular':case'enlace':case'crear':case'añadir':case'eliminar':case'promover':case'degradar':case'nombre':case'descripcion':case'perfil':case'mutear':case'desmutear':case'lockdesc':case'unlockdesc':case'salir':
            //if (!isGroup) return sendReply('esta opcion solo esta disponible dentro de grupos')
            groupSettings(msg, client, q, args, command)
            break
        case 'gpperfil':
            groupSettings(msg, client, q, args, command)
            break
        case 'acceppt':
            const inviteMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage.groupInviteMessage
            await client.groupAcceptInviteV4(from, inviteMessage)        
            break
        case 'admins':
            sendReplyWithMentions(q, groupAdmins)
        break
        case 'todos':
            sendReplyWithMentions(q, groupParticipants)
            break
    default:
    }
/*---------ACTIVADORES----------*/
    switch (command){
        case 'antienlaces': case 'antilink': case 'antilinks':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const antienlacesCheck = isAntienlaces ? 'funcion antienlaces *ACTIVADA* \n\n!antienlaces off para desactivar' : 'funcion antienlaces *DESACTIVADA* \n\n!antienlaces on para activar'
            if (args.length == 0){ if (isAntienlaces) return sendReply(antienlacesCheck) ; if (!isAntienlaces) return sendReply(antienlacesCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                antienlaces.push(from)
                writeFileSync('./JSONS/antienlaces.json', stringify(antienlaces))
                sendReply('[ACTIVANDO ANTIENLACES]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = antienlaces.indexOf(from)
                antienlaces.splice(del, 1)
                writeFileSync('./JSONS/antienlaces.json', stringify(antienlaces))
                sendReply('[DESACTIVANDO ANTIENLACES]')
            }
        break
        case 'simi': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const simiCheck = isSimi ? 'funcion simi *ACTIVADA* \n\n!simi off para desactivar' : 'funcion simi *DESACTIVADA* \n\n!simi on para activar'
            if (args.length == 0){ if (isSimi) return sendReply(simiCheck) ; if (!isSimi) return sendReply(simiCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                simi.push(from)
                writeFileSync('./JSONS/simi.json', stringify(simi))
                sendReply('[ACTIVANDO SIMI]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = simi.indexOf(from)
                simi.splice(del, 1)
                writeFileSync('./JSONS/simi.json', stringify(simi))
                sendReply('[DESACTIVANDO SIMI]')
            }
        break
        case 'bienvenida': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const bienvenidaCheck = isBienvenida ? 'funcion bienvenida *ACTIVADA* \n\n!bienvenida off para desactivar' : 'funcion bienvenida *DESACTIVADA* \n\n!bienvenida on para activar'
            if (args.length == 0){ if (isBienvenida) return sendReply(bienvenidaCheck) ; if (!isBienvenida) return sendReply(bienvenidaCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                bienvenida.push(from)
                writeFileSync('./JSONS/bienvenida.json', stringify(bienvenida))
                sendReply('[ACTIVANDO BIENVENIDA]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = bienvenida.indexOf(from)
                bienvenida.splice(del, 1)
                writeFileSync('./JSONS/bienvenida.json', stringify(bienvenida))
                sendReply('[DESACTIVANDO BIENVENIDA]')
            }
        break
        case 'despedida': 
        if (!isGroup) return sendReply(alertas.groups)
        if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
        if (!isBotAdmin) return sendReply(alertas.adminbot)
        const despedidaCheck = isDespedida ? 'funcion despedida *ACTIVADA* \n\n!despedida off para desactivar' : 'funcion despedida *DESACTIVADA* \n\n!despedida on para activar'
        if (args.length == 0){ if (isDespedida) return sendReply(despedidaCheck) ; if (!isDespedida) return sendReply(despedidaCheck)}
        if (args[0] == 'on' || args[0] == '1') {
            despedida.push(from)
            writeFileSync('./JSONS/despedida.json', stringify(despedida))
            sendReply('[ACTIVANDO DESPEDIDA]')
        }
        if (args[0] == 'off' || args[0] == '0') {
            let del = despedida.indexOf(from)
            despedida.splice(del, 1)
            writeFileSync('./JSONS/despedida.json', stringify(despedida))
            sendReply('[DESACTIVANDO DESPEDIDA]')
        }
    break
        case 'cortana': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const cortanaCheck = isCortana ? 'funcion cortana *ACTIVADA* \n\n!cortana off para desactivar' : 'funcion cortana *DESACTIVADA* \n\n!cortana on para activar'
            if (args.length == 0){ if (isCortana) return sendReply(cortanaCheck) ; if (!isCortana) return sendReply(cortanaCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                cortana.push(from)
                writeFileSync('./JSONS/cortana.json', stringify(cortana))
                sendReply('[ACTIVANDO CORTANA]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = cortana.indexOf(from)
                cortana.splice(del, 1)
                writeFileSync('./JSONS/cortana.json', stringify(cortana))
                sendReply('[DESACTIVANDO CORTANA]')
            }
        break
        case 'nsfw': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const nsfwCheck = isNsfw ? 'funcion nsfw *ACTIVADA* \n\n!nsfw off para desactivar' : 'funcion nsfw *DESACTIVADA* \n\n!nsfw on para activar'
            if (args.length == 0){ if (isNsfw) return sendReply(nsfwCheck) ; if (!isNsfw) return sendReply(nsfwCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                nsfw.push(from)
                writeFileSync('./JSONS/nsfw.json', stringify(nsfw))
                sendReply('[ACTIVANDO NSFW]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = nsfw.indexOf(from)
                nsfw.splice(del, 1)
                writeFileSync('./JSONS/nsfw.json', stringify(nsfw))
                sendReply('[DESACTIVANDO NSFW]')
            }
        break
        case 'promovidos': case 'promoted': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const promoteCheck = isPromote ? 'funcion promote *ACTIVADA* \n\n!promote off para desactivar' : 'funcion promote *DESACTIVADA* \n\n!promote on para activar'
            if (args.length == 0){ if (isPromote) return sendReply(promoteCheck) ; if (!isPromote) return sendReply(promoteCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                promote.push(from)
                writeFileSync('./JSONS/promote.json', stringify(promote))
                sendReply('[ACTIVANDO PROMOTE]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = promote.indexOf(from)
                promote.splice(del, 1)
                writeFileSync('./JSONS/promote.json', stringify(promote))
                sendReply('[DESACTIVANDO PROMOTE]')
            }
        break
        case 'degradados': case 'demoted': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const demoteCheck = isDemote ? 'funcion demote *ACTIVADA* \n\n!demote off para desactivar' : 'funcion demote *DESACTIVADA* \n\n!demote on para activar'
            if (args.length == 0){ if (isDemote) return sendReply(demoteCheck) ; if (!isDemote) return sendReply(demoteCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                demote.push(from)
                writeFileSync('./JSONS/demote.json', stringify(demote))
                sendReply('[ACTIVANDO DEMOTE]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = demote.indexOf(from)
                demote.splice(del, 1)
                writeFileSync('./JSONS/demote.json', stringify(demote))
                sendReply('[DESACTIVANDO DEMOTE]')
            }
        break
        case 'antiarabes': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const antiarabesCheck = isAntiarabes ? 'funcion antiarabes *ACTIVADA* \n\n!antiarabes off para desactivar' : 'funcion antiarabes *DESACTIVADA* \n\n!antiarabes on para activar'
            if (args.length == 0){ if (isAntiarabes) return sendReply(antiarabesCheck) ; if (!isAntiarabes) return sendReply(antiarabesCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                antiarabes.push(from)
                writeFileSync('./JSONS/antiarabes.json', stringify(antiarabes))
                sendReply('[ACTIVANDO ANTIARABES]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = antiarabes.indexOf(from)
                antiarabes.splice(del, 1)
                writeFileSync('./JSONS/antiarabes.json', stringify(antiarabes))
                sendReply('[DESACTIVANDO ANTIARABES]')
            }
        break
        case 'antifakes': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const antifakesCheck = isAntifakes ? 'funcion antifakes *ACTIVADA* \n\n!antifakes off para desactivar' : 'funcion antifakes *DESACTIVADA* \n\n!antifakes on para activar'
            if (args.length == 0){ if (isAntifakes) return sendReply(antifakesCheck) ; if (!isAntifakes) return sendReply(antifakesCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                antifakes.push(from)
                writeFileSync('./JSONS/antifakes.json', stringify(antifakes))
                sendReply('[ACTIVANDO ANTIFAKES]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = antifakes.indexOf(from)
                antifakes.splice(del, 1)
                writeFileSync('./JSONS/antifakes.json', stringify(antifakes))
                sendReply('[DESACTIVANDO ANTIFAKES]')
            }
        break
        case 'autostickers': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            const autostickersCheck = isAutostickers ? 'funcion autostickers *ACTIVADA* \n\n!autostickers off para desactivar' : 'funcion autostickers *DESACTIVADA* \n\n!autostickers on para activar'
            if (args.length == 0){ if (isAutostickers) return sendReply(autostickersCheck) ; if (!isAutostickers) return sendReply(autostickersCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                autostickers.push(from)
                writeFileSync('./JSONS/autostickers.json', stringify(autostickers))
                sendReply('[ACTIVANDO AUTOSTICKERS]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = autostickers.indexOf(from)
                autostickers.splice(del, 1)
                writeFileSync('./JSONS/autostickers.json', stringify(autostickers))
                sendReply('[DESACTIVANDO AUTOSTICKERS]')
            }
        break
        case 'leveling': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const levelingCheck = isLeveling ? 'funcion leveling *ACTIVADA* \n\n!leveling off para desactivar' : 'funcion leveling *DESACTIVADA* \n\n!leveling on para activar'
            if (args.length == 0){ if (isLeveling) return sendReply(levelingCheck) ; if (!isLeveling) return sendReply(levelingCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                leveling.push(from)
                writeFileSync('./JSONS/leveling.json', stringify(leveling))
                sendReply('[ACTIVANDO LEVELING]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = leveling.indexOf(from)
                leveling.splice(del, 1)
                writeFileSync('./JSONS/leveling.json', stringify(leveling))
                sendReply('[DESACTIVANDO LEVELING]')
            }
        break
        case 'porno': 
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            const pornoCheck = isPorno ? 'funcion porno *ACTIVADA* \n\n!porno off para desactivar' : 'funcion porno *DESACTIVADA* \n\n!porno on para activar'
            if (args.length == 0){ if (isPorno) return sendReply(pornoCheck) ; if (!isPorno) return sendReply(pornoCheck)}
            if (args[0] == 'on' || args[0] == '1') {
                porno.push(from)
                writeFileSync('./JSONS/porno.json', stringify(porno))
                sendReply('[ACTIVANDO PORNO]')
            }
            if (args[0] == 'off' || args[0] == '0') {
                let del = porno.indexOf(from)
                porno.splice(del, 1)
                writeFileSync('./JSONS/porno.json', stringify(porno))
                sendReply('[DESACTIVANDO PORNO]')
            }
        break
        default:
    }

/*---------AJUSTES DE GRUPOS----------*/
    switch(command){
        case 'abrir': case 'open': case 'desmutear':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (!isAnnounce) return sendReply(toast.notannounce(pushname))
            client.groupSettingUpdate(from, 'not_announcement')
            break
        case 'cerrar': case 'close': case 'mutear':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (isAnnounce) return sendReply(toast.announce(pushname))
            await client.groupSettingUpdate(from, 'announcement')
            break
        case 'bloquear': case 'lock':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (isRestrict) return sendReply(toast.desclock(pushname))
            client.groupSettingUpdate(from, 'locked')
            break
        case 'desbloquear': case 'unlock':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (!isRestrict) return sendReply(toast.descunclock(pushname))
            client.groupSettingUpdate(from, 'unlocked')
            break
        case 'promover': case 'promote':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (isTag){
                const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.prombot(pushname))
                if (groupAdmins.includes(etiqueta)) return sendReply(toast.promadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido promovido al rango *Administrador*`
                return client.groupParticipantsUpdate(from,[etiqueta], 'promote').then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } 
            if (isMentionedTag){
                const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                if (!groupParticipants.includes(mentionedTag)) return sendReply(toast.outGroup(pushname))
                if (mentionedTag == numeroBotId) return sendReply(toast.prombot(pushname))
                if (groupAdmins.includes(isMentionedTag)) return sendReply(toast.promadmin(pushname))
                const text = `[Success] => El usuario *@${mentionedTag.split("@")[0]}* ha sido promovido al rango *Administrador*`
                return client.groupParticipantsUpdate(from,[mentionedTag], 'promote').then(()=>{sendReplyWithMentions(text, [mentionedTag])})
            }
            if (args.length == 0) return sendReplyWithMentions(toast.noprom(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.prombot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.promadmin(pushname))
            const text = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido promovido al rango *Administrador*`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'promote'); sendReplyWithMentions(text, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'degradar': case 'demote':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (isTag){
                const etiqueta = msg.message.extendedTextMessage.contextInfo.participant
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (!groupParticipants.includes(etiqueta)) return sendReply(toast.outGroup(pushname))
                if (etiqueta == numeroBotId) return sendReply(toast.dembot(pushname))
                if (!groupAdmins.includes(etiqueta)) return sendReply(toast.demadmin(pushname))
                const text = `[Success] => El usuario *@${etiqueta.split("@")[0]}* ha sido degradado rango *Administrador*`
                return client.groupParticipantsUpdate(from,[etiqueta], 'demote').then(()=>{sendReplyWithMentions(text, [etiqueta])})
            } 
            if (isMentionedTag){
                const mentionedTag = msg.message.extendedTextMessage.contextInfo.mentionedJid
                if (!groupParticipants.includes(mentionedTag)) return sendReply(toast.outGroup(pushname))
                if (mentionedTag == numeroBotId) return sendReply(toast.dembot(pushname))
                if (!groupAdmins.includes(isMentionedTag)) return sendReply(toast.demadmin(pushname))
                const text = `[Success] => El usuario *@${mentionedTag.split("@")[0]}* ha sido degradado del rango *Administrador*`
                return client.groupParticipantsUpdate(from,[mentionedTag], 'demote').then(()=>{sendReplyWithMentions(text, [mentionedTag])})
            }
            if (args.length == 0) return sendReplyWithMentions(toast.nodem(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.dembot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.demadmin(pushname))
            const demtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido degradado del rango *Administrador*`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'demote'); sendReplyWithMentions(demtext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'eliminar': case 'remove': case 'kick':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
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
                if (!groupParticipants.includes(mentionedTag)) return sendReply(toast.outGroup(pushname))
                if (mentionedTag == numeroBotId) return sendReply(toast.rembot(pushname))
                if (groupAdmins.includes(isMentionedTag)) return sendReply(toast.remadmin(pushname))
                const text = `[Success] => El usuario *@${mentionedTag.split("@")[0]}* ha sido eliminado del grupo`
                return client.groupParticipantsUpdate(from,[mentionedTag], 'remove').then(()=>{sendReplyWithMentions(text, [mentionedTag])})
            }
            if (args.length == 0) return sendReplyWithMentions(toast.norem(informacion), ['573228125090@s.whatsapp.net'])
            if (!groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.rembot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.remadmin(pushname))
            const remtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido eliminado del grupo`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'remove'); sendReplyWithMentions(remtext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'añadir': case 'add':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
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
                if (groupParticipants.includes(mentionedTag)) return sendReply(toast.onGroup(pushname))
                if (mentionedTag == numeroBotId) return sendReply(toast.addbot(pushname))
                if (groupAdmins.includes(isMentionedTag)) return sendReply(toast.addadmin(pushname))
                const text = `[Success] => El usuario *@${mentionedTag.split("@")[0]}* ha sido añadido al grupo`
                return client.groupParticipantsUpdate(from,[mentionedTag], 'add').then(()=>{sendReplyWithMentions(text, [mentionedTag])})
            }
            if (args.length == 0) return sendReplyWithMentions(toast.noadd(informacion), ['573228125090@s.whatsapp.net'])
            if (groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.addbot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.addadmin(pushname))
            const addtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido añadido al grupo`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add'); sendReplyWithMentions(addtext, [`${regExp}@s.whatsapp.net`])}})
            break
        case 'enlace': case 'link':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            await client.groupInviteCode(from).then((res) => {sendReply(toast.link(res))})
            break
        case 'anular': case 'revoke':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            client.groupRevokeInvite(from).then(()=>{sendReply(toast.revoke())})
            break
        case 'salir': case 'leave':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            client.groupLeave(from).then(() => {client.sendMessage(sender, {text: toast.leave()}, {quoted: msg})})
            break
        case 'entrar': case 'join':
            if (!isOwner) return sendReply(alertas.owners)
            if (args.length == 0) return sendReply(toast.nojoin(informacion))
            if (!isWaLink) return sendReply(toast.nowalink())
            await client.groupAcceptInvite(linkWA).then(() => {sendReply(toast.join())}).catch(() => {sendReply(toast.nowalink())})
            break
        case 'nombre': case 'name':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (args.length == 0) return sendReply(toast.name())
            if (q.length > 35 ) return sendReply(toast.longname())
            client.groupUpdateSubject(from, q).then(()=>{sendReply(toast.namechanged(groupName))})
            break
        case 'descripcion': case 'desc': case 'description':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (args.length == 0) return sendReply(toast.desc())
            if (q.length > 522 ) return sendReply(toast.longdesc())
            client.groupUpdateDescription(from, q).then(() => {sendReply(toast.descchanged(groupDesc))})
            break
        case 'icono': case 'icon':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
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
            if (!isOwner) return sendReply(alertas.owners)
            if (args.length == 0) return sendReply(toast.groupcreate(informacion))
            if(q.length > 35 ) return sendReply(toast.longname())
            await client.groupCreate(q, [sender]).then(res => { client.groupInviteCode(res.id).then((link) => {client.sendMessage(res.id, {text: toast.joinmessage()});sendReply(toast.gpcreate(link))})})
            break
    }

/*---------MINTAKE - TEXTPRO----------*/
    switch(command){
        case 'textpro':
            if (args.length == 0) return sendReply(menu.textpro1(informacion))
            if (args[0] == 1) return mintake.textpro('https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Gradient Neon Light', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 2) return mintake.textpro('https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('BlackPink', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 3) return mintake.textpro('https://textpro.me/create-a-summer-neon-light-text-effect-online-1076.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Summer Neon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 4) return mintake.textpro('https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Light Glow Sliced', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 5) return mintake.textpro('https://textpro.me/neon-light-glitch-text-generator-online-1063.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Neon Light Glitch', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 6) return mintake.textpro('https://textpro.me/create-neon-light-on-brick-wall-online-1062.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Neon Light On Brick', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 7) return mintake.textpro('https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Glowing Neon Light', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 8) return mintake.textpro('https://textpro.me/online-thunder-text-effect-generator-1031.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('Thunder', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 9) return mintake.textpro('https://textpro.me/create-3d-neon-light-text-effect-online-1028.html', [q.slice(2)]).then(res => {sendImageReply(res, toast.mintake('3D Neon Light', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 10) return mintake.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glitch Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 11) return mintake.textpro('https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Devil Wings', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 12) return mintake.textpro('https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Futuristic Tecnology', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 13) return mintake.textpro('https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Galaxy', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 14) return mintake.textpro('https://textpro.me/holographic-3d-text-effect-975.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Holographic 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 15) return mintake.textpro('https://textpro.me/neon-text-effect-online-963.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 16) return mintake.textpro('https://textpro.me/happ-new-year-card-firework-gif-959.html', [q.slice(3)]).then(res => {sendGifReply(res, toast.mintake('New Year Card', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 17) return mintake.textpro('https://textpro.me/firework-sparkle-text-effect-930.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Firework Sparkle', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 18) return mintake.textpro('https://textpro.me/rainbow-equalizer-text-effect-902.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Equializer', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 19) return mintake.textpro('https://textpro.me/matrix-style-text-effect-online-884.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Matrix', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 20) return mintake.textpro('https://textpro.me/neon-light-text-effect-online-882.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Wall', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 21) return mintake.textpro('https://textpro.me/create-thunder-text-effect-online-881.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Lightning', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 22) return mintake.textpro('https://textpro.me/neon-text-effect-online-879.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Neon Simple', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 23) return mintake.textpro('https://textpro.me/bokeh-text-effect-876.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bokeh', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 24) return mintake.textpro('https://textpro.me/green-neon-text-effect-874.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Green Neon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 25) return mintake.textpro('https://textpro.me/free-advanced-glow-text-effect-873.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Butterfly Neon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 26) return mintake.textpro('https://textpro.me/create-decorative-gold-glitter-3d-text-effect-online-1089.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Gold Glitter', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 27) return mintake.textpro('https://textpro.me/create-a-rusted-metal-text-effect-online-1087.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Rushed Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 28) return mintake.textpro('https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Golden Valentine', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 29) return mintake.textpro('https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Golden', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 30) return mintake.textpro('https://textpro.me/create-a-3d-luxury-metallic-text-effect-for-free-1071.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Luxury Metallic', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 31) return mintake.textpro('https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('White Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 32) return mintake.textpro('https://textpro.me/create-text-effects-arcane-tv-series-online-1067.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Arcane', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 33) return mintake.textpro('https://textpro.me/3d-golden-ancient-text-effect-online-free-1060.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Ancient', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 34) return mintake.textpro('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Deep Sea', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 35) return mintake.textpro('https://textpro.me/create-a-metallic-text-effect-free-online-1041.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Black Metalic', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 36) return mintake.textpro('https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glossy Metalic', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 36) return sendReply(toast.noeffect())
            if (args[0] == 37) return mintake.textpro('https://textpro.me/create-a-transformer-text-effect-online-1035.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Transformers', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 38) return mintake.textpro('https://textpro.me/create-harry-potter-text-effect-online-1025.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Harry Potter', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 38) return sendReply(toast.noeffect())
            if (args[0] == 39) return mintake.textpro('https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Glossy Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 40) return mintake.textpro('https://textpro.me/metal-dark-gold-text-effect-984.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Dark Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 41) return mintake.textpro('https://textpro.me/metal-purple-dual-effect-973.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Purple Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 42) return mintake.textpro('https://textpro.me/deluxe-silver-text-effect-970.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Deluxe Silver', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 43) return mintake.textpro('https://textpro.me/color-full-luxury-metal-text-effect-969.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Metal Luxury', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 43) return sendReply(toast.noeffect())
            if (args[0] == 44) return mintake.textpro('https://textpro.me/glossy-blue-metal-text-effect-967.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Glossy Blue Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 45) return mintake.textpro('https://textpro.me/deluxe-gold-text-effect-966.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Deluxe Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 46) return mintake.textpro('https://textpro.me/metal-dark-gold-text-effect-online-939.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Dark Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 47) return mintake.textpro('https://textpro.me/steel-text-effect-online-921.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Steel', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 48) return mintake.textpro('https://textpro.me/rusty-metal-text-effect-860.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Rusty Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 49) return mintake.textpro('https://textpro.me/metal-rainbow-text-effect-854.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Metal Rainbow', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 50) return mintake.textpro('https://textpro.me/shiny-metal-text-effect-852.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Shiny Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 51) return mintake.textpro('https://textpro.me/hot-metal-text-effect-843.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Hot Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 52) return mintake.textpro('https://textpro.me/eroded-metal-text-effect-834.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Eroded Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 53) return mintake.textpro('https://textpro.me/blue-metal-text-effect-831.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 54) return mintake.textpro('https://textpro.me/black-metal-text-effect-829.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Black Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 55) return mintake.textpro('https://textpro.me/3d-glowing-metal-text-effect-828.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Glowing Metal', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 56) return mintake.textpro('https://textpro.me/3d-chrome-text-effect-827.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Chrome', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 57) return mintake.textpro('https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Orange Juice', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 58) return mintake.textpro('https://textpro.me/create-berry-text-effect-online-free-1033.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Berry', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 59) return mintake.textpro('https://textpro.me/chocolate-cake-text-effect-890.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Chocolate', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 60) return mintake.textpro('https://textpro.me/strawberry-text-effect-online-889.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Strawberry', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 61) return mintake.textpro('https://textpro.me/bread-text-effect-online-887.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bread', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 62) return mintake.textpro('https://textpro.me/honey-text-effect-868.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Honey', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 63) return mintake.textpro('https://textpro.me/biscuit-text-effect-858.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Biscuit', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 64) return mintake.textpro('https://textpro.me/bagel-text-effect-857.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Bagel', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 65) return mintake.textpro('https://textpro.me/pink-candy-text-effect-832.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Candy', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 66) return mintake.textpro('https://textpro.me/create-a-quick-sparkling-diamonds-text-effect-1077.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Diamond', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 67) return mintake.textpro('https://textpro.me/3d-luxury-gold-text-effect-online-1003.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Luxury Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 68) return mintake.textpro('https://textpro.me/peridot-stone-text-effect-916.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Peridot Stone', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 69) return mintake.textpro('https://textpro.me/pink-sparkling-jewelry-text-effect-899.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Pink Sparkling Jewerly', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 70) return mintake.textpro('https://textpro.me/marble-text-effect-863.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Marble', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 71) return mintake.textpro('https://textpro.me/abstra-gold-text-effect-859.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Abstra Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 72) return mintake.textpro('https://textpro.me/purple-gem-text-effect-853.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Purple Gem', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 73) return mintake.textpro('https://textpro.me/red-jewelry-text-effect-849.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Red Jewerly', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 74) return mintake.textpro('https://textpro.me/blue-glitter-text-effect-841.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Glitter', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 75) return mintake.textpro('https://textpro.me/blue-gem-text-effect-830.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Gem', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 76) return mintake.textpro('https://textpro.me/hexa-golden-text-effect-842.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Hexa Golden', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 77) return mintake.textpro('https://textpro.me/create-a-3d-stone-text-effect-online-for-free-1073.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Stone', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 78) return mintake.textpro('https://textpro.me/free-online-country-flag-3d-text-effect-generator-1052.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Country Flag 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 78) return sendReply(toast.noeffect())
            if (args[0] == 79) return mintake.textpro('https://textpro.me/create-american-flag-3d-text-effect-online-1051.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('American Flag 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 80) return mintake.textpro('https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Rainbow Calligraphy', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 81) return mintake.textpro('https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Water Pipe', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 82) return mintake.textpro('https://textpro.me/create-space-text-effects-online-free-1042.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Space 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 83) return mintake.textpro('https://textpro.me/online-3d-gradient-text-effect-generator-1020.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Gradient', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 84) return mintake.textpro('https://textpro.me/create-3d-realistic-text-effect-on-the-beach-online-1018.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Beach', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 84) return sendReply(toast.noeffect())
            if (args[0] == 85) return mintake.textpro('https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Paper Cut Multicolor', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 86) return mintake.textpro('https://textpro.me/3d-underwater-text-effect-generator-online-1013.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Underwater', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 87) return mintake.textpro('https://textpro.me/3d-gradient-text-effect-online-free-1002.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Gradient', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 88) return mintake.textpro('https://textpro.me/minion-text-effect-3d-online-978.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Minion 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 89) return mintake.textpro('https://textpro.me/new-year-cards-3d-by-name-960.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('New Year Card', args[0]))}).catch((err) => logerror(err))
            //if (args[0] == 90) return mintake.textpro('https://textpro.me/create-avatar-gold-online-956.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Avatar Gold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 90) return sendReply(toast.noeffect())
            if (args[0] == 91) return mintake.textpro('https://textpro.me/3d-box-text-effect-online-880.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Box', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 92) return mintake.textpro('https://textpro.me/color-led-display-screen-text-effect-1059.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Color Led', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 93) return mintake.textpro('https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('3D Sci-Fi', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 94) return mintake.textpro('https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Blue Circuit', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 95) return mintake.textpro('https://textpro.me/create-science-fiction-text-effect-online-free-1038.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Science Fiction', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 96) return mintake.textpro('https://textpro.me/robot-r2-d2-text-effect-903.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Star Wars', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 97) return mintake.textpro('https://textpro.me/sci-fi-text-effect-855.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Sci-Fi', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 98) return mintake.textpro('https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('Wonderful Graffiti', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 99) return mintake.textpro('https://textpro.me/happy-new-year-2022-greeting-3d-card-1058.html', [q.slice(3)]).then(res => {sendImageReply(res, toast.mintake('New Year Greeting', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 100) return mintake.textpro('https://textpro.me/christmas-tree-text-effect-online-free-1057.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmass Tree', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 101) return mintake.textpro('https://textpro.me/create-christmas-candy-cane-text-effect-1056.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmas Candy', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 102) return mintake.textpro('https://textpro.me/3d-christmas-text-effect-by-name-1055.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Christmas', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 103) return mintake.textpro('https://textpro.me/sparkles-merry-christmas-text-effect-1054.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sparkles Christmas', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 104) return mintake.textpro('https://textpro.me/xmas-cards-3d-online-942.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Xmas Cards 3D', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 105) return mintake.textpro('https://textpro.me/chrismast-gift-text-effect-869.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Chistmas Gift', args[0]))}).catch((err) => logerror(err))

            if (args[0] == 106) return mintake.textpro('https://textpro.me/create-3d-pottery-text-effect-online-1088.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Pottery', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 107) return mintake.textpro('https://textpro.me/create-artistic-typography-online-1086.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Artistic Typography', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 108) return mintake.textpro('https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Summer Beach', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 109) return mintake.textpro('https://textpro.me/create-a-blackpink-logo-decorated-with-roses-online-free-1080.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Pink', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 110) return mintake.textpro('https://textpro.me/create-blackpink-style-logo-effects-online-1079.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Pink', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 111) return mintake.textpro('https://textpro.me/3d-business-sign-text-effect-1078.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Business', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 112) return mintake.textpro('https://textpro.me/create-carved-stone-text-effect-online-1074.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Carved Stone', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 113) return mintake.textpro('https://textpro.me/create-3d-style-glass-text-effect-online-1072.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Style Glass', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 114) return mintake.textpro('https://textpro.me/create-3d-giraffe-text-effect-online-1069.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Giraffe', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 115) return mintake.textpro('https://textpro.me/make-a-batman-logo-online-free-1066.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Batman Logo', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 116) return mintake.textpro('https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Halloween Skeleton', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 117) return mintake.textpro('https://textpro.me/create-a-sketch-text-effect-online-1044.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sketch Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 118) return mintake.textpro('https://textpro.me/video-game-classic-8-bit-text-effect-1037.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Video Game Classic', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 119) return mintake.textpro('https://textpro.me/create-green-horror-style-text-effect-online-1036.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Green Horror', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 120) return mintake.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Magma Hot', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 121) return mintake.textpro('https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Stone Cracked', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 122) return mintake.textpro('https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Embossed Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 123) return mintake.textpro('https://textpro.me/broken-glass-text-effect-free-online-1023.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Broken Glass', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 124) return mintake.textpro('https://textpro.me/create-art-paper-cut-text-effect-online-1022.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Paper Cut', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 125) return mintake.textpro('https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Watercolor', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 126) return mintake.textpro('https://textpro.me/write-text-on-foggy-window-online-free-1015.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Foggy Windows', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 127) return mintake.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Black Bear', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 128) return mintake.textpro('https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Christmas Holiday', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 129) return mintake.textpro('https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Snow Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 130) return mintake.textpro('https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Cloud text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 131) return mintake.textpro('https://textpro.me/create-blackpink-logo-style-online-1001.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Blackpink', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 132) return mintake.textpro('https://textpro.me/create-realistic-cloud-text-effect-online-free-999.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Realistic Cloud', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 133) return mintake.textpro('https://textpro.me/create-a-cloud-text-effect-in-the-sky-online-997.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Cloud Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 134) return mintake.textpro('https://textpro.me/write-in-sand-summer-beach-free-online-991.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Summer Beach', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 135) return mintake.textpro('https://textpro.me/sand-writing-text-effect-online-990.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Writing', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 136) return mintake.textpro('https://textpro.me/sand-engraved-3d-text-effect-989.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Sand Engraved', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 137) return mintake.textpro('https://textpro.me/create-a-summery-sand-writing-text-effect-988.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Summery Sand', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 138) return mintake.textpro('https://textpro.me/foil-balloon-text-effect-for-birthday-987.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Balloon Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 139) return mintake.textpro('https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('3D Glue', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 140) return mintake.textpro('https://textpro.me/1917-style-text-effect-online-980.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('1917', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 141) return mintake.textpro('https://textpro.me/double-exposure-text-effect-black-white-976.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Double Exposure', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 142) return mintake.textpro('https://textpro.me/glossy-carbon-text-effect-965.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Glossy Carbon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 143) return mintake.textpro('https://textpro.me/fabric-text-effect-online-964.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Fabric', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 144) return mintake.textpro('https://textpro.me/fullcolor-balloon-text-effect-958.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Full Color Balloon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 145) return mintake.textpro('https://textpro.me/blood-text-on-the-frosted-glass-941.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Blood Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 146) return mintake.textpro('https://textpro.me/halloween-fire-text-effect-940.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Halloween Fire', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 147) return mintake.textpro('https://textpro.me/create-logo-joker-online-934.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Joker Logo', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 148) return mintake.textpro('https://textpro.me/wicker-text-effect-online-932.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Wicker', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 149) return mintake.textpro('https://textpro.me/natural-leaves-text-effect-931.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Natural Leaves', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 150) return mintake.textpro('https://textpro.me/skeleton-text-effect-online-929.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Skeleton', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 151) return mintake.textpro('https://textpro.me/red-foil-balloon-text-effect-928.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Red Foil', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 152) return mintake.textpro('https://textpro.me/ultra-gloss-text-effect-online-920.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Ultra Gloss', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 153) return mintake.textpro('https://textpro.me/denim-text-effect-online-919.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Denim', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 154) return mintake.textpro('https://textpro.me/decorate-purple-text-effect-917.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Decorate Purple', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 155) return mintake.textpro('https://textpro.me/rock-text-effect-online-915.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Rock', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 156) return mintake.textpro('https://textpro.me/lava-text-effect-online-914.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Lava', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 157) return mintake.textpro('https://textpro.me/purple-glass-text-effect-912.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Glass', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 158) return mintake.textpro('https://textpro.me/purple-shiny-glass-text-effect-906.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Shiny', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 159) return mintake.textpro('https://textpro.me/captain-america-text-effect-905.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Captain America', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 160) return mintake.textpro('https://textpro.me/toxic-text-effect-online-901.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Toxic Effect', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 161) return mintake.textpro('https://textpro.me/purple-glass-text-effect-online-892.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Purple Glass', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 162) return mintake.textpro('https://textpro.me/decorative-glass-text-effect-891.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Decorative Glass', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 163) return mintake.textpro('https://textpro.me/koi-fish-text-effect-online-888.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Koi Fish', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 164) return mintake.textpro('https://textpro.me/horror-blood-text-effect-online-883.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Horror Blood', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 165) return mintake.textpro('https://textpro.me/road-warning-text-effect-878.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Road Warning', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 166) return mintake.textpro('https://textpro.me/dropwater-text-effect-872.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Dropwater', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 167) return mintake.textpro('https://textpro.me/break-wall-text-effect-871.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Break Wall', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 168) return mintake.textpro('https://textpro.me/plastic-bag-drug-text-effect-867.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Plastic Bag', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 169) return mintake.textpro('https://textpro.me/horror-gift-text-effect-866.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Horror Gift', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 170) return mintake.textpro('https://textpro.me/marble-slabs-text-effect-864.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Marble Slaps', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 171) return mintake.textpro('https://textpro.me/ice-cold-text-effect-862.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Ice Cold', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 172) return mintake.textpro('https://textpro.me/fruit-juice-text-effect-861.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Fruit Juice', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 173) return mintake.textpro('https://textpro.me/wood-text-effect-856.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Wood Text', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 174) return mintake.textpro('https://textpro.me/carbon-text-effect-833.html', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Carbon', args[0]))}).catch((err) => logerror(err))
            if (args[0] == 175) return mintake.textpro('https://textpro.me/misc-style-c29-p6', [q.slice(4)]).then(res => {sendImageReply(res, toast.mintake('Misc Style', args[0]))}).catch((err) => logerror(err))
            break
    }
/*---------JUEGOS----------*/
    switch(command){
        case 'akinator': case 'aki':
            if (sender !== usuarioJugando && haIniciado == true) return sendReply(toast.noPlayer())
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
            const text = toast.akiPlay(pushname)
            const image = `https://es.akinator.com/bundles/elokencesite/images/akinator.png?v94`
            const buttons = [{  buttonId:`${prefix}akinator start`, buttonText:{ displayText:'[ JUGAR ]' }, type:1  }]
            return sendButtonImage(image, text, buttons)        
    }

/*--------STICKERS Y MAS-------- */
    switch(command){
        case 'sticker':
            if(isQuotedImage){
                let media = './media/temp/sticker.png'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                sendSticker(client,msg,from,media)
            } 
            if (isImage){
                let media = './media/temp/sticker.png'
                await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)})
                sendSticker(client,msg,from,media)
            }
            if (isQuotedVideo ){
                if(msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 10 ) return sendReply(toast.longSticker())
                let media = './media/temp/sticker.mp4'
                const encmedia = parse(stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                await downloadMediaMessage(encmedia).then(async res => {await writeFile(media, res)})
                sendSticker(client,msg,from,media)
            }
            if (isVideo){
                if(msg.message.videoMessage.seconds > 10) return sendReply(toast.longSticker())
                let media = './media/temp/sticker.mp4'
                await downloadMediaMessage(msg).then(async res => {await writeFile(media, res)})
                sendSticker(client,msg,from,media)
            }
            break
    }
/*--------COMANDOS TEST-------- */
    switch(command){
        case 'sacame':
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            if (args[0] == 'si') { sendReply(toast.sacamesi(pushname, tipoDeUsr));await client.groupParticipantsUpdate(from,[sender], 'remove').then(()=>{sendReply('[Eliminacion Finalizada]')})}
            if (args[0] == 'no') return sendReply(toast.sacameno())
            const texto = toast.sacame(pushname, tipoDeUsr)
            const buttons = [{buttonId: `${prefix}sacame si`, buttonText: {displayText: 'SI⚠️'}, type: 1}, {buttonId: `${prefix}sacame no`, buttonText: {displayText: 'NO✅'}, type: 1}]
            sendButtonText(texto, buttons)
            break
        case 'casino':
            try {
                var casino = ['- 🍒 ', '- 🎃 ', '- 🍐 ', '- 🍋 ', '- 7️⃣ ', '- 🍇 ']
                var resultado = randomizer(casino) + randomizer(casino) + randomizer(casino) + '-'
                if (resultado == '- 🍒 - 🍒 - 🍒 -' || resultado == '- 🍐 - 🍐 - 🍐 -' || resultado == '- 🎃 - 🎃 - 🎃 -' || resultado == '- 🍋 - 🍋 - 🍋 -' || resultado == '- 7️⃣ - 7️⃣ - 7️⃣ -' || resultado == '- 🍇 - 🍇 - 🍇 -')  { 
                    await sendReply(toast.casinoWin(resultado)) 
                } else { 
                    await sendReply(toast.casinoLoose(resultado, looser)) 
                }
            } catch (e){
                return logerror(e)
            }
            break
        case 'dado': case 'dados':
            const dados = ['./media/resources/dados/1.webp','./media/resources/dados/2.webp','./media/resources/dados/3.webp','./media/resources/dados/4.webp','./media/resources/dados/5.webp','./media/resources/dados/6.webp']
            let random = dados[Math.floor(Math.random() * dados.length)]
            sentSticker(random)
            break        
    }
}