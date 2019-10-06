'use strict';

const axios = require('axios');
const loremCat = 'http://thecatapi.com/api/images/get';

module.exports = async({replyWithPhoto}) => {
  const res = await axios.get(loremCat);
  const trueCatUrl = res.request.res.responseUrl;
  replyWithPhoto(trueCatUrl);
};
