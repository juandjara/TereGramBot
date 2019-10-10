'use strict';

const axios = require('axios');
const dogCeo = 'https://dog.ceo/api/breeds/image/random';

module.exports = async({replyWithPhoto}) => {
  const res = await axios.get(dogCeo, {
    headers: {
        'Content-Type': 'application/json'
    }
  });
  
  const dogImgUrl = res.data.message;
  
  replyWithPhoto(dogImgUrl);
};
