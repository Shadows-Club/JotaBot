let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/uogbz0.jpg'  

let nombre, foto, edit, newlink, status, admingp, noadmingp, aceptar
nombre = `*💫 ${usuario} HA CAMBIADO EL NOMBRE DEL GRUPO*`

foto = `*💫 ${usuario} HA CAMBIADO LA IMAGEN DEL GRUPO*`

edit = `*${usuario}*\n*AH PERMITIDO QUE ${m.messageStubParameters[0] == 'on' ? 'SOLO ADMINS' : 'TODOS'} PUEDAN CONFIGURAR EL GRUPO*`

newlink = `*El enlace del grupo ha sido restablecido*`

status = `*🐼 EL GRUPO AH SIDO ${m.messageStubParameters[0] == 'on' ? '`CERRADO` 🔒' : '`ABIERTO` 🔓'}*\n*POR ${usuario}*\n\n*🥱 AHORA ${m.messageStubParameters[0] == 'on' ? 'ESTAN CALLADOS NEGROS' : 'SIGAN EN LO SUYO PENDEJOS'}*`

admingp = `*💫 @${m.messageStubParameters[0].split`@`[0]} Ahora es admin del grupo*`

noadmingp =  `*🥱 @${m.messageStubParameters[0].split`@`[0]} Deja de ser admin en este grupo*`

aceptar = `*¡Ha llegado un nuevo participante al grupo!*\n\n◦ ✐ Grupo: *${groupMetadata.subject}*\n\n> ◦ ⚘ Bienvenido/a: @${m.messageStubParameters[0].split('@')[0]}\n\n> ◦ ✦ Aceptado por:
 @${m.sender.split('@')[0]}` 

if (chat.detect && m.messageStubType == 21) {
await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   

} else if (chat.detect && m.messageStubType == 22) {
await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 23) {
await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    

} else if (chat.detect && m.messageStubType == 25) {
await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect && m.messageStubType == 26) {
await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect2 && m.messageStubType == 27) {
await conn.sendMessage(m.chat, { text: aceptar, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 29) {
await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

return;
} if (chat.detect && m.messageStubType == 30) {
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

} else {
//console.log({ messageStubType: m.messageStubType,
//messageStubParameters: m.messageStubParameters,
//type: WAMessageStubType[m.messageStubType], 
//})
}}