
import axios from "axios";

let handler = async (m, { conn, command }) => {
    const comprar = 'https://files.catbox.moe/s8rz70.png';

    await m.react(command === 'vendedor' ? '📞' : '🛒');

    if (command === 'vendedor') {
        let username = await conn.getName(m.sender);

        await conn.sendMessage(m.chat, {
            text: `👤 *Hola ${username}*\n\nAquí tienes el contacto del dueño para adquirir el bot *${botname}*.\nPuedes escribirle para más detalles.`
        }, { quoted: m });

        // Enviar contacto
        let list = [{
            displayName: "Jota",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Jota\nitem1.TEL;waid=573155227977:573155227977\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: novaspark.community@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/nohayxd\nitem3.X-ABLabel:Instagram\nitem4.ADR:;; Perú;;;;\nitem4.X-ABLabel:Región\nEND:VCARD`,
        }];

        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: `${list.length} Contacto`,
                contacts: list
            }
        }, { quoted: m });

        return;
    }

    // Enviar imagen con botón si el comando es .precios
    const buttons = [
        {
            buttonId: `.vendedor`,
            buttonText: { displayText: "Comprar 🛍️" },
            type: 1
        }
    ];

    await conn.sendMessage(
        m.chat,
        {
            image: { url: comprar },
            caption: botname,
            footer: dev,
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ["precios", "vendedor"];
handler.tags = ["info"];
handler.command = /^(precios|vendedor)$/i;

export default handler;