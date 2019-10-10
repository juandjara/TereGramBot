'use strict';

const donger = require('cool-ascii-faces');

const selectDonger = (dongerIndex) => {
  
  if (dongerIndex === undefined) {
    const value = donger();
    return {value, index: donger.faces.indexOf(value)}
  }
  
  if (dongerIndex >= donger.faces.length) {
     throw "Index bigger than dongers length";
  }
  
  return {value: donger.faces[dongerIndex], index: dongerIndex}
};

module.exports = ({message, reply}) => {
  try {  
    const {groups: {index}} = /\/donger\s?(?<index>\d+)?$/.exec(message.text);
    const selectedDonger = selectDonger(index);
    
    return reply(`
      Donger ${selectedDonger.index}:
      ${selectedDonger.value}
    `);
    
  } catch(err) {
    console.log(err);
    return reply(`Solo hay ${donger.faces.length - 1} dongers :c`);
  }
};
