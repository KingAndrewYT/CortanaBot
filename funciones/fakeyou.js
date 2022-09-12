const fs = require('fs')
const http = require('http')
const FakeYou = require('fakeyou.js');
const fyClient = new FakeYou.Client({usernameOrEmail: 'KingAndrewYT',password: '322Carlos@020598'})

async function fakeyou (mod) {
    await fyClient.start();
    let models = fyClient.searchModel(mod).first()
    console.log('Success')
    /*if(models.size >= 1) {
        let result = await fyClient.makeTTS(models, text);
        var file = fs.createWriteStream('./media/temp/fakeyou.wav')
        http.get(result.audioURL().replace('https', 'http'), function(response){
            response.pipe(file)
        })
    }*/
    
}

module.exports = fakeyou