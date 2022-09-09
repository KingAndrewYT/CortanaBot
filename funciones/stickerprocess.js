const ffmpeg = require ('fluent-ffmpeg')
const fs = require('fs')
const {readFileSync, unlinkSync} = fs

const sendSticker = async (client, msg, from, media ) => {
    const sendSticker = async (ran) => {client.sendMessage(from, {sticker: {url:ran}},{quoted:msg})}

    var ran = `${Math.floor(Math.random() * 10000)}${'.webp'}`
    ffmpeg(media)
    .input(media)
    .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
        .toFormat('webp')
        .save(ran)
    .on('error', () => {
        unlinkSync(media)
        unlinkSync(ran)
    })
    .on('end', async () =>{
        await sendSticker(ran)
        unlinkSync(media)
        unlinkSync(ran)
    })
}

const sendStickerFromUrl = async (client, msg, from, media ) => {
    const sendSticker = async (ran) => {client.sendMessage(from, {sticker: {url:ran}},{quoted:msg})}

    var ran = `./media/temp/stick.webp`
    ffmpeg(media)
    .input(media)
    .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
        .toFormat('webp')
        .save(ran)
    .on('error', () => {
        unlinkSync(ran)
    })
    .on('end', async () =>{
        await sendSticker(ran)
        unlinkSync(ran)
    })
}

module.exports = {sendSticker, sendStickerFromUrl}