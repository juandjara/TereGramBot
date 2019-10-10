'use strict';

const { Composer, Extra, reply } = require('micro-bot');
const bot = new Composer();

const utils = require('./utils');

const teres = require('./teres.json');
const pkg = require('./package.json');

const {
  cage,
  cat,
  dog,
  donger,
  hiddenMessage,
  messageListener,
  yesno
} = require('./features');

const commandDoc = [
  {
    command: '/help',
    description: 'Lista de comandos disponibles (esta lista)',
    shortDescription: 'Lista de comandos'
  },
  {
    command: '/echo',
    description: 'Recibe un texto y lo repite',
    shortDescription: 'Repite un mensaje'
  },
  {
    command: '/answer_of_life',
    description: 'Cual es la respuesta a la pregunta del sentido de la vida, el universo y todo lo demas',
    shortDescription: 'Respuesta del sentido de la vida, el universo y todo lo demás'
  },
  {
    command: '/cage',
    description: 'Fotos de Nic Cage, ¿qué sería de nosotros sin él?',
    shortDescription: 'Animalitos'
  },
  {
    command: '/cat',
    description: 'Fotos de gatos, el nucleo de internet',
    shortDescription: 'Gatitos'
  },
  {
    command: '/dog',
    description: 'Fotos de perros, porque no discriminamos',
    shortDescription: 'Perretes'
  },
  {
    command: '/yesno',
    description: 'Por si no sabes si debieras hacer algo',
    shortDescription: '¿Sí o no, Tere?'
  },
  {
    command: '/repo',
    description: 'Enlace al repositorio de GitHub de este bot',
    shortDescription: 'Enlace al repositorio'
  },
  {
    command: '/status',
    description: 'Comprueba el estado de Tere',
    shortDescription: 'Tere, ¿estás viva?'
  },
  {
    command: '/donger',
    description: '( ͡° ͜ʖ ͡°). Puedes pasar un id despues del comando. Si no se seleccionara un donger aleatorio',
    shortDescription: 'Envía uno'
  },
  {
    command: '/flame',
    description: 'illo callarse',
    shortDescription: 'Illo callarse'
  },
  {
    command: '/hiddenmsg',
    description: 'Uy, esto no se para qué es...',
    shortDescription: 'Repite disimulá'
  }
];
const helpText = commandDoc
  .map(c => `${c.command} ${c.description}`)
  .join('\n');
const answerOfLife = 'Error code: *42*';

const startMsg = `
  Hola. Soy Tere. Tere Gram. Version ${pkg.version}
  Usa /help para ver los comandos disponibles
`;

bot.command('/start', reply(startMsg));
bot.command('/help', reply(helpText));
bot.command('/echo', ({ reply, message }) => {
  const msg = message.text
    .replace('/echo', '')
    .replace('@tere_gram_bot', '');
  reply(msg);
});
bot.command('/status', ({ reply }) => reply(utils.randomChoice(teres)));
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()));
bot.command('/repo', reply('https://github.com/juandjara/teregrambot'));
bot.command('/flame', reply('illo chavale callarse que sus baneo a tos'));
bot.command('/cage', cage);
bot.command('/cat', cat);
bot.command('/dog', dog);
bot.command('/donger', donger);
bot.command('/hiddenmsg', hiddenMessage.commandExecuter);
bot.command('/yesno', yesno);
bot.command('/godfather', ({ reply }) => {
  const commandText = commandDoc
    .map(command => `${command.command.substring(1)} - ${command.shortDescription}`)
    .join('\n');
  return reply(commandText);
});

bot.on(
  'message',
  (ctx) => {
    const originalChatID = ctx.chat.id;
    const senderID = ctx.message.from.id;

    if (originalChatID === senderID) {
      hiddenMessage.send(ctx);
    } else {
      messageListener.greetings(ctx);
      messageListener.farewell(ctx);
      messageListener.replies(ctx);
    }
  }
);

module.exports = bot;
