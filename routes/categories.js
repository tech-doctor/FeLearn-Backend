const express = require('express');
const router = express.Router();
const moment = require('moment');
const {API_KEY, youtubeAPI}  = require('../static/api');
const { shuffle } = require('../static/functions');
const { htmlId, cssId ,javascriptId, jqueryId }  = require('../static/ids');


const fetchCategories = async (apiKey, categoriesId) => {
    try {
      const response = await youtubeAPI.get(`/playlistItems`, {
        params: {
            part: 'snippet,id',
            maxResults: 20,
            playlistId: categoriesId,
            key: apiKey
        }
      });
  
      const shuffledItems = shuffle(response.data.items);
      const finalResult = shuffledItems.map((item, index) => ({
        id: index + 1,
        key: item.id,
        publishedAt: moment(item.snippet.publishedAt).fromNow(),
        title: item.snippet.title,
        imageUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId.videoId,
        playlistId: item.snippet.playlistId,
        position: item.snippet.position + 1,
        newPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0'),
        oldPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') + 30,
        bestSelling: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') > 160 ? true:false
      }));
      return finalResult;

    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  };

//Define a route
router.get('/html', async(req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const htmlCategory = await fetchCategories(API_KEY, htmlId);
        res.send(htmlCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/css', async(req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const htmlCategory = await fetchCategories(API_KEY, cssId);
        res.send(htmlCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/javascript', async (req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const htmlCategory = await fetchCategories(API_KEY, javascriptId);
        res.send(htmlCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/jquery', async(req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const htmlCategory = await fetchCategories(API_KEY, jqueryId);
        res.send(htmlCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})


// export the router module so that server.js file can use it
module.exports = router;
