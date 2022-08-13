async function checkNumber (){
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
}