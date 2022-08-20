/*----------MODULOS----------*/
const { downloadMediaMessage, WA_DEFAULT_EPHEMERAL, downloadContentFromMessage, getContentType } = require ('@adiwajshing/baileys')
const { writeFile } =  require ('fs/promises')
const moment = require ('moment-timezone')
const gtts = require ('node-gtts')
const axios = require ('axios')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const translate = require ('./funciones/traductor.js')
const funciones = require ('./funciones')
const utilidades = require('./utilidades')
const { color} = utilidades
const toast = require('./JSONS/toasts.js')

let {inWA, groupSettings, getAdmins, getAll} = funciones
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
const randomizer = async (value) => {const random = value[Math.floor(Math.random() * value.length)]; return random}

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
    const sendButtonImage = async (imagen, texto, botones = []) => { await client.sendMessage(from, {image: {url: imagen}, caption: texto, footer: copyright, buttons: botones, headerType: 4})}
    const sendTemplateButtonText = async (texto, botones) => { await client.sendMessage(from, { text: texto, footer: copyright, templateButtons: botones}) }
    const sendTemplateButtonImage = async (imagen, texto, botones) => { await client.sendMessage(from, { text: texto, footer: copyright, templateButtons: botones, image: {url: imagen}}) }
    const sendListText = async (titulo, texto,textoBoton = []) => { client.sendMessage(from, { text: texto, footer: copyright, title: titulo, buttonText: textoBoton, sections }) }
    const sendReaction = async (texto, para) => {client.sendMessage(para, { react: { text: texto, key: msg.key } })}
    const sendGif = async (ubicacion, texto) => {client.sendMessage(from, {video: fs.readFileSync(ubicacion), caption: texto, gifPlayback: true})}
    const sendGifReply = async (ubicacion, texto) => {client.sendMessage(from, {video: fs.readFileSync(ubicacion), caption: texto, gifPlayback: true},{quoted: msg})}
    const sendVideo = async (ubicacion, texto) => {client.sendMessage(from, {video: {url:ubicacion, caption: texto}})}
    const sendVideoReply = async (ubicacion, texto) => {client.sendMessage(from, {video: {url:ubicacion, caption: texto}},{quoted: msg})}
    const sendImageReply = async (ubicacion, texto) => {client.sendMessage(from, {image: {url:ubicacion}, caption: texto},{quoted: msg})}
    const sendAudio = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4' })}
    const sendAudioReply = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4' },{quoted: msg})}
    const sendPresence = async (presence) => {await client.sendPresenceUpdate(presence, from)} //recording -  paused - composing - unavailable - available
    const sendPtt = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4', ptt: true})}
    const sendPttReply = async (ubicacion) => {client.sendMessage(from, { audio: { url: ubicacion }, mimetype: 'audio/mp4', ptt: true},{quoted: msg})}
    const grabando = async (x) => {await client.sendPresenceUpdate('recording', x)}
    const escribiendo = async (x) => {await client.sendPresenceUpdate('composing', x)}

/*--------------TIPOS DE MENSAJES--------------*/
    var messageType = Object.keys(msg.message)[0]
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
    const isListResp = messageType === 'ListResponseMessage'
    const isInviteLink = messageType === 'groupInviteMessage'

 /*----------TIPOS DE MENSAJES RESPONDIDOS----------*/
    const quoted = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
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
    const body = isText && msg.message[messageType] ? msg.message[messageType] : isImage && msg.message[messageType].caption ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption ? msg.message[messageType].caption : isQuoted && msg.message[messageType].text ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : isListResp && msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId ? msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId : isReaction && msg.message[messageType].text ? msg.message[messageType].text : ''
    const cmd = isText && msg.message[messageType].startsWith(prefix) ? msg.message[messageType] : isImage && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption :  isQuoted && msg.message[messageType].text.startsWith(prefix) ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId.startsWith(prefix) ? msg.message[messageType].selectedButtonId : isListResp && msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId: isReaction && msg.message[messageType].text ? msg.message[messageType].text : '' 
    const chats = isText && msg.message[messageType] ? msg.message[messageType]: isQuoted && msg.message[messageType].text ? msg.message[messageType].text : ''
    const selectedButton = isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : ''
    const selectedList = isListResp && msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId ? msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId : ''

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
    const isRestrict = isGroup ? groupMetadata.restrict : ''
    const restrict = isRestrict ? 'administradores' : 'todos'
    const isAnnounce = groupMetadata.announce
    const announce = isAnnounce ? 'administradores' : 'todos'
    //const groupEphemeral = isEphemeral ? groupMetadata.ephemeralDuration : ''
    const isTag = isQuoted ? msg.message.extendedTextMessage.contextInfo.participant != '' : ''
    const isMentionedTag = isQuoted ? msg.message.extendedTextMessage.contextInfo.mentionedJid : false
    
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

/*----------LOGS----------*/    
    if (isCmd && !isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname), 'a las: ' ,color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }
    if (isCmd && isGroup) { log(color('[CMD]', 'magenta'),  color(`${command}[${args.length}]`),  'de', color(pushname),  'en',  color (groupName),  'a las: ',color(moment().tz('America/Bogota').format('h:mm a'), 'yellow') ) }
    if (!isOwner && command) return sendReply('{\n    modo desarrollador activado\n}')
    
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
                /*if (args.length == 1) return sendReply('mensaje vacio, por favor escribe un nombre')
                if (q.slice(7).length > 15) return sendReply('a')
                client.updateProfileName(q.slice(7))*/
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
            if (!isGroup) return sendReply('esta opcion solo esta disponible dentro de grupos')
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
            if (!isBotAdmin) return sendReply(alertas.adminbot)
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
            await client.groupSettingUpdate(from, 'not_announcement')
            break
        case 'cerrar': case 'close': case 'mutear':
            if (!isGroup) return sendReply(alertas.groups)
            if (!isAdmin && !isOwner && !isVip) return sendReply(alertas.admins)
            if (!isBotAdmin) return sendReply(alertas.adminbot)
            await client.groupSettingUpdate(from, 'announcement')
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
            if (args.length == 0) return sendReplyWithMentions(toast.noprom(prefix, informacion), ['573228125090@s.whatsapp.net'])
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
            if (args.length == 0) return sendReplyWithMentions(toast.nodem(prefix, informacion), ['573228125090@s.whatsapp.net'])
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
            if (args.length == 0) return sendReplyWithMentions(toast.norem(prefix, informacion), ['573228125090@s.whatsapp.net'])
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
            if (args.length == 0) return sendReplyWithMentions(toast.noadd(prefix, informacion), ['573228125090@s.whatsapp.net'])
            if (groupParticipants.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.outGroup(pushname))
            if (regExp == numeroBot) return sendReply(toast.addbot(pushname))
            if (groupAdmins.includes(`${regExp}@s.whatsapp.net`)) return sendReply(toast.addadmin(pushname))
            const addtext = `[Success] => El usuario *@${regExp.split("@")[0]}* ha sido añadido al grupo`
            inWA(msg,client,regExp).then(async (res) => { if (res == true){ await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add'); sendReplyWithMentions(addtext, [`${regExp}@s.whatsapp.net`])}})
            break
    }    
}