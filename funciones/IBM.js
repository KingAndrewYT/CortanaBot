const fs = require('fs')
const ttsv1 = require('ibm-watson/text-to-speech/v1'); 
const {IamAuthenticator} = require ('ibm-watson/auth'); 
const textToSpeech = new ttsv1({ 
    authenticator: new IamAuthenticator({ 
        apikey: '6nj8wFv3XXy_QOYmJGjJLsyZ7GsD2LtoJDWbAGlHulGh' 
    }), 
    serviceUrl: 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/14c63066-b4bd-45e4-b7d0-15b7a7df4c35' 
})

function textToSpeak (text, voice, sendPttReply) {
        //const getVoiceParams = { voice : 'es-ES_EnriqueV3Voice' }
        //TextToSpeech.listVoices().then(async voices => {log(stringify(voices, null, 2))}).catch(err => {log('Error:', err)})
        //TextToSpeech.getVoice(getVoiceParams).then(async voice =>{ log(stringify(voice, null, 2))})
        const payload = { text: text, accept: 'audio/wav', voice: voice, };
        textToSpeech.synthesize(payload)
        .then(response => {return textToSpeech.repairWavHeaderStream(response.result)})
        .then(async buffer => {await fs.writeFileSync('./media/temp/loquendo.wav', buffer); sendPttReply('./media/temp/loquendo.wav')})
        .catch(err => {console.log('Error: ', err)})
    }  

module.exports = textToSpeak