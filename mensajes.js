/*----------MODULOS----------*/
const { downloadMediaMessage, WA_DEFAULT_EPHEMERAL, downloadContentFromMessage } = require ('@adiwajshing/baileys')
const { writeFile } =  require ('fs/promises')
const moment = require ('moment-timezone')
const gtts = require ('node-gtts')
const axios = require ('axios')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const translate = require ('./funciones/traductor.js')
const funciones = require ('./funciones')

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
const alertas = parse(readFileSync('./config/alertas.json'))
const info = parse(readFileSync('./config/configs.json'))
let {numeroCreador, nombreCreador, nombreBot, copyright, igCreador, fbCreador, ytCreador, discordCreador, prefix, banChats, nopref, onepref, multipref } = info

module.exports = async (msg ,client) => {
    const isMe = msg.key.fromMe
    var from = msg.key.remoteJid
    const isGroup = from.includes('g.us')
    const isParticipant = from.includes('s.whatsapp.net')
    const numeroBotId = client.user.id.split("@")[0].slice(0, -3).concat('@s.whatsapp.net')
    const numeroBot = client.user.id.split("@")[0].slice(0, -3)
    const nombreBot = client.user.name
    const ownerNumber = `${numeroCreador}@s.whatsapp.net`
    const statusBroadcast = 'status@broadcast'
    const myGroupId = '120363028009957173@g.us'

/*----------PLANTILLAS BOTONES ETC----------*/
    //const botones = [ {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1}, {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1}, {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1} ]        
    //const botonTemplate = [ {index: 1, urlButton: {displayText: 'Suscribete', url: 'https://www.youtube.com/c/KingAndrewYT'}}, {index: 2, callButton: {displayText: 'llamame', phoneNumber: '+57 322 8125090'}}, {index: 3, quickReplyButton: {displayText: 'Menu', id: '!menu'}}]
    //const listas = [{ title: "Section 1", rows: [ {title: "Option 1", rowId: "option1"}, {title: "Option 2", rowId: "option2", description: "This is a description"} ]}, { title: "Section 2", rows: [ {title: "Option 3", rowId: "option3"}, {title: "Option 4", rowId: "option4", description: "This is a description V2"} ]}]

/*----------ENVIO DE MENSAJES----------*/
    const sendText = async (texto) => {client.sendMessage(from, {text: texto})}
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const sendReplyWithMentions = async (texto, menciones) => {await client.sendMessage(from, {text: texto}, {quoted: msg, mentions: [menciones]})}
    const sendTextWithMentions = async (texto, menciones) => {client.sendMessage(from, {text: texto, mentions: [menciones]})}
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

/*--------------IDENTIFICADORES--------------*/
    const sender = msg.key.fromMe ? numeroBotId : isGroup ? msg.key.participant : msg.key.remoteJid
    const pushname = msg.key.fromMe ? msg.pushName :  msg.pushName ? msg.pushName : 'Usuario Desconocido'
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
    const groupEphemeral = isEphemeral ? groupMetadata.ephemeralDuration : ''
    
/*----------------------------*/
    const isOwner = ownerNumber.includes(sender)
    const isAdmin = groupAdmins.includes(sender)
    const isLinkWa = chats.includes('chat.whatsapp.com/')
    const isBotAdmin = groupAdmins.includes(numeroBotId)
/*----------------------------*/
    

/*----------VARIABLES----------*/
    const horario = moment().format('HH')
    var saludo = 'feliz media noche 🌃' 
    if (horario >= '01' && horario <= '04') { var saludo = 'feliz madrugada 🌃'}
    if (horario >= '05' && horario <= '07') { var saludo = 'feliz inicio de dia 🌥️'}
    if (horario >= '08' && horario <= '11') { var saludo = 'buenos dias 🌤️'}
    if (horario >= '12' && horario <= '17') { var saludo = 'buenas tardes🌇'}
    if (horario >= '18' && horario <= '23') { var saludo = 'buenas noches 🌃'}
    
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
    if(isGroup && isLinkWa && !isAdmin && !isOwner && isBotAdmin) await client.groupParticipantsUpdate(from,[sender], 'remove')
    
/*----------RESPUESTAS DE LA BOT----------*/
    if (!isMe && (chats).toLowerCase().startsWith('hola ')){
        escribiendo(from)
        sendReply(`Hola ${saludo}`)
    }
    if(!isCmd && (chats).toLowerCase().startsWith('di ')){
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
            await translate(response, 'es').then(async (res) =>{ await sendReply(res) }).catch(e => sendReply('¡ERROR 404!')) }).catch(e => sendReply('¡ERROR 405!'))
    }
/*----------ENVIO DE AUDIOS----------*/
    if (!isCmd && chats.toLowerCase() === 'yamete'){
        const yamete = ['./media/yamete/1.mp3','./media/yamete/2.mp3','./media/yamete/3.mp3','./media/yamete/4.mp3']
        var randomy = yamete[Math.floor(Math.random() * yamete.length)]
        sendPttReply(randomy)
    }
    if (!isCmd && chats.toLowerCase() === 'onichan'){
        const onichan = ['./media/oniichan/oniichan1.mp3','./media/oniichan/oniichan2.mp3','./media/oniichan/oniichan3.mp3','./media/oniichan/oniichan4.mp3','./media/oniichan/oniichan5.mp3','./media/oniichan/oniichan6.mp3','./media/oniichan/oniichan7.mp3','./media/oniichan/oniichan8.mp3','./media/oniichan/oniichan9.mp3','./media/oniichan/oniichan10.mp3','./media/oniichan/oniichan11.mp3','./media/oniichan/oniichan12.mp3','./media/oniichan/oniichan13.mp3','./media/oniichan/oniichan14.mp3','./media/oniichan/oniichan15.mp3','./media/oniichan/oniichan16.mp3','./media/oniichan/oniichan17.mp3','./media/oniichan/oniichan18.mp3','./media/oniichan/oniichan19.mp3','./media/oniichan/oniichan20.mp3','./media/oniichan/oniichan21.mp3','./media/oniichan/oniichan22.mp3','./media/oniichan/oniichan23.mp3','./media/oniichan/oniichan24.mp3','./media/oniichan/oniichan25.mp3','./media/oniichan/oniichan26.mp3','./media/oniichan/oniichan27.mp3']
        var randomo = onichan[Math.floor(Math.random() * onichan.length)]
        sendPttReply(randomo)
    }
    if (!isCmd && chats.toLowerCase() === 'baka'){
        const baka = ['./media/baka/1.mp3','./media/baka/2.mp3','./media/baka/3.mp3','./media/baka/4.mp3','./media/baka/5.mp3','./media/baka/6.mp3','./media/baka/7.mp3']
        var randomb = baka[Math.floor(Math.random() * baka.length)]
        sendPttReply(randomb)
    }
    if (!isCmd && chats.toLowerCase() === 'ara'){
        const ara = ['./media/ara/1.mp3', './media/ara/2.mp3', './media/ara/3.mp3', './media/ara/4.mp3', './media/ara/5.mp3', './media/ara/6.mp3', './media/ara/7.mp3', './media/ara/8.mp3', './media/ara/9.mp3', './media/ara/10.mp3', './media/ara/11.mp3', './media/ara/12.mp3', './media/ara/13.mp3', './media/ara/14.mp3', './media/ara/15.mp3', './media/ara/16.mp3', './media/ara/17.mp3', './media/ara/18.mp3', './media/ara/19.mp3', './media/ara/20.mp3', './media/ara/21.mp3']
        var randoma = ara[Math.floor(Math.random() * ara.length)]
        sendPttReply(randoma)
    }
    if (!isCmd && chats.toLowerCase() === 'nya'){
        const nya = ['./media/nya/1.mp3', './media/nya/2.mp3', './media/nya/3.mp3', './media/nya/4.mp3', './media/nya/5.mp3', './media/nya/6.mp3', './media/nya/7.mp3', './media/nya/8.mp3', './media/nya/9.mp3', './media/nya/10.mp3', './media/nya/11.mp3', './media/nya/12.mp3', './media/nya/13.mp3', './media/nya/14.mp3', './media/nya/15.mp3', './media/nya/16.mp3', './media/nya/17.mp3', './media/nya/18.mp3', './media/nya/19.mp3', './media/nya/20.mp3', './media/nya/21.mp3', './media/nya/22.mp3', './media/nya/23.mp3', './media/nya/24.mp3', './media/nya/25.mp3', './media/nya/26.mp3', './media/nya/27.mp3', './media/nya/28.mp3']
        var randomn = nya[Math.floor(Math.random() * nya.length)]
        sendPttReply(randomn)
    }
    if (!isOwner && command) return sendReply('modo de pruebas activado')
    switch(command){
        case 'repite':
            if(args.length == 0) return sendReply('*⋆⊱∘[✧repite✧]∘⊰⋆*\n_Si deseas que yo repita algo envia un mensaje con el siguiente formato: *${prefix}repite + mensaje que quieres que repita*_\n\n_Ejemplo: *${prefix}repite Hola usuario como estas?*_\n*⋆⊱∘[✧cortana✧]∘⊰⋆*')
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
                    if(args.length == 0) return await sendReply(alerta2)
                    if(args.length == 1) return await sendReply(error1)
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
            if(q2 == 'on') client.sendMessage(from,{disappearingMessagesInChat:  WA_DEFAULT_EPHEMERAL})
            if(q2 == 'off') client.sendMessage(from,{disappearingMessagesInChat:  null})
            if(q2 == '1') client.sendMessage(from,{disappearingMessagesInChat:  24 * 60 * 60})
            if(q2 == '7') client.sendMessage(from,{disappearingMessagesInChat:  7 * 24 * 60 * 60})
            if(q2 == '90') client.sendMessage(from,{disappearingMessagesInChat:  90 * 24 * 60 * 60})
            break
        case 'check': //VERIFICAR SI UN NUMERO EXISTE EN WHATSAPP
            if(args.length == 0 ) return sendReply('por vavor ingresa el numero de telefono despues del comando')
            inWA(msg,client,q).then((res) => {if(res == true){
                const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                return sendReply(`¡Busqueda finalizada!\nEl numero ${regExp} si existe en whatsapp.\n\nclick en el siguiente enlace para ir a su chat directamente: https://wa.me/${regExp}`)
            }})
            break
        case 'info': //EXTRAER FOTO DE PERFIL Y ESTADO DE UNA PERSONA
            if(args.length == 0 ) return sendReply('Si deseas obtener informacion de una cuenta de whatsapp como su foto de perfil y estado por favor envia un mensaje con el comando *!info + numero de whatsapp con codigo de pais*\n\nEjemplo: !info 573228125090')
            inWA(msg,client,q).then(async (res) => { if(res == true){
                const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                const isB = await client.getBusinessProfile(`${regExp}@s.whatsapp.net`)
                if(isB != undefined) {
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
            if(args.length == 0) return sendReply('Si deseas realizar cambios en mi perfil o estado envia un mensaje con los siguientes comandos.\n\n1. !change profile + imagen (para cambiar mi foto de perfil)\n2. !change status + texto (para cambiar mi informacion de estado)\n3. !change name + nombre (para cambiar mi nombre)')
            if(args[0].startsWith('status')) {
                if(args.length == 1) return sendReply('mensaje vacio, por favor escribe un estado')
                if(q.slice(7).length > 256) return sendReply('Lo siento, el texto ingresado supera los 256 caracteres permitidos por la aplicacion, por favor intenta de nuevo con un estado mas corto.')
                client.updateProfileStatus(q.slice(7)).then(()=>{sendReply('¡GENIAL! He cambiado mi estado correctamente.')})
            }
            if(args[0].startsWith('name')){
                log(AnyWASocket)
                /*if(args.length == 1) return sendReply('mensaje vacio, por favor escribe un nombre')
                if(q.slice(7).length > 15) return sendReply('a')
                client.updateProfileName(q.slice(7))*/
                sendReply('[INFORMACIÒN]\n\n_Lamentamos informarle que la funcion de cambio de nombre no esta disponible por el momento, estaremos trabajando para brindarte una solucion lo mas pronto posible._')
            }
            if (args[0].startsWith('profile')){
                //if(!isImage || !isQuotedImage) return sendReply('¡ERROR! por favor envia o etiqueta una imagen con el comando !change profile')
                if(isImage){
                    const buffer = await downloadMediaMessage(msg, 'buffer', {})
                    await writeFile('./media/profile.jpg', buffer)
                    await client.updateProfilePicture(numeroBotId, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
                    //fs.unlinkSync('./media/profile.jpg')
                }
                if(isQuotedImage){
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
            if(!isGroup) return client.updateBlockStatus(from, 'block')
            if(isGroup){
                if(isQuoted) {
                    const jid  = msg.message.extendedTextMessage.contextInfo.participant
                    if(jid == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'block')
                } else {
                    if(args.length == 0 ) return sendReply('')
                    inWA(msg,client,q).then(async (res) => {if(res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if(numero == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(numero, 'block')
                }
            }
            break
        case 'unblock':
            if(!isGroup) return client.updateBlockStatus(from, 'block')
            if(isGroup){
                if(isQuoted) {
                    const jid  = msg.message.extendedTextMessage.contextInfo.participant
                    if(jid == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'unblock')
                } else {
                    if(args.length == 0 ) return sendReply('por vavor ingresa el numero de telefono despues del comando')
                    inWA(msg,client,q).then(async (res) => {if(res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if(numero == numeroBotId) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
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
            if(!isGroup) return sendReply('esta opcion solo esta disponible dentro de grupos')
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
    
}