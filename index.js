const { Composer, Extra, reply } = require('micro-bot')
const bot = new Composer()

const loremCat = 'http://thecatapi.com/api/images/get'
const commandDoc = [
  {command: '/help', description: 'Lista de comandos disponibles (esta lista)'},
  {command: '/echo', description: 'Recibe un texto y lo repite'},
  {command: '/answer_of_life', description: 'Cual es el sentido de la vida'},
  {command: '/cat', description: 'Fotos de gatos, el nucleo de internet'}
]
const helpText = commandDoc
  .map(c => `${c.command} ${c.description}`)
  .join('\n')
const answerOfLife = `
  *42* es es sentido de la vida, el universo y *todo lo demas*`

bot.command('/start', reply('Hola. Soy Tere. Tere Gram. Usa /help para ver los comandos disponibles'))
bot.command('/help', reply(helpText))
bot.command('/echo', ({reply, message}) => {
  reply(message.text.replace('/echo', ''))
})
bot.command('/cat', ({replyWithPhoto}) => replyWithPhoto(loremCat))
bot.command('/answer_of_life', reply(answerOfLife, Extra.markdown()))
bot.on('message', ({reply, message}) => {
  const { 
    new_chat_members, 
    left_chat_member 
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