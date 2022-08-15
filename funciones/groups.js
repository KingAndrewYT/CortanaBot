const { downloadMediaMessage} = require ('@adiwajshing/baileys')
const fs = require('fs')
const { writeFile } =  require ('fs/promises')
const funciones = require ('../funciones')
const {inWA} = funciones

const groupSettings = async (msg, client,q, args)=> {

    var messageType = Object.keys(msg.message)[0]
    const isQuoted = messageType === 'extendedTextMessage'
    const isImage = messageType === 'imageMessage'
    const quoted = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    var quotedMessageType = Object.keys(quoted)[0]
    const isQuotedImage = quotedMessageType === 'imageMessage'
    var from = msg.key.remoteJid
    const numeroBot = client.user.id.split("@")[0].slice(0, -3)
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}

    const command = args[0].toLowerCase().trim().split(/ +/)
    const q2 = command.join(' ')
    console.log(q2)

    /*switch(command){
        case 'add':
            const regExp = q.slice(4).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
            if(regExp == numeroBot) return sendReply('¡Error! Yo ya hago parte de este grupo')
            if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres añadir al grupo')
            inWA(regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'add') }})
            break
        case 'remove':
            const regExp = q.slice(7).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
            if(regExp == numeroBot) return sendReply('¡Error! No me puedo eliminar a mi misma, si deseas que salga del grupo por favor envia el comando !salir')
            if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres eliminar del grupo')
            inWA(regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'remove') }})
            break
        case '':
            break
        case '':
            break
        case '':
            break
        case '':
            break
        case '':
            break
        case '':
            break
        case '':
            break
    }*/
    if(args[0] == 'promote') {const regExp = q.slice(8).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
        if(regExp == numeroBot) return sendReply('¡Error! Lo siento, no me puedo promover a mi misma')
        if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres promover a administrador(a)')
        inWA(regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'promote') }})}
    if(args[0] == 'demote') { const regExp = q.slice(7).replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
        if(regExp == numeroBot) return sendReply('¡Error! Lo siento no me puedo degradar a mi misma')
        if(args.length == 1) return sendReply('por favor envia el numero de la persona que quieres degradar de administrador(a)')
        inWA(regExp).then(async (res) => { if(res == true){ return await client.groupParticipantsUpdate(from,[`${regExp}@s.whatsapp.net`], 'demote') }})}
    if(args[0] == 'create') { if(args.length == 1) return sendReply('por favor escribe el nombre que tendra el grupo que creare para ti.')
        const nombre = q.slice(6)
        if(nombre.length > 35 ) return sendReply('¡Error! El nombre proporcionado excede los 35 caracteres.')
        const group = await client.groupCreate(q, ['573228125090@s.whatsapp.net'])
        await client.sendMessage(group.id, {text: `Hola a todos XD`})
        return sendReply(`He creado el grupo correctamente con el siguiente id: ${group.id}`) }
    if(args[0] == 'name'){ if(args.length == 1) return sendReply('por favor escribe el nombre que tendra el grupo.')
        const nombre = q.slice(5)
        if(nombre.length > 35 ) return sendReply('¡Error! El nombre proporcionado excede los 35 caracteres.')
        return client.groupUpdateSubject(from, nombre)}
    if(args[0] == 'desc'){ if(args.length == 1) return sendReply('por favor escribe la descripcion que tendra el grupo')
        const desc = q.slice(5)
        if(desc.length > 522 ) return sendReply('¡Error! El nombre proporcionado excede los 522 caracteres.')
        return client.groupUpdateDescription(from, desc)}
    if(args[0] == 'profile'){
        if(isImage){
            const buffer = await downloadMediaMessage(msg, 'buffer', {})
            await writeFile('./media/profile.jpg', buffer)
            await client.updateProfilePicture(from, {url: './media/profile.jpg'}).then(()=>{sendReply('¡Genial! he actualizado mi foto de perfil correctamente')}).catch(()=>{sendReply('¡Ups! ha ocurrido un error por favor intentalo de nuevo')})
            //fs.unlinkSync('./media/profile.jpg')
            return
        }
    }
    if(args[0] == 'lock'){
        return await client.groupSettingUpdate(from, 'locked')
    }
    sendReply('¡Error! Por favor elige una opcion correcta')
}
module.exports = groupSettings