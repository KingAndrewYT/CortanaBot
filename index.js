"use strict";
const proces = require('process') 
proces.on('uncaughtException', console.error)

const mensajes = require ('./mensajes.js');
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode,  downloadContentFromMessage, Browsers, downloadMediaMessage } = require('@adiwajshing/baileys');
const { state, saveState } = useSingleFileAuthState('./session_cortana.json');
const { Boom } = require('@hapi/boom')  
const figlet = require ('figlet')
const fs = require('fs')      
const { existsSync, writeFileSync } = fs
const pino = require ('pino'); 
//const CFonts = require ('cfonts');
const utilidades = require('./utilidades')
const {generarQR, color} = utilidades
//const opciones = require('./config/opciones.js')
//const {info} = opciones
const log = console.log;
const error = console.error;

log(figlet.textSync('------------', { horizontalLayout: 'default'}))
log(figlet.textSync('Cortana Bot', { font: 'Flower Power', horizontalLayout: 'default'}))
log(figlet.textSync('------------', { horizontalLayout: 'default'}))

//const { version } = await fetchLatestBaileysVersion()
const client = makeWASocket({ logger: pino({ level: 'warn' }), printQRInTerminal: true, browser: Browsers.macOS('Chrome OS'), auth: state})
    async function connectToWhatsApp () {
        try {
            let session = './session_cortana.json'
            client.ev.on('connection.update', async (update) => {
                //if(update.qr)utilidades.generarQR(update.qr)
                const { connection, lastDisconnect } = update
                if (connection === 'connecting'){
                    log(color("·[Estado Cortana] => ·","green"), color('·Conectando...·' + client.type, 'magenta'))
                }
                if (connection === 'open') {

                    log(color('·[Desarrollador] => ·', 'green'), color('·KingAndrewYT·', 'magenta'))
                    log(color('·[Estado Cortana] =>·', 'green'), color('·Inicializacion Finalizada·', 'magenta'))
                    log(color('·[Bienvenid@] =>·', 'green'), color(`${client.user.name} (${client.user.id.replace("@s.whatsapp.net", "")})·`, 'magenta'))
                }
                if (connection === 'close') {
                    let messageConnect = new Boom(lastDisconnect?.error)?.output.statusCode
                    if(messageConnect === DisconnectReason.badSession){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Sesion corrupta·', 'magenta'))
                        connectToWhatsApp(); 
                    } else if(messageConnect === DisconnectReason.connectionClosed){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Sesion cerrada por el cliente o el servidor·', 'magenta'))
                        connectToWhatsApp();
                    } else if(messageConnect === DisconnectReason.connectionReplaced){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Sesion reemplazada·', 'magenta'))
                        connectToWhatsApp(); 
                    } else if (messageConnect === DisconnectReason.restartRequired){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Se requiere un reinicio·', 'magenta'))
                        connectToWhatsApp(); 
                    } else if (messageConnect === DisconnectReason.connectionLost){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Sesion perdida·', 'magenta'))
                        connectToWhatsApp(); 
                    } else if (messageConnect === DisconnectReason.loggedOut){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Sesion cerrada, por favor escanea de nuevo·', 'magenta'))
                        client.logout();
                        if (existsSync(session)) fs.unlinkSync(session);
                    } else if (messageConnect === DisconnectReason.timedOut){
                        error(color('·[Estado Cortana] =>·', 'red'), color('·Tiempo de espera agotado·', 'magenta'))
                        connectToWhatsApp(); 
                    } else client.end(`Razon: ${messageConnect} | ${connection}`)
                }
            })
            client.ev.on('creds.update', saveState);
        } catch {
            e = String(e) 
            if (e.includes('Connection Closed')){ return }
            if (e.includes('Timed Out')){ return }
            
            console.log(e)
            execSh('npm start')
        }
    }
    async function start (){
        try {
            client.ev.on('messages.upsert', async ({ messages }) => {
                const msg = messages[0]
                if (!msg.message) return    
                mensajes(msg, client)
            })
        } catch (e){
            execSh('npm start')
        }
    }
    connectToWhatsApp()
    start()