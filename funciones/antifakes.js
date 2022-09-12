const antifakes = parse(readFileSync('./JSONS/antifakes.json')); const isFake = antifakes.includes(gpu.id)

/*if (isFake){ 
    if (num.startsWith('1') || num.startsWith('371') || num.startsWith('44') || num.startsWith('994') || num.startsWith('48') || num.startsWith('380')) {
        await client.sendMessage(mdata.id, '·[NUMERO FAKE DETECTADO]·\n\n·Eliminando....·', MessageType.text)
        return client.groupRemove(mdata.id, [num])}
}*/