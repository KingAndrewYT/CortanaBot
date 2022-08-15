const { downloadMediaMessage} = require ('@adiwajshing/baileys')
const fs = require('fs')
const { writeFile } =  require ('fs/promises')
const funciones = require ('../funciones')
const {inWA} = funciones

const groupSettings = async (msg, client,q, args, command)=> {

    var messageType = Object.keys(msg.message)[0]
    const isQuoted = messageType === 'extendedTextMessage'
    const isImage = messageType === 'imageMessage'
    const quoted = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    var quotedMessageType = Object.keys(quoted)[0]
    const isQuotedImage = quotedMessageType === 'imageMessage'

    var from = msg.key.remoteJid
    const numeroBot = client.user.id.split("@")[0].slice(0, -3)
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')

    switch(command){
        case 'añadir':
            if(args.length == 0) return sendReply('por favor envia el numero de la persona que quieres añadir al grupo')
            if(regExp == numeroBot) return sendReply('¡Error! Yo ya hago parte de este grupo')
            inWA(msg,client,regExp).then(async(res)=>{if(res == true) return client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add')}) 
            break
        case 'eliminar':
            if(args.length == 0) return sendReply('por favor envia el numero de la persona que quieres eliminar del grupo')
            if(regExp == numeroBot) return sendReply('¡Error! No me puedo eliminar a mi misma, si deseas que salga del grupo por favor envia el comando !salir')
            inWA(msg,client,regExp).then(async(res)=>{if(res == true) return client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'remove')})
            break
        case 'promover':
            if(args.length == 0) return sendReply('por favor envia el numero de la persona que quieres promover a administrador(a)')
            if(regExp == numeroBot) return sendReply('¡Error! Lo siento, no me puedo promover a mi misma')
            inWA(msg,client,regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'promote') }})
            break
        case 'degradar':
            if(args.length == 0) return sendReply('por favor envia el numero de la persona que quieres degradar de administrador(a)')
            if(regExp == numeroBot) return sendReply('¡Error! Lo siento no me puedo degradar a mi misma')          
            inWA(msg,client,regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'demote') }})
            break
        case 'crear':
            if(args.length == 0) return sendReply('por favor escribe el nombre que tendra el grupo que creare para ti.')
            if(q.length > 35 ) return sendReply('¡Error! El nombre proporcionado excede los 35 caracteres.')
            const group = await client.groupCreate(q, ['573228125090@s.whatsapp.net'])
            await client.sendMessage(group.id, {text: `Hola a todos XD`})
            sendReply(`He creado el grupo correctamente con el siguiente id: ${group.id}`) 
            break
        case 'nombre':
            if(args.length == 1) return sendReply('por favor escribe el nombre que tendra el grupo.')
            if(q.length > 35 ) return sendReply('¡Error! El nombre proporcionado excede los 35 caracteres.')
            client.groupUpdateSubject(from, nombre)
            break
        case 'descripcion':
            if(args.length == 1) return sendReply('por favor escribe la descripcion que tendra el grupo')
            if(q.length > 522 ) return sendReply('¡Error! El nombre proporcionado excede los 522 caracteres.')
            client.groupUpdateDescription(from, desc)
            break
        case 'perfil':    
            if(isImage){
                const buffer = await downloadMediaMessage(msg, 'buffer', {})
                await writeFile('./media/profile.jpg', buffer)
                await client.updateProfilePicture(from, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado la foto de perfil del grupo correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
                fs.unlinkSync('./media/profile.jpg')
                return
            }
            break
        case 'mutear':
            await client.groupSettingUpdate(from, 'announcement')
            break
        case 'desmutear':
            await client.groupSettingUpdate(from, 'not_announcement')
            break
        case 'lockdesc':
            await client.groupSettingUpdate(from, 'locked')
            break
        case 'unlockdesc':
            await client.groupSettingUpdate(from, 'unlocked')
            break
        case 'salir':
            client.groupLeave(from)
            break
        case '':
            break
        case '':
            break
        case '':
            break
    }
}
module.exports = groupSettings