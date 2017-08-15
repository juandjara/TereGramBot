const axios = require('axios')
const donger = require('cool-ascii-faces')
const { Composer, Extra, reply } = require('micro-bot')
const bot = new Composer()

const loremCat = 'http://thecatapi.com/api/images/get'
const commandDoc = [
  {command: '/help', description: 'Lista de comandos disponibles (esta lista)'},
  {command: '/echo', description: 'Recibe un texto y lo repite'},
  {command: '/answer_of_life', description: 'Cual es la respuesta a la pregunta del sentido de la vida, el universo y todo lo demas'},
  {command: '/cat', description: 'Fotos de gatos, el nucleo de internet'},
  {command: '/repo', description: 'Enlace al repositorio de GitHub de este bot'},
  {command: '/status', description: 'Comprueba el estado de Tere'},
  {command: '/donger', description:  '( ͡° ͜ʖ ͡°). Puedes pasar un id despues del comando. Si no se seleccionara un donger aleatorio'}
]
const helpText = commandDoc
  .map(c => `${c.command} ${c.description}`)
  .join('\n')
const answerOfLife = "Error code: *42*"
const randomChoice = (choices) => {
  const randomIndex = Date.now() % choices.length
  return choices[randomIndex]
}
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
  'que me dehe'
]
const startMsg = 'Hola. Soy Tere. Tere Gram. Usa /help para ver los comandos disponibles'

bot.command('/start', reply(startMsg))
bot.command('/help', reply(helpText))
bot.command('/echo', ({reply, message}) => {
  const msg = message.text
    .replace('/echo', '')
    .replace('@tere_gram_bot', '')
  reply(msg)
})
bot.command('/donger', ({message, reply}) => {
  const commandHasIndex = /\/donger \d+$/.exec(message.text);
  let selectedDonger;
  let dongerIndex;
  if(commandHasIndex) {
    dongerIndex = parseInt(/\d+$/.exec(message.text)[0])
    if(dongerIndex >= donger.faces.length) {
      reply(`Solo hay ${donger.faces.length - 1} dongers :c`)
      return
    }
    selectedDonger = donger.faces[dongerIndex]
  } else {
    selectedDonger = donger()
    dongerIndex = donger.faces.indexOf(selectedDonger)
  }
  const msg = `
    Donger ${dongerIndex}:
    ${selectedDonger}
  `
  reply(msg)
})
bot.command('/status', ({reply}) => reply(randomChoice(teres)))
bot.command('/cat', async ({replyWithPhoto}) => {
  const res = await axios.get(loremCat)
  const trueCatUrl = res.request.res.responseUrl
  replyWithPhoto(trueCatUrl)
})
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()))
bot.command('/repo', reply('https://github.com/juandjara/teregrambot'))
bot.on('message', ({reply, message}) => {
  const { 
    new_chat_members, 
    left_chat_member,
    text
  } = message
  if(new_chat_members) {
    new_chat_members.forEach(user => {
      const msg = `Illo que pasa @${user.username}`
      if(user.username === 'tere_gram_bot') {
        msg = startMsg
      }
      reply(msg)
    })
  }
  if(left_chat_member) {
    reply(`Enga nos vemo ${left_chat_member.username}`)
  }
  if(/(\s|^)[Tt]tere(\s|$)/.test(text)) {
    reply(randomChoice(teres))
  }
})

module.exports = bot
