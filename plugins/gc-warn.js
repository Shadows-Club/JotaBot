/*const handler = async (m, { conn, text, command, usedPrefix }) => {
// if (m.mentionedJid.includes(conn.user.jid)) return; // Evitar advertir al bot mismo
const pp = './media/catalogo.jpg'
let number, ownerNumber, aa, who;
if (m.isGroup) { 
who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text; 
} else who = m.chat;
  const user = global.db.data.users[who];
  const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'Sin motivo';
  const msgtext = text || dReason 
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `${emoji} Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.`;
  if (!who) {
return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

for (let i = 0; i < global.owner.length; i++) {
ownerNumber = global.owner[i][0];
if (usuario.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
aa = ownerNumber + '@s.whatsapp.net'
await conn.reply(m.chat, `…`, m, { mentions: [aa] })
return
}}

  user.warn += 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} Recibio una advertencia en este grupo!.\nMotivo: ${sdms}\n*Advertencias: ${user.warn}/3*`, null, { mentions: [who] },
  );
  if (user.warn >= 3) {
    user.warn = 0;
    await m.reply(`${emoji} Te lo adverti varias veces!!!.\n*@${who.split`@`[0]}* Superaste las *3* advertencias, ahora seras eliminado/a.`, null, { mentions: [who] },
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/
/*
const handler = async (m, { conn, text, command, usedPrefix }) => {
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  } else {
    who = m.chat;
  }

  const warntext = `${emojis} Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.`;
  if (!who || typeof who !== 'string' || !who.includes('@s.whatsapp.net')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  if (who === conn.user.jid) return m.reply('❌ No puedes advertir al bot.');

  for (let i = 0; i < global.owner.length; i++) {
    const ownerNumber = global.owner[i][0] + '@s.whatsapp.net';
    if (who === ownerNumber) {
      await conn.reply(m.chat, `🚫 No puedes advertir a un propietario del bot.`, m, { mentions: [ownerNumber] });
      return;
    }
  }

  // Inicializa estructura por grupo si no existe
  const groupData = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  groupData.warn = groupData.warn || {};

  // Inicializa advertencias del usuario si no existen
  groupData.warn[who] = groupData.warn[who] || 0;

  // Incrementa advertencia
  groupData.warn[who] += 1;

  const motivo = text?.replace(/@\d+-?\d* /g, '') || 'Sin motivo';
  const warns = groupData.warn[who];

  await m.reply(`*@${who.split`@`[0]}* recibió una advertencia en este grupo!\n📄 Motivo: ${motivo}\n⚠️ Advertencias: ${warns}/3`, null, { mentions: [who] });

  if (warns >= 3) {
    groupData.warn[who] = 0; // Reiniciar contador solo en este grupo
    await m.reply(`${emoji} Te lo advertí varias veces!\n*@${who.split`@`[0]}* superaste las *3* advertencias, ahora serás eliminado/a.`, null, { mentions: [who] });
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/


const handler = async (m, { conn, text, command, usedPrefix }) => {
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  } else {
    who = m.chat;
  }

  const warntext = `⚠️ Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.`;
  if (!who || typeof who !== 'string' || !who.includes('@s.whatsapp.net')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  if (who === conn.user.jid) return m.reply('❌ No puedes advertir al bot.');

  for (let i = 0; i < global.owner.length; i++) {
    const ownerNumber = global.owner[i][0] + '@s.whatsapp.net';
    if (who === ownerNumber) {
      await conn.reply(m.chat, `🚫 No puedes advertir a un propietario del bot.`, m, { mentions: [ownerNumber] });
      return;
    }
  }

  // Inicializa la base si no existe
  const db = global.db.data;
  db['users-warn'] ??= {};

  const groupWarns = db['users-warn'][m.chat] ??= {};
  const userWarns = groupWarns[who] ??= { warns: 0, lastReason: '' };

  // Incrementar advertencia
  userWarns.warns++;
  userWarns.lastReason = text?.replace(/@\d+-?\d* /g, '') || 'Sin motivo';

  const warns = userWarns.warns;
  const motivo = userWarns.lastReason;

  await m.reply(`*@${who.split`@`[0]}* recibió una advertencia en este grupo!\n📄 Motivo: ${motivo}\n⚠️ Advertencias: ${warns}/3`, null, { mentions: [who] });

  if (warns >= 3) {
    groupWarns[who].warns = 0;
    await m.reply(`🚫 Te lo advertí varias veces!\n*@${who.split`@`[0]}* superaste las *3* advertencias, ahora serás eliminado/a.`, null, { mentions: [who] });
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;