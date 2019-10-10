'use strict';

const axios = require('axios');
const apiLink = 'https://yesno.wtf/api/';

module.exports = ({replyWithVideo}) => {
  axios.get(apiLink, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    const image = res.data.image;
    replyWithVideo(image);
  }).catch((error) => {
    console.error('Algo raro ha pasao...', error.response.data);
  });
};
