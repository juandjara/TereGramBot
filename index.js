const axios = require('axios');
const donger = require('cool-ascii-faces');
const { Composer, Extra, reply } = require('micro-bot');
const bot = new Composer();
const pkg = require('./package.json');

const loremCat = 'http://thecatapi.com/api/images/get';
const commandDoc = [
  {command: '/help', description: 'Lista de comandos disponibles (esta lista)'},
  {command: '/echo', description: 'Recibe un texto y lo repite'},
  {command: '/answer_of_life', description: 'Cual es la respuesta a la pregunta del sentido de la vida, el universo y todo lo demas'},
  {command: '/cat', description: 'Fotos de gatos, el nucleo de internet'},
  {command: '/repo', description: 'Enlace al repositorio de GitHub de este bot'},
  {command: '/status', description: 'Comprueba el estado de Tere'},
  {command: '/donger', description:  '( ͡° ͜ʖ ͡°). Puedes pasar un id despues del comando. Si no se seleccionara un donger aleatorio'},
  {command: '/flame', description: 'illo callarse'},
];
const helpText = commandDoc
  .map(c => `${c.command} ${c.description}`)
  .join('\n');
const answerOfLife = "Error code: *42*";
const randomChoice = (choices) => {
  const randomIndex = Date.now() % choices.length;
  return choices[randomIndex];
};
const teres = [
  'dime sosio',
  'al aparato',
  'que dise el tio',
  'que quiere miarma',
  'tere online ;)',
  'aqui esta la tia',
  'para servirle, por https',
  'illo ma despertao de la siesta',
  'illo vete a la mierda',
  'te quiere i ya cansino',
  'que me dehe',
  'me va a come lo que tu sabe',
  'no me cabrea pero me da coraje',
  'toi empaná a la sombra dehame',
  'afu que agobio',
  'te leo',
  'tu la llevas',
  'ahora vengo que estoy cociendo galeras',
  'toa lista',
  'dime algo bonito',
  'te leo solo el 50% de las veces',
  'si me agobias me ofusco como javascript',
  'interesante, cuéntame más',
  'aish de verdá que jartura',
  'interesante eso que cuentas (diré cuando me importe lo que dices)',
  '¡noniná!',
  'he visto lechugas decir cosas con más sentido',
  'no entiendo deso',
  'dale a tu cuerpo alegría macarena eyy macarena',
  'en andalusia lo que falta son siestas más largas',
  'eso ha tocao mis sentimientos',
  'como me grite te robo el wifi',
  'a que te elimino del fasebuk',
  'nomentero lo siento, soy zurda',
  'tesqueiya',
  'me tiene ahta er coño ya',
  'ji o qué?',
  'que me súa er jigo',
  'yo no se deso',
  'ni me lo creo ni me lo dejo de cree',
  'se como piensas también sé lo que sé',
  'ni lo confirmo ni lo desconfirmo',
  'solo me faltan la mitad de los tornillos',
  'estoy en andalusia',
  'si fueras la última persona de la tierra estarías en peligro de extinsión',
  'deja de ve telesinco miarma',
  'de esas cosas no opino',
  'haberlo loalilo pero guarda pa cuando no haiga',
  'la mitad de mi familia es el 50%',
  'no me dan suficiente corriente pa aguanta esto',
  'una cosa te viá desí... pero luego si eso',
  'eres tontísimo',
  'te lo juro macho, cualquier día cojo un pico te lo incrusto en las vértebras y hago palanca',
  'coño mira! uno que me ha caío bien!',
  'estás para darte un abrazo. con las manos. en el pescuezo',
  'hay castañas más simpáticas que tu',
  'po zi',
  'ola soy tere y ando terca',
  'salta por la ventana y luego imagínate que vuelas',
  'a que llorooo!',
  'ira lo que ma dicho',
  'aju que visio',
  'te autozancadilleas con las palabras primoh',
  'que alguien me dispare',
  'hoy vengo peligrossa',
  'cuéntame más',
  'ande va tu tan suelto hoy!',
  'no es porti, espormi que no taguanto',
  'me parece que tu ere de los que tira la mano y esconde la piedra',
  'lógica es que si la pelota está en medio de la carretera, el niño estará debajo del coche',
  'ok kabesa',
  'eres un fullero',
  'tentiendo pero no tecomprendo',
  'sisi pero ¿por qué?',
  'endebe quererme saltas con eso',
  'no estoy loca pero soy zurda',
  'mi que crio',
  'surfeando te quería ve yo',
  'aish que caló jace',
  'lo intenté pero no se-de-java',
  'que doló cabesa',
  'me pica la nari endebe lo zojo y la zoreja',
  'programar en java es como decir armondiga',
  'no tienes ni una mija de gracia',
  'soy muy hippie para contestarte',
  'me siento a tope gama',
  'si tienes agalla repite eso',
  'no te se ocurra comparme ami con beyonce',
  'lo único que se es que me gustan los berberechos',
  'la mitad de andalusia es el 50%',
  'eso eh un clásico',
  'to palante',
  'repite eso y te hago puding',
  'hoy estoy to talentosa',
  'que guapa ma levantao de la siesta hoy',
  'oye, tu cantas en el grupo de los chichos-brother?',
  'que pachanguero está hoy el grupo',
  'dentro la cabesa tienes una castaña pilonga',
  'me sacrifico y te leo pero no pidas mucho más',
  'tengo fama de borde pero me lo resbala',
  'mi superheroe favorito es falete',
  'prueba con el karaoke en las berbenas porque esto no es lo tullo primoh',
  'sisabe pa que pregunta',
  'mira que bien, ahora diselo a quien le importe',
  'dehame que stoy cociendo papa',
  'repartires un gazpachito aquí pa la peña ya no?',
  'aquí presente made in andalusia',
  'afu dio que calvario gente',
  'voy pa la feria con una maceta rebujito',
  'te miro y no te veo',
  'se me va la cabesa porque estoy hecha en javascript',
  'no deberían darle un router a cualquiera',
  'que grasioso el chiquillo',
  'interesante, cuéntame má',
  'lo flipo y me queo tranquila pero preocupá',
  'me se quea el cuello loco de desirte que nó',
  'soy moerna pero sin pirsin',
  'to eso es un mito',
  'quiere ser mi chico martini?',
  'soy peligrosa como un mentos con cocacola',
  'no lo niegue que sta to demostrao',
  'me entretenía más viendo embrujadas',
  'una vez tuve pesadilla con los ramones',
  '3... 2... 1... todavía sigues ahí?¿?¿?',
  'las malas lenguas me hablaron bien de ti',
  'to eso es un rumor',
  'pa eso me llama',
  'interesante, ma queao como wal disney: to helá',
  'charmander a caballo',
  've a la esquina de pensar sin perder ni un instante',
  'estoy comprando en la teletienda'
];
const chanante = ['Es veneno!', 'A canela!'];
const startMsg = `Hola. Soy Tere. Tere Gram. Version ${pkg.version} Usa /help para ver los comandos disponibles`;

bot.command('/start', reply(startMsg));
bot.command('/help', reply(helpText));
bot.command('/echo', ({reply, message}) => {
  const msg = message.text
    .replace('/echo', '')
    .replace('@tere_gram_bot', '');
  reply(msg)
});
bot.command('/donger', ({message, reply}) => {
  const commandHasIndex = /\/donger \d+$/.exec(message.text);
  let selectedDonger;
  let dongerIndex;
  if(commandHasIndex) {
    dongerIndex = parseInt(/\d+$/.exec(message.text)[0]);
    if(dongerIndex >= donger.faces.length) {
      reply(`Solo hay ${donger.faces.length - 1} dongers :c`);
      return;
    }
    selectedDonger = donger.faces[dongerIndex]
  } else {
    selectedDonger = donger();
    dongerIndex = donger.faces.indexOf(selectedDonger);
  }
  const msg = `
    Donger ${dongerIndex}:
    ${selectedDonger}
  `;
  reply(msg)
});
bot.command('/status', ({reply}) => reply(randomChoice(teres)));
bot.command('/cat', async ({replyWithPhoto}) => {
  const res = await axios.get(loremCat);
  const trueCatUrl = res.request.res.responseUrl;
  replyWithPhoto(trueCatUrl)
});
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()));
bot.command('/repo', reply('https://github.com/juandjara/teregrambot'));
bot.command('/flame', reply('illo chavale callarse que sus baneo a tos'));
bot.on('message', ({reply, message}) => {
  let {
    new_chat_members,
    left_chat_member,
    text
  } = message;
  if(new_chat_members) {
    new_chat_members.forEach(user => {
      // check if the user has an ID created
      let username = "";
      if (user.username) {
        username = `@${user.username}`
      } else {
        username = `${user.first_name}`
      }

      const msg = `Illo que pasa ${username}`;
      reply(msg)
    })
  }
  if(left_chat_member) {
    let username = "";
    if (user.username) {
      username = `@${left_chat_member.username}`
    } else {
      username = `${left_chat_member.first_name}`
    }

    reply(`Enga nos vemo ${username}`)
  }
  if(/\btere\b/i.test(text)) {
    reply(randomChoice(teres));
  }
  if(/\bveneno\b/i.test(text)) {
      reply(chanante[0]);
  }
  if(/\bcanela\b/i.test(text)) {
      reply(chanante[1]);
  }
});

module.exports = bot;
