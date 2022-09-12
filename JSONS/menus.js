const fs = require('fs')
const {prefix} = JSON.parse(fs.readFileSync('./JSONS/settings.json'))

exports.textpro1 = (inf) => `${inf}
Si deseas crear una imagen con efectos de texto geniales ten en cuenta lo siguiente:

_·Modo de uso·_
*${prefix}textpro* + numero de efecto + texto (para efectos de una sola linea de texto)
_·Ejemplo:·_
*${prefix}textpro* 1 KingAndrewYT

͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞͞
_*⋆⋅⊱∘[✧LISTA DE EFECTOS✧]∘⊰⋅⋆*_

*•──(ESTILOS NEON Y LUCES)──*
*╭─1:* _⋆⋅Gradient Neon⋅⋆_ 
*├─2:* _⋆⋅BlackPink⋅⋆_
*├─3:* _⋆⋅Summer Neon⋅⋆_
*├─4:* _⋆⋅Light Glow Sliced⋅⋆_
*├─5:* _⋆⋅Neon Light Glitch⋅⋆_
*├─6:* _⋆⋅Neon Light On Brick⋅⋆_
*├─7:* _⋆⋅Glowing Neon Light⋅⋆_
*├─8:* _⋆⋅Thunder⋅⋆_
*├─9:* _⋆⋅3D Neon Light⋅⋆_
*├─10:* _⋆⋅Glitch Text⋅⋆_
*├─11:* _⋆⋅Devil Wings⋅⋆_
*├─12:* _⋆⋅Futuristic Tecnology⋅⋆_
*├─13:* _⋆⋅Neon Galaxy⋅⋆_
*├─14:* _⋆⋅Holographic 3D⋅⋆_
*├─15:* _⋆⋅Neon Text⋅⋆_
*├─16:* _⋆⋅New Year Card⋅⋆_
*├─17:* _⋆⋅Firework Sparkle⋅⋆_
*├─18:* _⋆⋅Equializer⋅⋆_
*├─19:* _⋆⋅Matrix⋅⋆_
*├─20:* _⋆⋅Neon Wall⋅⋆_
*├─21:* _⋆⋅Lightning⋅⋆_
*├─22:* _⋆⋅Neon Simple⋅⋆_
*├─23:* _⋆⋅Bokeh⋅⋆_
*├─24:* _⋆⋅Green Neon⋅⋆_
*╰─25:* _⋆⋅Butterfly Neon⋅⋆_

*•──(ESTILOS METALICOS)──*
*╭─26:* _⋆⋅Gold Glitter⋅⋆_ 
*├─27:* _⋆⋅Rushed Metal⋅⋆_
*├─28:* _⋆⋅Golden Valentine⋅⋆_
*├─29:* _⋆⋅3D Golden⋅⋆_
*├─30:* _⋆⋅3D Luxury Metallic⋅⋆_
*├─31:* _⋆⋅White Gold⋅⋆_
*├─32:* _⋆⋅Arcane⋅⋆_
*├─33:* _⋆⋅Ancient⋅⋆_
*├─34:* _⋆⋅3D Deep Sea⋅⋆_
*├─35:* _⋆⋅Black Metalic⋅⋆_
*├─36:* _⋆⋅Glossy Metalic⋅⋆_
*├─37:* _⋆⋅Transformers⋅⋆_
*├─38:* _⋆⋅Harry Potter⋅⋆_
*├─39:* _⋆⋅3D Glossy Metal⋅⋆_
*├─40:* _⋆⋅Dark Gold⋅⋆_
*├─41:* _⋆⋅Purple Metal⋅⋆_
*├─42:* _⋆⋅Deluxe Silver⋅⋆_
*├─43:* _⋆⋅Metal Luxury⋅⋆_
*├─44:* _⋆⋅Glossy Blue Metal⋅⋆_
*├─45:* _⋆⋅Deluxe Gold⋅⋆_
*├─46:* _⋆⋅Dark Gold⋅⋆_
*├─47:* _⋆⋅Steel⋅⋆_
*├─48:* _⋆⋅Rusty Metal⋅⋆_
*├─49:* _⋆⋅Metal Rainbow⋅⋆_
*├─50:* _⋆⋅Shiny Metal⋅⋆_
*├─51:* _⋆⋅Hot Metal⋅⋆_
*├─52:* _⋆⋅Eroded Metal⋅⋆_
*├─53:* _⋆⋅Blue Metal⋅⋆_
*├─54:* _⋆⋅Black Metal⋅⋆_
*├─55:* _⋆⋅3D Glowing Metal⋅⋆_
*╰─56:* _⋆⋅3D Chrome⋅⋆_

*•──(ESTILOS DE COMIDA)──*
*╭─57:* _⋆⋅3D Orange Juice⋅⋆_ 
*├─58:* _⋆⋅Berry⋅⋆_
*├─59:* _⋆⋅Chocolate⋅⋆_
*├─60:* _⋆⋅Strawberry⋅⋆_
*├─61:* _⋆⋅Bread⋅⋆_
*├─62:* _⋆⋅Honey⋅⋆_
*├─63:* _⋆⋅Biscuit⋅⋆_
*├─64:* _⋆⋅Bagel⋅⋆_
*╰─65:* _⋆⋅Candy⋅⋆_

*•──(ESTILOS DE LUJO)──*
*╭─66:* _⋆⋅Diamond⋅⋆_ 
*├─67:* _⋆⋅3D Luxury Gold⋅⋆_
*├─68:* _⋆⋅Peridot Stone⋅⋆_
*├─69:* _⋆⋅Pink Sparkling Jewerly⋅⋆_
*├─70:* _⋆⋅Marble⋅⋆_
*├─71:* _⋆⋅Abstra Gold⋅⋆_
*├─72:* _⋆⋅Purple Gem⋅⋆_
*├─73:* _⋆⋅Red Jewerly⋅⋆_
*├─74:* _⋆⋅Blue Glitter⋅⋆_
*├─75:* _⋆⋅Blue Gem⋅⋆_
*╰─76:* _⋆⋅Hexa Golden⋅⋆_

*•──(ESTILOS 3D)──*
*╭─77:* _⋆3D Stone⋅⋆_ 
*├─78:* _⋆⋅Country Flag 3D⋅⋆_
*├─79:* _⋆⋅American Flag 3D⋅⋆_
*├─80:* _⋆⋅3D Rainbow Calligraphy⋅⋆_
*├─81:* _⋆⋅Water Pipe⋅⋆_
*├─82:* _⋆⋅Space 3D⋅⋆_
*├─83:* _⋆⋅3D Gradient⋅⋆_
*├─84:* _⋆⋅3D Beach⋅⋆_
*├─85:* _⋆⋅3D Paper Cut Multicolor⋅⋆_
*├─86:* _⋆⋅3D Underwater⋅⋆_
*├─87:* _⋆⋅3D Gradient⋅⋆_
*├─88:* _⋆⋅Minion 3D⋅⋆_
*├─89:* _⋆⋅New Year Card⋅⋆_
*├─90:* _⋆⋅Avatar Gold⋅⋆_
*╰─91:* _⋆⋅3D Box⋅⋆_

*•──(ESTILOS TECNOLOGICOS)──*
*╭─92:* _⋆⋅Color Led⋅⋆_ 
*├─93:* _⋆⋅3D Sci-Fi⋅⋆_
*├─94:* _⋆⋅Blue Circuit⋅⋆_
*├─95:* _⋆⋅Science Fiction⋅⋆_
*├─96:* _⋆⋅Star Wars⋅⋆_
*╰─97:* _⋆⋅Sci-Fi⋅⋆_

*•──(Graffiti)──*
*•─98:* _⋆⋅Wonderful Graffiti⋅⋆_ 

*•──(NAVIDAD Y AÑO NUEVO)──*
*╭─99:* _⋆⋅New Year Greeting⋅⋆_ 
*├─100:* _⋆⋅Christmass Tree⋅⋆_
*├─101:* _⋆⋅Christmas Candy⋅⋆_
*├─102:* _⋆⋅3D Christmas⋅⋆_
*├─103:* _⋆⋅Sparkles Christmas⋅⋆_
*├─104:* _⋆⋅Xmas Cards 3D⋅⋆_
*╰─105:* _⋆⋅Chistmas Gift⋅⋆_

*•──(MISCELANEOS)──*
*╭─106:* _⋆⋅3D Pottery⋅⋆_ 
*├─107:* _⋆⋅Artistic Typography⋅⋆_
*├─108:* _⋆⋅Summer Beach⋅⋆_
*├─109:* _⋆⋅Black Pink⋅⋆_
*├─110:* _⋆⋅Black Pink 2⋅⋆_
*├─111:* _⋆⋅3D Business⋅⋆_
*├─112:* _⋆⋅Carved Stone⋅⋆_
*├─113:* _⋆⋅3D Style Glass⋅⋆_
*├─114:* _⋆⋅3D Giraffe⋅⋆_
*├─115:* _⋆⋅Batman Logo⋅⋆_
*├─116:* _⋆⋅Halloween Skeleton⋅⋆_
*├─117:* _⋆⋅Sketch Text⋅⋆_
*├─118:* _⋆⋅Video Game Classic⋅⋆_
*├─119:* _⋆⋅Green Horror⋅⋆_
*├─120:* _⋆⋅Magma Hot⋅⋆_
*├─121:* _⋆⋅3D Stone Cracked⋅⋆_
*├─122:* _⋆⋅Embossed Text⋅⋆_
*├─123:* _⋆⋅Broken Glass⋅⋆_
*├─124:* _⋆⋅Paper Cut⋅⋆_
*├─125:* _⋆⋅Watercolor⋅⋆_
*├─126:* _⋆⋅Foggy Windows⋅⋆_
*├─127:* _⋆⋅Black Bear⋅⋆_
*├─128:* _⋆⋅Christmas Holiday⋅⋆_
*├─129:* _⋆⋅Snow Text⋅⋆_
*├─130:* _⋆⋅Cloud text⋅⋆_
*├─131:* _⋆⋅Blackpink⋅⋆_
*├─132:* _⋆⋅Realistic Cloud⋅⋆_
*├─133:* _⋆⋅Cloud Text⋅⋆_
*├─134:* _⋆⋅Sand Summer Beach⋅⋆_
*├─135:* _⋆⋅Sand Writing⋅⋆_
*├─136:* _⋆⋅Sand Engraved⋅⋆_
*├─137:* _⋆⋅Summery Sand⋅⋆_
*├─138:* _⋆⋅Balloon Text⋅⋆_
*├─139:* _⋆⋅3D Glue⋅⋆_
*├─140:* _⋆⋅1917⋅⋆_
*├─141:* _⋆⋅Double Exposure⋅⋆_
*├─142:* _⋆⋅Glossy Carbon⋅⋆_
*├─143:* _⋆⋅Fabric⋅⋆_
*├─144:* _⋆⋅Full Color Balloon⋅⋆_
*├─145:* _⋆⋅Blood Text⋅⋆_
*├─146:* _⋆⋅Halloween Fire⋅⋆_
*├─147:* _⋆⋅Joker Logo⋅⋆_
*├─148:* _⋆⋅Wicker⋅⋆_
*├─149:* _⋆⋅Natural Leaves⋅⋆_
*├─150:* _⋆⋅Skeleton⋅⋆_
*├─151:* _⋆⋅Red Foil⋅⋆_
*├─152:* _⋆⋅Ultra Gloss⋅⋆_
*├─153:* _⋆⋅Denim⋅⋆_
*├─154:* _⋆⋅Decorate Purple⋅⋆_
*├─155:* _⋆⋅Rock⋅⋆_
*├─156:* _⋆⋅Lava⋅⋆_
*├─157:* _⋆⋅Purple Glass⋅⋆_
*├─158:* _⋆⋅Purple Shiny⋅⋆_
*├─159:* _⋆⋅Captain America⋅⋆_
*├─160:* _⋆⋅Toxic Effect⋅⋆_
*├─161:* _⋆⋅Purple Glass 2⋅⋆_
*├─162:* _⋆⋅Decorative Glass⋅⋆_
*├─163:* _⋆⋅Koi Fish⋅⋆_
*├─164:* _⋆⋅Horror Blood⋅⋆_
*├─165:* _⋆⋅Road Warning⋅⋆_
*├─166:* _⋆⋅Dropwater⋅⋆_
*├─167:* _⋆⋅Break Wall⋅⋆_
*├─168:* _⋆⋅Plastic Bag⋅⋆_
*├─169:* _⋆⋅Horror Gift⋅⋆_
*├─170:* _⋆⋅Marble Slaps⋅⋆_
*├─171:* _⋆⋅Ice Cold⋅⋆_
*├─172:* _⋆⋅Fruit Juice⋅⋆_
*├─173:* _⋆⋅Wood Text⋅⋆_
*├─174:* _⋆⋅Carbon⋅⋆_
*╰─175:* _⋆⋅Misc Style⋅⋆_
`
exports.ttsList = (inf) => `${inf}

*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*
Lista de Idiomas soportados por  TTS(Texto a Voz)
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*

_*Idiomas mas populares:*_

*╭─AR:* _Árabe_
*├─DE:* _Alemán_
*├─EN:* _Inglés_
*├─ES:* _Español (Castellano)_
*├─ID:* _Indonesio_
*├─IT:* _Italiano_
*├─JA:* _Japonés_
*├─KO:* _Coreano_
*├─LA:* _Latín_
*├─FR:* _Francés_
*├─HI:* _Hindi (Hindú)_
*├─PT:* _Portugués_
*├─RU:* _Ruso_
*├─VI:* _Vietnamita_
*╰─ZH:* _Chino_

*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*
_*Otros Idiomas Soportados:*_

*╭─AF:* _Afrikaans_
*├─CA:* _Catalán_
*├─CS:* _Checo_
*├─CY:* _Galés_
*├─DA:* _Danés_
*├─EL:* _Griego (moderno)_
*├─EO:* _Esperando_
*├─FI:* _Finés (Finlandés)_
*├─HR:* _Croata_
*├─HU:* _Húngaro_
*├─HY:* _Armenio_
*├─IS:* _Islandés_
*├─LV:* _Letón_
*├─MK:* _Macedonio_
*├─NL:* _Neerlandés (Holandés)_
*├─NO:* _Noruego_
*├─PL:* _Polaco_
*├─RO:* _Rumano_
*├─SK:* _Eslovaco_
*├─SR:* _Serbio_
*├─SQ:* _Albanés_
*├─SV:* _Sueco_
*├─SW:* _Suajili_
*├─TA:* _Tamil_
*├─TH:* _Tailandés_
*╰─TR:* _Turco_
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*

 _❍⌇─➭ Recomendaciones:_
_Si deseas conocer el funcionamineto del comando Texto a Voz por favor escribe: *${prefix}tts* y sigue las instrucciones._
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`

exports.voz2List = (inf) => `${inf}

*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*
Lista de Idiomas soportados por  VOZ2
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*

_*Idiomas mas populares:*_

*╭─AR:* _Árabe_
*├─DE:* _Alemán_
*├─EN:* _Inglés_
*├─ES:* _Español (Castellano)_
*├─ID:* _Indonesio_
*├─IT:* _Italiano_
*├─JA:* _Japonés_
*├─KO:* _Coreano_
*├─LA:* _Latín_
*├─FR:* _Francés_
*├─HI:* _Hindi (Hindú)_
*├─PT:* _Portugués_
*├─RU:* _Ruso_
*├─VI:* _Vietnamita_
*╰─ZH:* _Chino_

*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*
_*Otros Idiomas Soportados:*_

*╭─AF:* _Afrikaans_
*├─CA:* _Catalán_
*├─CS:* _Checo_
*├─CY:* _Galés_
*├─DA:* _Danés_
*├─EL:* _Griego (moderno)_
*├─EO:* _Esperando_
*├─FI:* _Finés (Finlandés)_
*├─HR:* _Croata_
*├─HU:* _Húngaro_
*├─HY:* _Armenio_
*├─IS:* _Islandés_
*├─LV:* _Letón_
*├─MK:* _Macedonio_
*├─NL:* _Neerlandés (Holandés)_
*├─NO:* _Noruego_
*├─PL:* _Polaco_
*├─RO:* _Rumano_
*├─SK:* _Eslovaco_
*├─SR:* _Serbio_
*├─SQ:* _Albanés_
*├─SV:* _Sueco_
*├─SW:* _Suajili_
*├─TA:* _Tamil_
*├─TH:* _Tailandés_
*╰─TR:* _Turco_
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*

 _❍⌇─➭ Recomendaciones:_
_Si deseas conocer el funcionamineto del comando VOZ2 por favor escribe: *${prefix}voz2* y sigue las instrucciones._
*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`