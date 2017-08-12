const { Composer, Extra, reply } = require('micro-bot')
const bot = new Composer()

const loremCat = 'https://lorempixel.com/400/200/cats/'
const commands = {
  echo: ctx => ctx.reply(ctx.message.text.replace('/echo', '')),
  answer_of_life: reply(`
      *42* es es sentido de la vida el universo y *todo lo demas*
    `, Extra.markdown()),
  cat: ({replyWithPhoto}) => replyWithPhoto(loremCat),
}

bot.command('/start', reply('Usa /help para ver los comandos disponibles'))

Object.keys(commands).forEach(key => {
  bot.command(key, commands[key])
})

const helpText = ['Comandos disponibles', '/help']
  .concat(Object.keys(commands).map(c => "/"+c))
  .join('\n')

bot.command('/help', reply(helpText))

module.exports = bot