const fs = require('fs')
const {prefix} = JSON.parse(fs.readFileSync('./JSONS/configs.json'))

exports.outGroup = (pushname) => `[Error] Lo siento ${pushname} el numero indicado no pertenece a este grupo, por lo tanto no puedo realizar ninguna accion.` 
exports.onGroup = (pushname) => `[Error] Lo siento ${pushname} el numero indicado ya pertenece a este grupo, por lo tanto no puedo realizar ninguna accion.` 
exports.info = (pushname, tipoDeUsr) => `*⋆⋅⋅⋅⊱∘─[✧INFORMACION✧]─∘⊰⋅⋅⋅⋆*\n\n¡Hola 👋! *${tipoDeUsr} ${pushname}*\n`

exports.prombot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo promover a mi misma.`
exports.promadmin = (pushname) => `[Error] => Lo siento ${pushname} el numero etiquetado ya pertenece al rango *Administrador* del grupo.`
exports.noprom = (inf) => `${inf}\nSi deseas promover rango *Administrador* a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a promover con el comando ${prefix}promover\n*2.* enviar un mensaje etiquetando a la persona a promover.\n  ejemplo: ${prefix}promover @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a promover. \n  ejemplo: ${prefix}promover +57 322 812 5090`

exports.dembot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo degradar a mi misma.`
exports.demadmin = (pushname) => `[Error] => Lo siento ${pushname} el numero etiquetado no pertenece al rango *Administrador* del grupo.`
exports.nodem = (inf) => `${inf}\nSi deseas degradar de rango *Administrador* a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a degradar con el comando ${prefix}degradar\n*2.* enviar un mensaje etiquetando a la persona a degradar.\n  ejemplo: ${prefix}degradar @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a degradar. \n  ejemplo: ${prefix}degradar +57 322 812 5090`

exports.rembot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo eliminar a mi misma.`
exports.remadmin = (pushname) => `[Error] => Lo siento ${pushname} no tengo permitido eliminar a los administradores del grupo.`
exports.norem = (inf) => `${inf}\nSi deseas eliminar a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a eliminar con el comando ${prefix}eliminar\n*2.* enviar un mensaje etiquetando a la persona a eliminar.\n  ejemplo: ${prefix}eliminar @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a eliminar. \n  ejemplo: ${prefix}eliminar +57 322 812 5090`

exports.addbot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo añadir a mi misma.`
exports.addadmin = (pushname) => `[Error] => Lo siento ${pushname} no tengo permitido añadir a los administradores del grupo.`
exports.noadd = (inf) => `${inf}\nSi deseas añadir a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a añadir con el comando ${prefix}añadir\n*2.* enviar un mensaje etiquetando a la persona a añadir.\n  ejemplo: ${prefix}añadir @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a añadir. \n  ejemplo: ${prefix}añadir +57 322 812 5090`

exports.announce = (pushname) => `[Error] => Lo siento ${pushname} este grupo ya se encuentra cerrado.`
exports.notannounce = (pushname) => `[Error] => Lo siento ${pushname} este grupo no se encuentra cerrado.`

exports.desclock = (pushname) => `[Error] => Lo siento ${pushname} los ajustes de este grupo ya se encuentran bloqueados solo los administradores pueden editar la *Info. del grupo*`
exports.descunclock = (pushname) => `[Error] => Lo siento ${pushname} los ajustes de este grupo ya se encuentran desbloqueados, cualquier participante puede editar la *Info. del grupo*`

exports.link = (link) => `Abre este enlace para unirte a mi grupo de WhatsApp: \nhttps://chat.whatsapp.com/${link}\n\nUtilice *${prefix}anular* para anular el enlace del grupo.`
exports.revoke = () => `[Success] => El enlace del grupo ha sido anulado correctamente utiliza el comando *${prefix}enlace* para obtener el nuevo enlace.`

exports.leave = () => `[Success] => He salido del grupo correctamente, si deseas reingresarme de nuevo por favor contactate con mi desarrollador a traves del siguiente enlace https://wa.me/573228125090 y enviale el link del grupo.`

exports.join = () => `[Success] => Genial me he unido a tu grupo correctamente.`
exports.nojoin = (inf) => `${inf}\n Si deseas que yo ingresea a un grupo, por favor enviame el enlace del grupo despues del comando ${prefix}entrar`
exports.nowalink = () => `[Error] => El enlace que has enviado es invalido, por favor verifica e intenta nuevamente.`

exports.name = () => `[Error] => Por favor escribe el nuevo nombre del grupo seguido del comando ${prefix}nombre\n_Nota: puedes escribir un nombre de maximo 35 caracteres_`
exports.longname = () => `[Error] => El nombre que has especificado es demasiado largo, por favor ingresa un nombre de maximo 35 caracteres`
exports.namechanged = (name) => `[Success] Genial he cambiado el nombre del grupo. \n\nNombre anterior: ${name}`

exports.desc = () => `[Error] => Por favor escribe la nueva descripcion del grupo seguido del comando ${prefix}descripcion\n_Nota: puedes escribir una descripcion de maximo 522 caracteres_`
exports.longdesc = () => `[Error] => La descripcion que has especificado es demasiado larga, por favor ingresa un nombre de maximo 522 caracteres`
exports.descchanged = (desc) => `[Success] Genial he cambiado la descripcion del grupo. \n\nDescripcion anterior: ${desc}`

exports.profileg = () => `[Success] => Genial, he actualizado la foto de perfil del grupo correctamente`
exports.errorprofileg = () => `[Error] => Ups ha ocurrido un error actualizando la foto de perfil del grupo, por favor intentalo de nuevo mas tarde o contactate con el desarrollador.`
exports.noprofileg = (inf) => `${inf}\nSi deseas cambiar el icono del grupo puedes etiquetar la imagen que quieres poner de perfil con el comando ${prefix}icono\n\nTambien puedes enviar una imagen desde tu almacenamiento interno con el comando ${prefix}icono`

exports.groupcreate = (inf) => `${inf}\nSi deseas crear un grupo, por favor escribe el nombre del grupo seguido del comando ${prefix}creargrupo`

exports.joinmessage = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Hola! 👋 yo soy *"Cortana🤖"* tu nuevo asistente virtual si quieres conocer cuales son mis funciones envía un mensaje con el comando:_\n*${prefix}menu* \n_Esto te mostrara una lista de todas las cosas que puedo realizar para ti, solamente tienes que poner los comandos tal y como se muestran en la lista, sin espacios, sin tildes ni comillas y listo._\n\n_*Estoy a tus ordenes, que tengas un buen dia 🌤️.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.gpcreate = (res) => `[Success] Genial he creado el grupo correctamente con el siguiente enlace https://chat.whatsapp.com/${res}`

exports.mintake = (efecto, num) => `·✅ Edicion terminada·\n\n·Efecto: ${efecto}\n\n·Si quieres mas efectos como este envia el comando *${prefix}textpro ${num} texto*·`
exports.noeffect = () => `[Error] Este efecto no se encuentra disponible por el momento.`

exports.noPlayer = () => `[Error] Actualmente existe una sesion del juego en curso, por favor espera.`

exports.akiStart = (aki) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n*Pregunta:* \n_${aki.question}._`
exports.akiStep = (aki) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n*Pregunta:* \n_${aki.question}._\n\n - Progreso: ${aki.progress}`
exports.akiWon = (akiwon) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\nPienso en...\n *${akiwon.name}*\n*${akiwon.description}*`
exports.akiWin = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\n¡Genial! acierto de nuevo.`
exports.akiFinish = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\n_Muchas gracias por jugar con nosotros, espero te hayas divertido para volver a jugar envia el comando:_ *${prefix}akinator*`
exports.akiPlay = (pushname) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\nHola *${pushname}*, soy Akinator.\n_Piensa en un personaje real o ficticio, voy a intentar adivinar quién es._`
exports.akiEnd = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\nPara iniciar un nuevo juego primero es necesario finalizarlo`
exports.akiFail = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n[Error] la sesion del juego se ha cerrado, intentare crear una nueva, si no funciona, por favor contactate con mi desarrollador.`
exports.akiStoped = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n[Error] No hay ninguna sesion del juego iniciada por favor envia el comando ${prefix}akinator para iniciar un nuevo juego`