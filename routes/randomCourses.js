const express = require('express');
const router = express.Router();
const moment = require('moment');
const {API_KEY, youtubeAPI, channelId}  = require('../static/api');
  
  const fetchActivities = async (apiKey) => {
    try {
      const response = await youtubeAPI.get(`/activities`, {
        params: {
          part: 'snippet,contentDetails,id',
          channelId,
          maxResults: 40,
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
        res.send(activities);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// export the router module so that index.js file can use it
module.exports = router;





//Function that shuffles the array element.
function  shuffle(arr) {
  let arrLength = arr.length;
  let temp;
  let index;
  while (arrLength > 0) {
    index = Math.floor(Math.random() * arrLength);
    arrLength--;
    temp = arr[arrLength];
    arr[arrLength] = arr[index];
    arr[index] = temp;
  }
  return arr;
}