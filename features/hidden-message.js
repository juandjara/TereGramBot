'use strict';

const hiddenMessage = (ctx) => {
  const originalChat = ctx.chat.id;
  const sender = ctx.message.from.id;
  // ctx.deleteMessage:
  ctx.deleteMessage(ctx.message.id).catch(ignore => {
    ctx.reply('Cómo? Que no tengo permisos pa borrá mensahe?!\n' +
      'IRA ER HUAHO LA QUE MA LIAO');
  });
  try {
    ctx.telegram.sendMessage(sender,
      'Cítame este mensaje y dime qué quieres mandar por el grupo, anda.' +
      `{{${originalChat}}}`);
  } catch (e) {
    ctx.reply('Me vas a tener que hablar por privao, campeón.');
  }
};

const sendHiddenMessage = (ctx) => {
  const {reply, message, telegram, deleteMessage} = ctx;
  const {reply_to_message, text} = message;

  if (reply_to_message) {
    const originID = reply_to_message.text.match(/{{(.+?)}}/);
    if (originID && originID[1]) {
      deleteMessage(reply_to_message.message_id);
      telegram.sendMessage(originID[1], text);
    } else {
      reply('Con esto no puedo hacer yo ná!');
    }
  }
};

module.exports = {
  commandExecuter: hiddenMessage,
  send: sendHiddenMessage,
};
