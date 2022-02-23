const axios = require('axios');

axios.get('https://progressivebot.netlify.app/')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });