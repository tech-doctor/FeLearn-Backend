const express = require('express');
const router = express.Router();
const moment = require('moment');
const { shuffle } = require('../static/functions');
const {API_KEY, youtubeAPI}  = require('../static/api');
const {channelId }= require('../static/ids');
  
  const fetchActivities = async (apiKey) => {
    try {
      const response = await youtubeAPI.get(`/activities`, {
        params: {
          part: 'snippet,contentDetails,id',
          channelId,
          // maxResults: 300,
          maxResults: 50,
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
        videoId: item.contentDetails.upload?.videoId || item.contentDetails.playlistItem?.resourceId.videoId,
        newPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0'),
        oldPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') + 30,
        bestSelling: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') > 160 ? true : false,
      }));
      return finalResult;

    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  };



  //Define a route
router.get('/', async (req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const activities = await fetchActivities(API_KEY);
        //const activities = youtubeAPI
        res.send(activities);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// export the router module so that index.js file can use it
module.exports = router;

