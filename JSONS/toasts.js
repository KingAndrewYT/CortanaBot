const fs = require('fs')
const {prefix} = JSON.parse(fs.readFileSync('./JSONS/settings.json'))
const {getLevelingXp, getLevelingLevel} = require('../funciones/level.js')

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

exports.noPlayer = (usuario) => `[Error] Actualmente existe una sesion del juego en curso con *@${usuario.split("@")[0]}*, por favor espera que termine su turno ó comunicate con el desarrollador a traves del siguiente enlace wa.me/573228125090.`

exports.akiStart = (aki) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n*Pregunta:* \n_${aki.question}._`
exports.akiStep = (aki) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n*Pregunta:* \n_${aki.question}._\n\n - Progreso: ${aki.progress}`
exports.akiWon = (akiwon) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\nPienso en...\n *${akiwon.name}*\n*${akiwon.description}*`
exports.akiWin = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\n¡Genial! acierto de nuevo.`
exports.akiFinish = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\n_Muchas gracias por jugar con nosotros, espero te hayas divertido para volver a jugar envia el comando:_ *${prefix}akinator*`
exports.akiPlay = (pushname) => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n\nHola *${pushname}*, soy Akinator.\n_Piensa en un personaje real o ficticio, voy a intentar adivinar quién es._`
exports.akiEnd = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\nPara iniciar un nuevo juego primero es necesario finalizarlo`
exports.akiFail = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n[Error] la sesion del juego se ha cerrado, intentare crear una nueva, si no funciona, por favor contactate con mi desarrollador.`
exports.akiStoped = () => `*👾 [𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐆𝐀𝐌𝐄𝐒 - 𝐀𝐊𝐈𝐍𝐀𝐓𝐎𝐑]🧞‍♂️*\n[Error] No hay ninguna sesion del juego iniciada por favor envia el comando ${prefix}akinator para iniciar un nuevo juego`

exports.longSticker = () => `[Error] El video que has enviado es demasiado largo, por favor intenta con un video de menos de 1s0 segundos.`
exports.sacame = (pushname, tipoDeUsr) => `Hola *${pushname} - ${tipoDeUsr}* estas segur@ que quieres que te elimine? \n\n🚨NO OPRIMAS EL BOTON *"SI"* SI NO QUIERES SER ELIMINADO🚨`
exports.sacamesi = (pushname, tipoDeUsr) => `[Solicitud Aceptada] => Eliminando *${tipoDeUsr} ${pushname}`
exports.sacameno = () => `[Eliminacion Cancelada]`
exports.casinoWin = (resultado) => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆* \n_*⋆⋅⊱∘[✧🎉GANASTE🎉✧]∘⊰⋅⋆*_ \n🚨---------🚨--------🚨\n_La respuesta del casino fue..._\n*·${resultado}·*\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.casinoLoose = (resultado, looser) => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆* \n_*⋆⋅⊱∘[✧🕳️PERDISTE🕳️✧]∘⊰⋅⋆*_ \n\n_Obtuviste una respuesta de..._\n*·${resultado}·*\n\n_${looser}_ \n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`

exports.tts = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas escuchar un texto en el idioma que tu desees, envía un mensaje con el siguiente formato: *${prefix}tts + código de idioma + texto*_\n\n_Ejemplo: *${prefix}tts es Hola soy Cortana en que puedo ayudarte?*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.ttsError = () => `[Error] => Cual es el texto que quieres escuchar?`

exports.error = () => `[Error] 404 Not Found.`
exports.clima = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_‼️Para usar el comando *${prefix}clima*_ \n_Envía un mensaje con el comando *${prefix}clima <nombre de tu ciudad>*_\n\n_❍⌇─➭Ejemplo: *${prefix}clima bogota*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. No colocar tildes en los nombres de las ciudades._\n_2. No colocar nombres de países._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*` 

exports.rulesUpdated = (rules) => `[SUCCESS] => Se han actualizado las reglas de este grupo: \n\nNuevas reglas:\n\n ${rules}`
exports.rules = (groupName, reglas) => `[NORMAS DEL GRUPO]\n\n${reglas}`
exports.notRules = () => `[ERROR] => Este grupo no tiene reglas personalizadas\n\nSi quieres añadir reglas personalizadas envia el comando ${prefix}nuevaregla + regla del grupo `
exports.rulesReset = () => `[Success] => Las reglas personalizadas del grupo han sido eliminadas, se enviara la descripcion del grupo cada ves que se ponga el comando ${prefix}reglas\n\nSi quieres añadir reglas personalizadas envia el comando ${prefix}nuevaregla + regla del grupo `

exports.avoactive = () => `[Anti Ver Una Vez Activado]`

exports.userRegistered = () => `[Error] ya estas registrado en nuestro sistema`
exports.userUnRegistered = () => `*_*✋ACCESO DENEGADO🛑*_\n_¡Ups! parece que no estas registrado en nuestro sistema, para registrarte solo debes oprimir el boton *·REGISTRAR·* o escribir la palabra *registrar*_ para poder continuar...`
exports.registering = () => `[Usuario Nuevo Encontrado] registrando por favor espere...`
exports.unregister = () => `[...] Eliminando registros por favor espere...`
exports.unregistered = () => `[Success] Registros eliminados correctamente`


exports.levelUp = (pushname, sender, fetchXp, currentLevel, role) => `*🏆╚» Nivel Superado «╝🏆*\n\n_·Felicidades *${pushname}* has subido de nivel.·_\n\n*·🤺 XP:* ${getLevelingXp(sender)} / ${fetchXp}·\n*·🆙  Nivel:* ${currentLevel} -> ${getLevelingLevel(sender)}·\n*·🎓 Rango:* ${role}·`

exports.owners = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n\n_Este comando esta disponible solo para_\n_*Usuarios Rango 👾 Desarrollador👨🏻‍💻*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.bots = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Este comando esta disponible solo para_\n_*Usuarios Rango *•🤖Bot🤖•*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.vips = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Este comando esta disponible solo para_\n_*Usuarios Rango *•⚜Vip⚜•*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.premiums = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Este comando esta disponible solo para_\n_*Usuarios Rango *•🌟Premium🌟•*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.admins = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Este comando esta disponible solo para_\n_*Usuarios Rango *•🪀Administrador💬•*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`

exports.groups = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Este comando solo esta disponible dentro de grupos._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.novip = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_¡Ups! parece que no estas autorizad@ para usar mis comandos si quieres obtener acceso a mis comandos contactate con mis desarrollador a travez del numero +573228125090 y obten nuestro servicio VIP para que puedas usar completamente todos mis comandos disponibles._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.userbanned = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_usuario baneado._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.nsfw = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n\n_Los comandos NSFW estan deshabilitados no podras ejecutar ningun comando con contenido NSFW._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.porn = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n\n_Los comandos con contenido pornografico estan deshabilitados no podras ejecutar ningun comando con contenido pornografico._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`

exports.adminbot = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_Por favor agregame como Administradora del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`

exports.promotebot= () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No me puedo promover a mi misma ya soy Admin del grupo·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.demotebot= () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No me puedo degradar a mi misma·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.removebot= () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No me puedo eliminar a mi misma·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.addbot= () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No me puedo añadir a mi misma ya me encuentro dentro del grupo·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.promoteowner = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No puedo promover a la persona que creó el grupo ya es Admin·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.demoteowner = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No puedo degradar a la persona que creó el grupo.·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.removeowner = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No puedo eliminar a la persona que creó el grupo.·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`
exports.addowner = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_·No puedo añadir a la persona que creó el grupo ya se encuentra dentro del grupo.·_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`

exports.noregister = () => `*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*\n_*🛑ACCESO DENEGADO✋*_\n_No estas registrado en nuestro sistema para registrarte solo debes oprimir el boton *·REGISTRAR·* o escribir la palabra *registrar*_\n*⋆⋅⋅⋅⊱∘───[✧ERROR✧]───∘⊰⋅⋅⋅⋆*`

exports.processing = () => `*⋆⋅⋅⋅⊱∘───[✧WAIT✧]───∘⊰⋅⋅⋅⋆*\n_*Procesando… por favor espera*_\n*█▒▒▒▒▒▒▒▒▒*\n*⋆⋅⋅⋅⊱∘───[✧WAIT✧]───∘⊰⋅⋅⋅⋆*`
exports.processed = () => `*⋆⋅⋅⋅⊱∘───[✧SUCCESS✧]───∘⊰⋅⋅⋅⋆*\n_*Proceso Finalizado*_\n*██████████*\n*⋆⋅⋅⋅⊱∘───[✧SUCCESS✧]───∘⊰⋅⋅⋅⋆*`
exports.searching= () => `*⋆⋅⋅⋅⊱∘───[✧WAIT✧]───∘⊰⋅⋅⋅⋆*\n_*Buscando... por favor espera.*_\n*█▒▒▒▒▒▒▒▒▒*\n*⋆⋅⋅⋅⊱∘───[✧WAIT✧]───∘⊰⋅⋅⋅⋆*`
exports.searched= () => `*⋆⋅⋅⋅⊱∘───[✧SUCCESS✧]───∘⊰⋅⋅⋅⋆*\n_*Busqueda Finalizada*_\n*██████████*\n*⋆⋅⋅⋅⊱∘───[✧SUCCESS✧]───∘⊰⋅⋅⋅⋆*`

exports.msgonlyowners = () => `_comandos disponibles solo para usuarios con rango *Desarrollador*._`
exports.msgonlybots = () => `_comandos disponibles solo para usuarios con rango *Bot*._`
exports.msgonlyvips = () => `_comandos disponibles solo para usuarios con rango *Vip*._`
exports.msgonlypremiums = () => `_comandos disponibles solo para usuarios con rango *Premium*._`
exports.msgonlyadms = () => `_comandos disponibles solo para usuarios con rango *Administrador*._`

exports.prefixes = (pushname) => `_👋 Hola *${pushname}*, si deseas actualizar el metodo de uso de los prefijos para comandos porfavor lee la siguiente informacion._\n\n🙅🏻‍♂️*·SIN PREFIJO:* _No se necesitan prefijos antes de los comandos·_\n\n🤹🏻‍♂️*·MULTI PREFIJO:* _Para usar cualquier simbolo disponible en el teclado para anteponer a los comandos·_\n\n1️⃣*·UN PREFIJO:* _Se utiliza el prefijo predeterminado por el sistema.·_`
exports.onepref = () => `·[UN PREFIJO ACTIVADO]·\n\n_Ahora para pedir comandos se necesitara usar el prefijo ${prefix}._`
exports.multipref = () => `·[MULTI PREFIJO ACTIVADO]·\n\n_Ahora todos los comandos funcionaran con cualquier simbolo disponible en el teclado de sus telefonos._`
exports.nopref = () => `·[SIN PREFIJO ACTIVADO]·\n\n_Ahora se podran pedir los comandos sin la necesidad de usar un prefijo antes del comando._`
exports.newpref = (q) => `[Success] Prefijo cambiado exitosamente\n\n_Su nuevo Prefijo es *${q}*_`
exports.nonewpref = () => `[Error] => Por favor indica el simbolo que deseas colocar como prefijo`
exports.newpreflong = () => `[Error] => El prefijo indicado excede el 1 caracteres permitidos, por favor elige un solo simbolo para definir como prefijo.`

exports.ytmusic = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar una música desde las plataformas de:_ \n   _*·YouTube*_\n_Solamente debes enviar el link o nombre de la canción junto con el comando ${prefix}musica + link o nombre de la música._\n _(⚠️ACLARACIÓN: La función de buscar canciones por nombre solo esta disponible para la plataforma de YouTube)_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.ytvid = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar un video desde las plataformas de:_ \n   _*·YouTube*_\n_Solamente debes enviar el link o nombre del video junto con el comando ${prefix}video + link o nombre del video._\n _(⚠️ACLARACIÓN: La función de buscar video por nombre solo esta disponible para la plataforma de YouTube)_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.ytmp3 = () => ``
exports.ytmp4 = () => ``
exports.ytdoc = () => ``
exports.ytptt = () => ``
exports.ytvdoc = () => ``
exports.ytmres = (yt) => `*🎶----[YTMP3 MUSICA]----🎶*\n\n🎧 _Cancion encontrada: *${yt.title}*_\n☕ _Calidad: *${yt.audio['128kbps'].quality}*_\n📥 _Peso: *${yt.audio['128kbps'].fileSizeH}*_\n\n[...] Enviando porfavor espere.`
exports.ytunk = () => `*🎶----[YTMP3 MUSICA]----🎶*\n\n🎧 _Cancion no encontrada: ❌_\n\n[...] Por favor verifica el enlace e intenta nuevamente.`
exports.ytmresv = (yt) => `*🎶----[YTMP4 VIDEOS]----🎶*\n\n🎧 _Video encontrado: *${yt.title}*_\n☕ _Calidad: *${yt.video['360p'].quality}*_\n📥 _Peso: *${yt.video['360p'].fileSizeH}*_\n\n[...] Enviando porfavor espere.`
exports.ytunkv = () => `*🎶----[YTMP4 VIDEOS]----🎶*\n\n🎧 _Video no encontrado: ❌_\n\n[...] Por favor verifica el enlace e intenta nuevamente.`
exports.noytlink = () => `[Error] el enlace que has proporcionado no corresponde a ningun enlace de youtube compatible, por favor verifica e intenta nuevamente.`

exports.girInf = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas hacer una busqueda inversa de una imagen en los servidores de google, envia una imagen o etiqueta a una imagen enviada con el comando ${prefix}inversa_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.gir = (result) => `_*[🔎 Google Busqueda Inversa]*_\n\n_Resultados de busqueda:_\n\nTitulo: *${result[0].title}*\nWeb: *${result[0].url}*`
exports.gis = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar una imagen en los servidores de *Google* envía un comando con el siguiente formato: *${prefix}imagen + nombre de imagen que buscas*._\n\n_Ejemplo: *${prefix}imagen naruto*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. No solicitar varias imágenes seguidas ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`

exports.stick = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar un sticker de interes, por favor envia un mensaje con el comando ${prefix}stick + nombre del sticker que buscas_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.yts = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar videos o musica en youtube por favor envia el comando ${prefix}youtube + nombre de video o musica_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.musica = (timestamp, title, visitas, hace, description) => `┌────────────────────┐\n0:00 ⊙─────────── ${timestamp}\n↪️   ⏮️   ▶️   ⏭️   ↩️\n*${title}*\n*${visitas} vistas* · se estrenó *hace ${hace}*\n└────────────────────┘\n\n${description}`
exports.video = (timestamp, title, visitas, hace, description) => `┌────────────────────┐\n0:00 ⊙─────────── ${timestamp}\n↪️   ⏮️   ▶️   ⏭️   ↩️\n*${title}*\n*${visitas} vistas* · se estrenó *hace ${hace}*\n└────────────────────┘\n\n${description}`
exports.ytplay = () => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar una músicas o videos desde las plataformas de:_ \n   _*·YouTube*_\n_Solamente debes enviar el link o nombre de la canción junto con el comando ${prefix}reproducir + link o nombre de la musica/video._\n _(⚠️ACLARACIÓN: La función de buscar canciones y videos por nombre solo esta disponible para la plataforma de YouTube)_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.top3 = (sender,q, groupName, p1, p2, p3) => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola @${sender.replace('@s.whatsapp.net','')} aqui está el..._\n_🏆TOP 3_ *${q}* _del grupo_ *${groupName}*\n\n*╭─🥇@${p1.id.split("@")[0]} .*\n*├─🥈@${p2.id.split("@")[0]} .*\n*╰─🥉@${p3.id.split("@")[0]} .*\n\n*FELICIDADES _👏@${p1.id.split("@")[0]}🥳_ Has ganado el primer lugar a _${q}_ del grupo.*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.top5 = (sender,q, groupName, p1, p2, p3, p4, p5) => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola @${sender.split("@")[0]} aqui está el..._\n_🏆TOP 5_ *${q}* _del grupo_ *${groupName}*\n\n*╭─🥇@${p1.id.split("@")[0]} .*\n*├─🥈@${p2.id.split("@")[0]} .*\n*├─🥉@${p3.id.split("@")[0]} .*\n*├─🎖@${p4.id.split("@")[0]} .*\n*╰─🎖@${p5.id.split("@")[0]} .*\n\n*FELICIDADES _👏@${p1.id.split("@")[0]}🥳_ Has ganado el primer lugar a _${q}_ del grupo.*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
exports.top10 = (sender,q, groupName, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola @${sender.replace('@s.whatsapp.net','')} aqui está el..._\n_🏆TOP 10_ *${q}* _del grupo_ *${groupName}*\n\n*╭─🥇@${p1.id.split("@")[0]} .*\n*├─🥈@${p2.id.split("@")[0]} .*\n*├─🥉@${p3.id.split("@")[0]} .*\n*├─🎖@${p4.id.split("@")[0]} .*\n*├─🎖@${p5.id.split("@")[0]} .*\n*├─🎖@${p6.id.split("@")[0]} .*\n*├─🎖@${p7.id.split("@")[0]} .*\n*├─🎖@${p8.id.split("@")[0]} .*\n*├─🎖@${p9.id.split("@")[0]} .*\n*╰─🎖@${p10.id.split("@")[0]} .*\n\n*FELICIDADES _👏@${p1.id.split("@")[0]}🥳_ Has ganado el primer lugar a _${q}_ del grupo.*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`