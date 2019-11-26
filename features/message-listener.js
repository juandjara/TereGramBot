'use strict';

const utils = require('../utils');

const teres = require('../teres.json');
const chanante = ['Es veneno!', 'A canela!'];

const yesno = require('./yesno');

module.exports = {
  greetings: (ctx) => {
    const {message, botInfo, reply} = ctx;
    const {new_chat_members} = message;
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
  },

  farewell: (ctx) => {
    const {message, botInfo, reply} = ctx;
    const {left_chat_member} = message;


    if (left_chat_member) {
      if (left_chat_member.id !== botInfo.id) {
        let username = '';
        if (left_chat_member.username) {
          username = `@${left_chat_member.username}`;
        } else {
          username = `${left_chat_member.first_name}`;
        }

        reply(`Enga nos vemo ${username}`);
      }
    }
  },

  replies: (ctx) => {
    const {message, reply} = ctx;
    const {text} = message;

    if (/\bt+e+r+e+\b(?:.*)\?/i.test(text)) {
      yesno(ctx);
    } else if (/\bve+ne+no+\b/i.test(text)) {
      reply(chanante[0]);
    } else if (/\bca+ne+la+\b/i.test(text)) {
      reply(chanante[1]);
    } else if (/\bt+e+r+e+\b/i.test(text)) {
      reply(utils.randomChoice(teres));
    } else if (/\b([B-b]+u+m+ ){2}+[T-t]+e+r+e+\b/i.test(text)) {
      reply("Bum Bum!);
    }
  },
};
