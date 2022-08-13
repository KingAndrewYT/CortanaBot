/*----------CONSTANTES----------*/
const makeWASocket = require("@adiwajshing/baileys");
const { MessageType, MessageOptions, Mimetype, downloadMediaMessage, getLastMessageInChat, WA_DEFAULT_EPHEMERAL } = require ('@adiwajshing/baileys')
const { text } = require("figlet");
const moment = require ('moment-timezone')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const opciones = require('./config/opciones.js')
const translate = require ('./funciones/traductor.js')
const {info} = opciones
const {color} = require('./utilidades')
const log = console.log;
const error = console.error;

module.exports = async (msg ,client) => {
    const prefix = info.prefix
    var from = msg.key.remoteJid
    const isGroup = from.includes('g.us')
    const isParticipant = from.includes('s.whatsapp.net')
    const numeroBot = client.user.id.split("@")[0].slice(0, -3).concat('@s.whatsapp.net')

/*----------PLANTILLAS BOTONES ETC----------*/
//const botones = [ {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1}, {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1}, {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1} ]        
//const botonTemplate = [ {index: 1, urlButton: {displayText: 'Suscribete', url: 'https://www.youtube.com/c/KingAndrewYT'}}, {index: 2, callButton: {displayText: 'llamame', phoneNumber: '+57 322 8125090'}}, {index: 3, quickReplyButton: {displayText: 'Menu', id: '!menu'}}]
//const listas = [{ title: "Section 1", rows: [ {title: "Option 1", rowId: "option1"}, {title: "Option 2", rowId: "option2", description: "This is a description"} ]}, { title: "Section 2", rows: [ {title: "Option 3", rowId: "option3"}, {title: "Option 4", rowId: "option4", description: "This is a description V2"} ]}]

/*----------ENVIO DE MENSAJES----------*/
    const sendText = async (texto) => {client.sendMessage(from, {text: texto})}
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const sendMentiones = async (texto, menciones) => {await client.sendMessage(from, { text: texto, mentions: [menciones]})}
    const sendLocation = async (latitud, longitud) => {await client.sendMessage(from, {location: {degreesLatitude: latitud, degreesLongitude: longitud}})}
    const sendVcard = async (texto, vcard) =>{client.sendMessage(from, {contacts:{displayName: texto, contacts: [{vcard}]}})}
    const sendButtonText = async (texto, botones = []) => {client.sendMessage(from, {text: texto, footer: info.copyright, buttons: botones, headerType: 1})}
    const sendTemplateButtonText = async (texto, botones) => { await client.sendMessage(from, { text: texto, footer: info.copyright, templateButtons: botones}) }
    const sendListText = async (titulo, texto,textoBoton = []) => { client.sendMessage(from, { text: texto, footer: info.copyright, title: titulo, buttonText: textoBoton, sections }) }
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

/*----------OBTENCION DE MENSAJES----------*/
    const body = isText && msg.message[messageType] ? msg.message[messageType] : isImage && msg.message[messageType].caption ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption ? msg.message[messageType].caption : isQuoted && msg.message[messageType].text ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId ? msg.message[messageType].selectedButtonId : isListResp && msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId ? msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId :  isReaction && msg.message[messageType].text ? msg.message[messageType].text : ''
    const cmd = isText && msg.message[messageType].startsWith(prefix) ? msg.message[messageType] : isImage && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption : isVideo && msg.message[messageType].caption.startsWith(prefix) ? msg.message[messageType].caption :  isQuoted && msg.message[messageType].text.startsWith(prefix) ? msg.message[messageType].text : isButtonResp && msg.message[messageType].selectedButtonId.startsWith(prefix) ? msg.message[messageType].selectedButtonId : isListResp && msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message[messageType].listResponseMessage.singleSelectReply.selectedRowId : ''
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
/*----------COMANDS SIN PREFIJO----------*/
    if (isText && (chats).toLowerCase().startsWith('hola')){
        sendReply(`Hola ${saludo}`)
    }
/*----------FUNCIONES----------*/
    
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
        case 'eliminar': //ELIMINAR MENSAJES ENVIADOS POR EL BOT
                if (!isQuoted) return sendReply('_*Borrador de Mensajes*_\n\n_Si deseas eliminar mensajes enviados por mi, por favor etiqueta mi mensaje con el comando *!eliminar*_')
                const identificacion = msg.message.extendedTextMessage.contextInfo.participant
                if (identificacion != numeroBot) return sendReply('_*Borrador de Mensajes*_\n\n_!Error! lamentablemente en este momento aun no esta disponible la funcion de eliminar mensajes de otras personas_\n\n_Si deseas eliminar mensajes enviados por mi, por favor etiqueta mi mensaje con el comando *!eliminar*_')              
                const stanza = msg.message.extendedTextMessage.contextInfo.stanzaId
                const key = {remoteJid: from,id: stanza, fromMe: true }
                client.sendMessage(from, { delete: key })
                log('_Proceso finalizado, he eliminado mi mensaje correctamente._')
                break
        case 'chat':// MUTEAR, DESMUTEAR, ARCHIVAR, DESARCHIVAR, LEER, MARCAR COMO NO LEIDO
            try {
                if (args.length == 0) return sendReply('funciones disponibles para administracion del chat:\n\n1. !chat mute\n2. !chat unmute \n3. !chat archive\n4. chat unarchive\n5. !chat read\n6.0')
                const timestamp = new Date(new Date().getTime()+ 8*60*60*1000).getTime()
                if (q2 == 'archive') return await client.chatModify({archive: true, lastMessages:[msg]}, from)
                if (q2 == 'unarchive') return await client.chatModify({archive: false, lastMessages:[msg]}, from)
                if (args[0] == 'mute') return client.chatModify({ mute: timestamp },from, [])
                if (q2 == 'unmute') return await client.chatModify({ mute: null },from, [])
                if (q2 == 'read') return await client.chatModify({markRead: true, lastMessages: [msg]}, from)
                if (q2 == 'unread') return await client.chatModify({markRead: false, lastMessages: [msg]}, from)
                if (q2 == 'pin') return await client.chatModify({ pin: true },from, [])
                if (q2 == 'unpin') return await client.chatModify({ pin: false },from, [])
                if (q2 == 'delete') return await client.chatModify({delete: true, lastMessages:[msg]}, from)
                //if (args[0] == 'nombre') return await client.chatModify({pushNameSetting: q},from, [])
                //if (q2 == 'clear') return await client.chatModify({clear:true}, from)
                sendReply('funciones disponibles para administracion del chat:\n\n1. !chat mute\n2. !chat unmute \n3. !chat archive\n4. chat unarchive\n5. !chat read\n6.0')
            } catch (e){
                log(e)
            }
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
            try {
                if(args.length == 0 ) return sendReply('Si deseas confirmar la existencia de un numero en la plafaforma de WhatsApp, envia un mensaje con el comando *!check + numero de telefono con codigo de pais*\n\nEjemplo: !check 573228125090')
                if(isNaN(q)) return sendReply('¡Error! solo se aceptan caracteres numericos')
                if(q.length >= 15) return sendReply('¡Error! el numero ingresado supera los 15 caracteres')
                const [result] = await client.onWhatsApp(q)
                if(result == undefined) return sendReply(`¡Error! el numero *${q}* no existe en whatsapp`)
                return sendReply(`¡Busqueda finalizada!\nEl numero ${q} si existe en whatsapp.\n\nclick en el siguiente enlace para ir a su chat directamente: https://wa.me/${q}`)
            } catch (e) {
                log(e)
            }
            break
        case 'info': //EXTRAER FOTO DE PERFIL Y ESTADO DE UNA PERSONA
            if(args.length == 0 ) return sendReply('Si deseas obtener informacion de una cuenta de whatsapp como su foto de perfil y estado por favor envia un mensaje con el comando *!info + numero de whatsapp con codigo de pais*\n\nEjemplo: !info 573228125090')
            if(isNaN(q)) return sendReply('¡Error! solo se aceptan caracteres numericos')
            if(q.length >= 15) return sendReply('¡Error! el numero ingresado supera los 15 caracteres')
            const [result] = await client.onWhatsApp(q)
            if(result == undefined) return sendReply(`¡Error! el numero *${q}* no existe en whatsapp`)
            const status = await client.fetchStatus(`${q}@s.whatsapp.net`)
            const profile = await client.profilePictureUrl(`${q}@s.whatsapp.net`, 'image')
            const texto = `*INFORMACION DE ${q}*\n\n_Estado: ${status.status}_\n_Actualizado el: ${status.setAt}_`
            sendImageReply(profile, texto)
            break
        case 'change':
            if(args.length == 0) return sendReply('Si deseas realizar cambios en mi perfil o estado envia un mensaje con los siguientes comandos.\n\n1. !change profile + imagen (para cambiar mi foto de perfil)\n2. !change status + texto (para cambiar mi informacion de estado)\n3. !change name + nombre (para cambiar mi nombre)')
            if(args[0].startsWith('status')) {
                if(args.length == 1) return sendReply('mensaje vacio, por favor escribe un estado')
                if(q.slice(7).length > 256) return sendReply('Lo siento, el texto ingresado supera los 256 caracteres permitidos por la aplicacion, por favor intenta de nuevo con un estado mas corto.')
                client.updateProfileStatus(q.slice(7)).then(()=>{sendReply('¡GENIAL! He cambiado mi estado correctamente.')})
            }
            if(args[0].startsWith('name')){
                log(client)
                const name = 'KingAndrew'
                //await client.updateProfileName(name)
                /*if(args.length == 1) return sendReply('mensaje vacio, por favor escribe un nombre')
                if(q.slice(7).length > 256) return sendReply('a')
                client.updateProfileName(q.slice(7)).then(()=>{sendReply('¡GENIAL! He cambiado mi nombre correctamente.')})*/
            }
            break        
        default:
    }
}