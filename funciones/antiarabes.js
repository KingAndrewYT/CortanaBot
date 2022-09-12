const antiarabes = parse(readFileSync('./JSONS/antiarabes.json')); const isArabe = antiarabes.includes(gpu.id)


/*if (isArabe){ 
    if (num.startsWith('212') ||num.startsWith('27') || num.startsWith('39') || num.startsWith('263') || num.startsWith('233') || num.startsWith('20') ||num.startsWith('91') || num.startsWith('92') || num.startsWith('98') || num.startsWith('94') || num.startsWith('234') || num.startsWith('380')) {
        await client.sendMessage(mdata.id, '·[NUMERO ARABE DETECTADO]·\n\n·Eliminando....·', MessageType.text)
        return client.groupRemove(mdata.id, [num])}
}*/