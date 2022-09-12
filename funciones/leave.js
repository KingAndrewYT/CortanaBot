const fs = require('fs'); const {readFileSync, writeFileSync} = fs
const canvas = require('discord-canvas-spanish')
const moment = require('moment-timezone'); moment.tz.setDefault('America/Bogota').locale('es')
const {parse} = JSON
const {getRules, checkRules} = require('../funciones/reglas.js')
const toast = require('../JSONS/toasts.js')
const info = parse(readFileSync('./JSONS/settings.json'))
let {numeroCreador, nombreCreador, nombreBot, copyright, igCreador, fbCreador, ytCreador, discordCreador, prefix, banChats, nopref, onepref, multipref } = info

async function despedida (client, gpu){
    /*const hour_now = moment().format('HH')
    var timeFt = 'ʙᴜᴇɴᴀꜱ ᴍᴇᴅɪᴀꜱ ɴᴏᴄʜᴇꜱ 😴'
    if (hour_now >= '01' && hour_now <= '04') { var timeFt = 'ꜰᴇʟɪᴢ ᴍᴀᴅʀᴜɢᴀᴅᴀ 🌌' }
    if (hour_now >= '05' && hour_now <= '07') { var timeFt = 'ꜰᴇʟɪᴢ ɪɴɪᴄɪᴏ ᴅᴇ ᴅɪᴀ 🌥️' }  
    if (hour_now >= '08' && hour_now <= '11') { var timeFt = 'ʙᴜᴇɴᴏꜱ ᴅɪᴀꜱ 🌤️' }  
    if (hour_now >= '12' && hour_now <= '17') { var timeFt = 'ʙᴜᴇɴᴀꜱ ᴛᴀʀᴅᴇꜱ 🌇' }  
    if (hour_now >= '18' && hour_now <= '22') { var timeFt = 'ʙᴜᴇɴᴀꜱ ɴᴏᴄʜᴇꜱ 🌃' }*/

    const leave = parse(readFileSync('./JSONS/despedida.json')); const isLeave = leave.includes(gpu.id)
    if (gpu.action == 'remove' && isLeave){
        var dir = fs.readdirSync('./media/resources/byesticks'); let ranDir = dir[Math.floor(Math.random() * dir.length)];
        /*const wal = ['https://i.ibb.co/MsxBTm7/10.jpg', 'https://i.ibb.co/xCGc8zV/9.jpg', 'https://i.ibb.co/8MPYgqb/8.jpg', 'https://i.ibb.co/mbwQpGy/7.jpg', 'https://i.ibb.co/jGVD95w/6.jpg', 'https://i.ibb.co/ygTwMBC/5.jpg', 'https://i.ibb.co/nrzGh6m/4.jpg', 'https://i.ibb.co/jHRmrx1/3.jpg', 'https://i.ibb.co/VN3kWQw/1.jpg', 'https://i.ibb.co/BqcFM7B/2.jpg']
        let walrand = wal[Math.floor(Math.random() * wal.length)]
        var groupMetadata = await client.groupMetadata(gpu.id); 
        var reglas = ''; const isRule = checkRules(gpu.id); if (!isRule){ if (groupMetadata.desc === undefined){ reglas = '' } else { reglas = groupMetadata.desc }} else {reglas = getRules(gpu.id)}
        var biografia = '' ; try { biografia = await client.fetchStatus(gpu.participants[0])  } catch { biografia = {status: '', setAt: ''} }
        var groupName = groupMetadata.subject
        var mems = groupMetadata.size
        var discriminator = gpu.participants[0].substring(8, 12)
        var nuevos = ''; await gpu.participants.map(i => { nuevos += `@${i.replace('@s.whatsapp.net', '')} `})
        var pushname = 'Usuario Nuevo'
        var daynow = moment().tz('America/Bogota').format('dddd')
        var datenow = moment().tz('America/Bogota').format('DD MMM YYYY')
        var timenow = moment().tz('America/Bogota').format('h:mm a')        
        var ppimg = ''; try {ppimg = await client.profilePictureUrl(gpu.id, 'image')} catch { ppimg= 'https://i.ibb.co/j4rsNvy/nopp.png'}
        const leaver = await new canvas.Goodbye()
            .setUsername(pushname)
            .setDiscriminator(discriminator)
            .setMemberCount(mems)
            .setGuildName(groupName)
            .setAvatar(ppimg)
            .setColor('border', '#fec600')
            .setColor('username-box', '#fec600')
            .setColor('discriminator-box', '#fec600')
            .setColor('message-box', '#fec600')
            .setColor('title', '#fec600')
            .setBackground(walrand)
            .toAttachment()

        let buff = await leaver.toBuffer()
        writeFileSync('./media/temp/leave.png', buff, 'binary')
        const text = `🫂ᴜꜱᴜᴀʀɪᴏ ɴᴜᴇᴠᴏ\n\n*¡ʜᴏʟᴀ! ${timeFt}* ·${nuevos}·\n\nᴛᴇ ᴅᴏʏ ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ ᴀ \n*${groupName}*\n͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞\n        *ᴅᴀᴛᴏꜱ ᴅᴇ ᴜꜱᴜᴀʀɪᴏ:*\n✏️ ɴᴏᴍʙʀᴇ: *·${pushname}·*\n📱 ᴄᴇʟᴜʟᴀʀ: *·${nuevos.replace('@', '+')}·*\n📖 ʙɪᴏɢʀᴀꜰɪᴀ:  *·${biografia.status}·* \n\n        *ᴅᴀᴛᴏꜱ ᴅᴇ ɪɴɢʀᴇꜱᴏ:*\n🌻 ᴅɪᴀ: *${daynow}*\n🗓️ ꜰᴇᴄʜᴀ: *${datenow}*\n⌚ ʜᴏʀᴀ: *${timenow}*\n͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞\n[REGLAS DEL GRUPO]\n${reglas}`
        client.sendMessage(gpu.id, {text: text, mentions: gpu.participants})
        //client.sendMessage(gpu.id, {image: {url: 'https://pps.whatsapp.net/v/t61.24694-24/292314709_367878575460492_869012820723059393_n.jpg?ccb=11-4&oh=01_AVw3fEr-J4iE33WuVampGBDVvUh_a_b9bFfFoEWXv6IuDQ&oe=632DDA8D'}, caption: text, mentions: gpu.participants})*/
        client.sendMessage(gpu.id, {sticker: {url: `./media/resources/byesticks/${ranDir}`}})
    }
}

module.exports = despedida