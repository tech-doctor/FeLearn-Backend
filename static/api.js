const axios = require('axios');
 const API_KEY = process.env.API_KEY
 const baseURL = process.env.BASE_URL

 const youtubeAPI = axios.create({
    baseURL
  });

  module.exports  = {
    baseURL,
    API_KEY,
    youtubeAPI
  };