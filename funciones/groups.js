const { downloadMediaMessage, isJidGroup} = require ('@adiwajshing/baileys')
const moment = require ('moment-timezone')
moment.tz.setDefault('America/Bogota').locale('es')
const fs = require('fs')
const { writeFile } =  require ('fs/promises')
const funciones = require ('../funciones')
const {inWA, getAdmins} = funciones
const log = console.log

const groupSettings = async (msg, client,q, args, command)=> {
    const isWaLink =  q.match(/(https:\/\/chat.whatsapp.com)/gi) 
    const linkWA = q.split('https://chat.whatsapp.com/')[1]   
    var messageType = Object.keys(msg.message)[0]
    const isQuoted = messageType === 'extendedTextMessage'
    const isImage = messageType === 'imageMessage'
    const quoted = isQuoted && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    var quotedMessageType = Object.keys(quoted)[0]
    const isQuotedImage = quotedMessageType === 'imageMessage'

    var from = msg.key.remoteJid
    const numeroBot = client.user.id.split("@")[0].slice(0, -3)
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    const sendImageReplyWithMentions = async (imagen, texto, menciones) => {await client.sendMessage(from, {image: {url:imagen}, caption: texto, mentions: menciones},{quoted: msg})}
    const regExp = q.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')

    switch(command){
    
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
            client.groupUpdateSubject(from, q)
            break
        case 'descripcion':
            if(args.length == 1) return sendReply('por favor escribe la descripcion que tendra el grupo')
            if(q.length > 522 ) return sendReply('¡Error! El nombre proporcionado excede los 522 caracteres.')
            client.groupUpdateDescription(from, q)
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
        case 'enlace':
            const enlace = await client.groupInviteCode(from)
            sendReply(`Abre este enlace para unirte a mi grupo de WhatsApp: \nhttps://chat.whatsapp.com/${enlace}`)
            break
        case 'anular':
            client.groupRevokeInvite(from)
            break
        case 'infogrupo': 
            const gpmd = await client.groupMetadata(from)
            const gids = []
            const {subject, subjectOwner, subjectTime, size, creation, owner, desc, descId, restrict, announce, participants, ephemeralDuration} = gpmd
            const horaCreacion = moment(creation * 1000).tz('America/Bogota').format('h:mm a')
            const fechaCreacion = moment(creation * 1000).tz('America/Bogota').format('ddd, DD/MM/YY')
            const horaNombre = moment(subjectTime * 1000).tz('America/Bogota').format('h:mm a')
            const fechaNombre = moment(subjectTime * 1000).tz('America/Bogota').format('ddd, DD/MM/YY')
            try {var gPerfil = await client.profilePictureUrl(from, 'image')}catch{var gPerfil = 'https://i.ibb.co/j4rsNvy/nopp.png'}
            const admins = await getAdmins(participants)
            const texto = `*·${subject}*\n\n_Creado por *${owner ? `@${owner.split('@')[0]}` : 'Desconocido'}* el *${fechaCreacion}* a las *${horaCreacion}*_\n\n_Nombre cambiado por *${subjectOwner ? `@${subjectOwner.split('@')[0]}` : 'Desconocido'}* el *${fechaNombre}* a las *${horaNombre}*_\n\n_Administradores:_ ${admins.length}\n_Participantes:_ ${size}\n_Descripcion:_ ${desc}`
            gids.push(`${owner ? owner : ''}`)
            gids.push(`${subjectOwner ? subjectOwner : ''}`)
            sendImageReplyWithMentions(gPerfil, texto.replace(/undefined/g, ''), gids)
            break
        case 'entrar':
            if (!isWaLink) return sendReply('¡ERROR! el enlace que has enviado es invalido')
            await client.groupAcceptInvite(linkWA).then(async (res)=>{
                await sendReply('Genial me he unido a tu grupo correctamente')
                client.sendMessage(res,{text:'Hola a todos soy niu XD'})
            }).catch(() => { sendReply('¡ERROR! el enlace que has enviado es invalido') })
            break
        case 'infolink':
            if (!isWaLink) return sendReply('¡ERROR! el enlace que has enviado es invalido')
            await client.groupGetInviteInfo(linkWA).then(async (res)=>{
                const {id, subject, subjectOwner, subjectTime, size, creation, owner, desc, descId, restrict, announce, participants, ephemeralDuration} = res
                const text = `id: ${id} \nsubjectOwner: ${subjectOwner}\nsubject: ${subject}\nsubjectTime: ${subjectTime}\nsize: ${size}\ncreation: ${creation}\nowner: ${owner}\ndesc: ${desc}\ndescId: ${descId}\nrestrict: ${restrict}\nannounce: ${announce}\nparticipants: ${participants}\nephemeralDuration: ${ephemeralDuration}`
                log(text)
            }).catch(() => { sendReply('¡ERROR!') })
            break
    }
}
module.exports = groupSettings