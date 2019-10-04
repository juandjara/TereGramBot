'use strict';


const hiddenmessage = (ctx) => {
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

module.exports = hiddenmessage;
