'use strict';

const {Composer, Extra, reply} = require('micro-bot');
const bot = new Composer();

const teres = require('./teres.json');

const cat = require('./features/cat');
const donger = require('./features/donger');
const hiddenMessage = require('./features/hidden-message');
const messageListener = require('./features/message-listener');
const pkg = require('./package.json');


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
    description: 'Enlace al repositorio de GitHub de este bot',
  },
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
bot.command('/status', ({reply}) => reply(randomChoice(teres)));
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()));
bot.command('/repo', reply('https://github.com/juandjara/teregrambot'));
bot.command('/flame', reply('illo chavale callarse que sus baneo a tos'));
bot.command('/cat', cat);
bot.command('/donger', donger);
bot.command('/hiddenmsg', hiddenMessage.commandExecuter);

bot.on('message',
  (ctx) => {
    const {message, chat} = ctx;
    const [originalChatID, senderID] = [chat.id, message.from.id];

    if (originalChatID === senderID) {
      hiddenMessage.send(ctx);
    } else {
      messageListener.greetings(ctx);
      messageListener.farewell(ctx);
      messageListener.replies(ctx);
    }
  });

module.exports = bot;
