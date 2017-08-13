const { Composer, Extra, reply } = require('micro-bot')
const bot = new Composer()

const loremCat = 'http://thecatapi.com/api/images/get'
const commandDoc = [
  {command: '/help', description: 'Lista de comandos disponibles (esta lista)'},
  {command: '/echo', description: 'Recibe un texto y lo repite'},
  {command: '/answer_of_life', description: 'Cual es la respuesta a la pregunta del sentido de la vida, el universo y todo lo demas'},
  {command: '/cat', description: 'Fotos de gatos, el nucleo de internet'},
  {command: '/repo', description: 'Enlace al repositorio de GitHub de este bot'}
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
  'illo ma despertao de la siesta'
]

bot.command('/start', reply('Hola. Soy Tere. Tere Gram. Usa /help para ver los comandos disponibles'))
bot.command('/help', reply(helpText))
bot.command('/echo', ({reply, message}) => {
  reply(message.text.replace('/echo', ''))
})
bot.command('/status', ({reply}) => reply(randomChoice(teres)))
bot.command('/cat', ({replyWithPhoto}) => replyWithPhoto(loremCat))
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
      reply(`Illo que pasa @${user.username}`)
    })
  }
  if(left_chat_member) {
    reply(`Enga nos vemo ${left_chat_member.username}`)
  }
})

module.exports = bot