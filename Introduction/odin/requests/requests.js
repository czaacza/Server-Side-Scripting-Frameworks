const axios = require('axios');

// make a get request

axios
  .get('https://example.com/todos')
  .then((res) => {
    console.log(`status code: ${res.status}`);
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
