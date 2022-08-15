/*----------CONSTANTES----------*/
const { AnyWASocket , MessageType, MessageOptions, Mimetype, downloadMediaMessage, getLastMessageInChat, WA_DEFAULT_EPHEMERAL,downloadContentFromMessage } = require ('@adiwajshing/baileys')
const { writeFile } =  require ('fs/promises')
const moment = require ('moment-timezone')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const opciones = require('./config/opciones.js')
const translate = require ('./funciones/traductor.js')
const funciones = require ('./funciones')
const {inWA} = funciones
const {info} = opciones
const log = console.log;
const error = console.error;

const time = moment.tz('America/Bogota').format('H:mm:ss a')
const date = moment.tz('America/Bogota').format('DD/MM/YY')
const timedate = moment.tz('America/Bogota').format('DD/MM/YY h:mm a')

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
    const sendButtonImage = async (imagen, texto, botones = []) => { await client.sendMessage(from, {image: {url: imagen}, caption: texto, footer: info.copyright, buttons: botones, headerType: 4})}
    const sendTemplateButtonText = async (texto, botones) => { await client.sendMessage(from, { text: texto, footer: info.copyright, templateButtons: botones}) }
    const sendTemplateButtonImage = async (imagen, texto, botones) => { await client.sendMessage(from, { text: texto, footer: info.copyright, templateButtons: botones, image: {url: imagen}}) }
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
    /*const inWA = async (numero) => {
        const regExp = numero.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
        if(isNaN(regExp)) return sendReply('¡Error! solo se aceptan caracteres numericos')
        if(regExp.length >= 15) return sendReply('¡Error! el numero ingresado supera los 15 caracteres')
        const [result] = await client.onWhatsApp(regExp)
        if(result == undefined) return sendReply(`¡Error! el numero ingresado no existe en whatsapp, por favor verifica e intenta nuevamente.`)
        return result.exists
    }*/
    
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
                    log(texto.replace(/undefined/g, 'No Disponible'))
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
                    await client.updateProfilePicture(numeroBot, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
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
                    await client.updateProfilePicture(numeroBot, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
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
                    if(jid == numeroBot) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'block')
                } else {
                    if(args.length == 0 ) return sendReply('')
                    inWA(msg,client,q).then(async (res) => {if(res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if(numero == numeroBot) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(numero, 'block')
                }
            }
            break
        case 'unblock':
            if(!isGroup) return client.updateBlockStatus(from, 'block')
            if(isGroup){
                if(isQuoted) {
                    const jid  = msg.message.extendedTextMessage.contextInfo.participant
                    if(jid == numeroBot) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
                    client.updateBlockStatus(jid, 'unblock')
                } else {
                    if(args.length == 0 ) return sendReply('por vavor ingresa el numero de telefono despues del comando')
                    inWA(msg,client,q).then(async (res) => {if(res != true)return})
                    const numero = q+'@s.whatsapp.net'
                    if(numero == numeroBot) return sendReply('¡[EROR]! No me puedo bloquear a mi misma')
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
        case 'crear':
            if(args.length == 0) return
            if(q2 == 'create') {
                const group = await client.groupCreate('pruebas de programacion', ['573228125090@s.whatsapp.net'])
                await client.sendMessage(group.id, {text: `Hola a todos XD`})
                sendText(`He creado el grupo correctamente con el siguiente id: ${group.id}`)
            }
            break
        case 'group':
            if(!isGroup) return sendReply('esta opcion solo esta disponible dentro de grupos')
            if(args.length == 0) return sendReply('opciones disponibles "add","remove","promote","demote"')
            if (args[0] == 'add') {
                const regExp = q.slice(4).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres añadir al grupo')
                inWA(regExp).then(async (res) => { 
                    if(res == true){
                        await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add')
                    }
                })
                return
            }
            if (args[0] == 'remove') {
                const regExp = q.slice(7).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres eliminar del grupo')
                inWA(regExp).then(async (res) => { 
                    if(res == true){
                        await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'remove')
                    }
                })
                return
            }
            if (args[0] == 'promote') {
                const regExp = q.slice(8).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres promover a administrador(a)')
                inWA(regExp).then(async (res) => { 
                    if(res == true){
                        await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'promote')
                    }
                })
                return
            }
            if (args[0] == 'demote') {
                const regExp = q.slice(7).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
                if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres degradar de administrador(a)')
                inWA(regExp).then(async (res) => { 
                    if(res == true){
                        await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'demote')
                    }
                })
                return
            }
            sendReply('¡Error! Por favor elige una opcion correcta')
            break
            default:
    }
}