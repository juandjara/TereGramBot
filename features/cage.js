'use strict';

const apiLink = 'http://cageme.herokuapp.com/random';

module.exports = async({replyWithPhoto}) => {
  replyWithPhoto(`${apiLink}?rand=${Math.random()}`);
};
