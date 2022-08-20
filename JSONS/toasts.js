exports.outGroup = (pushname) => `[Error] Lo siento ${pushname} el numero indicado no pertenece a este grupo, por lo tanto no puedo realizar ninguna accion.` 
exports.onGroup = (pushname) => `[Error] Lo siento ${pushname} el numero indicado ya pertenece a este grupo, por lo tanto no puedo realizar ninguna accion.` 
exports.info = (pushname, tipoDeUsr) => `*⋆⋅⋅⋅⊱∘─[✧INFORMACION✧]─∘⊰⋅⋅⋅⋆*\n\n¡Hola 👋! *${tipoDeUsr} ${pushname}*\n`

exports.prombot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo promover a mi misma`
exports.promadmin = (pushname) => `[Error] => Lo siento ${pushname} el numero etiquetado ya pertenece al rango *Administrador* del grupo`
exports.noprom = (prefix, inf) => `${inf}\nSi deseas promover rango *Administrador* a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a promover con el comando ${prefix}promover\n*2.* enviar un mensaje etiquetando a la persona a promover.\n  ejemplo: ${prefix}promover @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a promover. \n  ejemplo: ${prefix}promover +57 322 812 5090`

exports.dembot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo degradar a mi misma`
exports.demadmin = (pushname) => `[Error] => Lo siento ${pushname} el numero etiquetado no pertenece al rango *Administrador* del grupo`
exports.nodem = (prefix, inf) => `${inf}\nSi deseas degradar de rango *Administrador* a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a degradar con el comando ${prefix}degradar\n*2.* enviar un mensaje etiquetando a la persona a degradar.\n  ejemplo: ${prefix}degradar @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a degradar. \n  ejemplo: ${prefix}degradar +57 322 812 5090`

exports.rembot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo eliminar a mi misma`
exports.remadmin = (pushname) => `[Error] => Lo siento ${pushname} no tengo permitido eliminar a los administradores del grupo`
exports.norem = (prefix, inf) => `${inf}\nSi deseas eliminar a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a eliminar con el comando ${prefix}eliminar\n*2.* enviar un mensaje etiquetando a la persona a eliminar.\n  ejemplo: ${prefix}eliminar @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a eliminar. \n  ejemplo: ${prefix}eliminar +57 322 812 5090`

exports.addbot = (pushname) => `[Error] => Lo siento ${pushname} no me puedo añadir a mi misma`
exports.addadmin = (pushname) => `[Error] => Lo siento ${pushname} no tengo permitido añadir a los administradores del grupo`
exports.noadd = (prefix, inf) => `${inf}\nSi deseas añadir a un integrante del grupo, tienes tres opciones:\n\n*1.* etiquetar un mensaje de la persona a añadir con el comando ${prefix}añadir\n*2.* enviar un mensaje etiquetando a la persona a añadir.\n  ejemplo: ${prefix}añadir @573228125090 \n*3.* enviar un mensaje escribiendo el numero de la persona a añadir. \n  ejemplo: ${prefix}añadir +57 322 812 5090`