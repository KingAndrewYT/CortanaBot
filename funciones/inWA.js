const inWA = async (msg, client, numero) => {
    const sendReply = async (texto) => {client.sendMessage(from, {text: texto}, {quoted: msg})}
    var from = msg.key.remoteJid
    const regExp = numero.replace(new RegExp(/[-a-zA-Z@:%._ +()~#=]/g), '')
    if(isNaN(regExp)) return sendReply('¡Error! solo se aceptan caracteres numericos')
    if(regExp.length >= 15) return sendReply('¡Error! el numero ingresado supera los 15 caracteres')
    const [result] = await client.onWhatsApp(regExp)
    if(result == undefined) return sendReply(`¡Error! el numero ingresado no existe en whatsapp, por favor verifica e intenta nuevamente.`)
    return result.exists
}
module.exports = inWA