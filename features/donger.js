'use strict';

const donger = require('cool-ascii-faces');

module.exports = ({message, reply}) => {
  const commandHasIndex = /\/donger \d+$/.exec(message.text);
  let selectedDonger;
  let dongerIndex;
  if (commandHasIndex) {
    dongerIndex = parseInt(/\d+$/.exec(message.text)[0], 10);
    if (dongerIndex >= donger.faces.length) {
      reply(`Solo hay ${donger.faces.length - 1} dongers :c`);
      return;
    }
    selectedDonger = donger.faces[dongerIndex];
  } else {
    selectedDonger = donger();
    dongerIndex = donger.faces.indexOf(selectedDonger);
  }
  const msg = `
    Donger ${dongerIndex}:
    ${selectedDonger}
  `;
  reply(msg);
};
