import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `*${emojis} Por favor, ingresa una búsqueda de YouTube.*`, m, rcanal);

    try {
        conn.reply(m.chat, wait, fkontak, m);

        let results = await yts(text);
        let tes = results.all;

        if (!tes || tes.length === 0) {
            return conn.reply(m.chat, `No se encontraron resultados para *${text}*`, m);
        }

        // Formateamos los resultados obtenidos
        let teks = tes.map(v => {
            switch (v.type) {
                case 'video':
                    return `*「🌷」Resultados de la búsqueda para:*\n<${text}>\n\n☁️ *Título:* ${v.title}\n📡 *Canal* ${v.author.name}\n*🕝 Duración:* ${v.timestamp}\n📆 *Subido:* ${v.ago}\n👀 *Vistas:* ${v.views}\n🔗 *Enlace* ${v.url}`;
            }
        }).filter(v => v).join('\n\n*┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n');

        // Si existen resultados, enviamos el primero junto con la información
        if (tes.length > 0) {
            conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m);
        }

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.', m);
    }
}

handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['youtubesearch', 'ytsearch', 'yts']

handler.register = true

export default handler