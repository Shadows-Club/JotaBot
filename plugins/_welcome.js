import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }
  let insta = `https://instagram.com/dev.criss_vx`
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = `¡Bienvenid@! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`
  let txt1 = `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`
  let txt2 = `Se salió ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo.`

  let sunflare = `Credits to Sunflare Team ⛅`
  let sunflare1 = `Credits to Shadow′s Club 🌹`
  let sunflare2 = `Credits to Dev.Criss 🇦🇱`

if (chat.welcome && m.messageStubType == 27) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  const msgsWelcome = [
    `┏─────────────────┐
「 ${taguser} 」
𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙓 😊
𝑫𝒊𝒔𝒇𝒓𝒖𝒕𝒂 𝒅𝒆 𝒕𝒖 𝒆𝒔𝒕𝒂𝒅𝒊𝒂 𝒓𝒆𝒄𝒖𝒆𝒓𝒅𝒂 𝒄𝒖𝒎𝒑𝒍𝒊𝒓 𝒍𝒂𝒔 𝒓𝒆𝒈𝒍𝒂𝒔 𝒚 𝒍𝒆𝒆𝒓 l𝒂 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐𝒏 ✨

└───── *${botname}* ─────┘`,
    `┏━━━━━━━━━━━━
┃──〘 *𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗫* 〙───
┃━━━━━━━━━━━━
┃ *_${emojis} 𝗘𝗡𝗧𝗥𝗢   ${taguser}_* 
┃ *_Un gusto tenerte aqui_*
┃ *_Disfruta tu estadía 😇_*
┗━━━ *${botname}* ━━━━`
  ]


  let bienvenida = chat.sWelcome
    ? chat.sWelcome
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : msgsWelcome[Math.floor(Math.random() * msgsWelcome.length)]

  await conn.sendLuffy(m.chat, txt, sunflare, bienvenida, img, img, channel, estilo)
}

if (chat.welcome && m.messageStubType == 28) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  let ban = chat.sKick
    ? chat.sKick
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : `┌─★ *${botname}* 
│「 ADIOS 👋 」
└┬★ 「 ${taguser} 」
   │☠️ *Acabas de ser escupido por puta planta*
   │💫 *Ni modo, hasta luego...*
   └────────┈ ⳹`    
    await conn.sendLuffy(m.chat, txt1, sunflare1, ban, img, img, insta, estilo)
  }

if (chat.welcome && m.messageStubType == 32) {
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  const msgsBye = [
    `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈≫*
*┊* *${taguser}*
*┊𝗧𝗨 𝗔𝗨𝗦𝗘𝗡𝗖𝗜𝗔 𝗙𝗨𝗘 𝗖𝗢𝗠𝗢 𝗨𝗡 𝗤𝗟𝗢,* 
*┊𝗖𝗢𝗡 𝗢𝗟𝗢𝗥 𝗔 𝗠𝗥𝗗!!* 👿
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫*`,
    `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈≫*
*┊* *${taguser}*
*┊𝗔𝗟𝗚𝗨𝗜𝗘𝗡 𝗠𝗘𝗡𝗢𝗦, 𝗤𝗨𝗜𝗘𝗡 𝗧𝗘 𝗥𝗘𝗖𝗨𝗘𝗥𝗗𝗘* 
*┊𝗦𝗘𝗥𝗔 𝗣𝗢𝗥 𝗟𝗔𝗦𝗧𝗜𝗠𝗔, 𝗔𝗗𝗜𝗢𝗦!!* 👿
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫*`,
    `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈≫*
*┊* *${taguser}*
*┊𝗧𝗨 𝗗𝗘𝗦𝗣𝗘𝗗𝗜𝗗𝗔 𝗡𝗢𝗦 𝗛𝗔𝗥𝗔 𝗟𝗟𝗢𝗥𝗔𝗥,* 
*┊𝗗𝗘 𝗟𝗔 𝗩𝗘𝗥𝗚𝗨𝗘𝗡𝗭𝗔 𝗤𝗨𝗘 𝗗𝗔𝗕𝗔𝗦!!* 👿
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫*`,
    `*╭┈┈┈┈┈┈┈┈┈┈┈┈┈≫*
*┊* *${taguser}*
*┊𝗗𝗘𝗝𝗢 𝗗𝗘 𝗢𝗟𝗘𝗥 𝗔 𝗠𝗥𝗗,* 
*┊𝗛𝗔𝗦𝗧𝗔 𝗤𝗨𝗘 𝗧𝗘 𝗟𝗔𝗥𝗚𝗔𝗦𝗧𝗘!!* 👿
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈≫*`
  ]

  let bye = chat.sBye
    ? chat.sBye
        .replace(/@user/g, taguser)
        .replace(/@group/g, groupName)
        .replace(/@desc/g, groupDesc)
    : msgsBye[Math.floor(Math.random() * msgsBye.length)]

    await conn.sendLuffy(m.chat, txt1, sunflare2, bye, img, img, grupo, estilo)
  }}
