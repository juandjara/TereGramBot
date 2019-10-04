'use strict';

const axios = require('axios');
const donger = require('cool-ascii-faces');
const { Telegram, Composer, Extra, reply } = require('micro-bot');
const bot = new Composer();

const hiddenmessage = require('./features/hiddenmessage');
const pkg = require('./package.json');

const teres = require('./teres.json');

const loremCat = 'http://thecatapi.com/api/images/get';
const commandDoc = [
  {command: '/help', description: 'Lista de comandos disponibles (esta lista)'},
  {command: '/echo', description: 'Recibe un texto y lo repite'},
  {
    command: '/answer_of_life',
    description: 'Cual es la respuesta a la pregunta del sentido' +
    ' de la vida, el universo y todo lo demas',
  },
  {command: '/cat', description: 'Fotos de gatos, el nucleo de internet'},
  {
    command: '/repo',
    description: 'Enlace al repositorio de GitHub de este bot'},
  {command: '/status', description: 'Comprueba el estado de Tere'},
  {
    command: '/donger',
    description: '( ͡° ͜ʖ ͡°). Puedes pasar un id despues del ' +
    'comando. Si no se seleccionara un donger aleatorio',
  },
  {command: '/flame', description: 'illo callarse'},
  {command: '/hiddenmsg', description: 'Uy, esto no se para qué es...'},
];
const helpText = commandDoc
  .map(c => `${c.command} ${c.description}`)
  .join('\n');
const answerOfLife = 'Error code: *42*';
const randomChoice = (choices) => {
  const probMethod = Math.random();
  if (probMethod < 0.5) return randomByDate(choices);
  else return randomByMath(choices);

  // const randomIndex = Date.now() % choices.length;
  // return choices[randomIndex];
};
const randomByMath = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)];
};
const randomByDate = (choices) => {
  return choices[Date.now() % choices.length];
};

const chanante = ['Es veneno!', 'A canela!'];
const startMsg = `Hola. Soy Tere. Tere Gram. Version ${pkg.version} `
    + 'Usa /help para ver los comandos disponibles';

bot.command('/start', reply(startMsg));
bot.command('/help', reply(helpText));
bot.command('/echo', ({reply, message}) => {
  const msg = message.text
    .replace('/echo', '')
    .replace('@tere_gram_bot', '');
  reply(msg);
});
bot.command('/donger', ({message, reply}) => {
  const commandHasIndex = /\/donger \d+$/.exec(message.text);
  let selectedDonger;
  let dongerIndex;
  if (commandHasIndex) {
    dongerIndex = parseInt(/\d+$/.exec(message.text)[0], 10);
    if (dongerIndex >= donger.faces.length) {
      reply(`Solo hay ${donger.faces.length - 1} dongers :c`);
      return;
    }
    selectedDonger = donger.faces[dongerIndex];
  } else {
    selectedDonger = donger();
    dongerIndex = donger.faces.indexOf(selectedDonger);
  }
  const msg = `
    Donger ${dongerIndex}:
    ${selectedDonger}
  `;
  reply(msg);
});
bot.command('/status', ({reply}) => reply(randomChoice(teres)));
bot.command('/cat', async({replyWithPhoto}) => {
  const res = await axios.get(loremCat);
  const trueCatUrl = res.request.res.responseUrl;
  replyWithPhoto(trueCatUrl);
});
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()));
bot.command('/repo', reply('https://github.com/juandjara/teregrambot'));
bot.command('/flame', reply('illo chavale callarse que sus baneo a tos'));
bot.command('/hiddenmsg', hiddenmessage);

bot.on('message',
  ({reply, message, chat, telegram, deleteMessage, botInfo}) => {
    const [originalChatID, senderID] = [chat.id, message.from.id];
    let {
      new_chat_members,
      left_chat_member,
      text,
    } = message;

    if (originalChatID === senderID) {
      const {reply_to_message} = message;
      if (reply_to_message) {
        const originID = reply_to_message.text.match(/{{(.+?)}}/);
        if (originID && originID[1]) {
          deleteMessage(reply_to_message.message_id);
          telegram.sendMessage(originID[1], text);
        } else {
          reply('Con esto no puedo hacer yo ná!');
        }
      }
    } else {
      if (new_chat_members) {
        new_chat_members.forEach(user => {
        // check if the user has an ID created
          let username = '';
          if (user.username) {
            username = `@${user.username}`;
          } else {
            username = `${user.first_name}`;
          }

          if (user.id !== botInfo.id) {
            const msg = `Illo que pasa ${username}`;
            reply(msg);
          } else {
            reply('Hola gente! Soy Tere, una robot andalusí.');
          }
        });
      }
      if (left_chat_member) {
        let username = '';
        if (left_chat_member.username) {
          username = `@${left_chat_member.username}`;
        } else {
          username = `${left_chat_member.first_name}`;
        }

        reply(`Enga nos vemo ${username}`);
      }
      if (/\bve+ne+no+\b/i.test(text)) {
        reply(chanante[0]);
      } else if (/\bca+ne+la+\b/i.test(text)) {
        reply(chanante[1]);
      } else if (/\bt+e+r+e+\b/i.test(text)) {
        reply(randomChoice(teres));
      }
    }
  });

module.exports = bot;
