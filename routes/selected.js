const express = require('express');
const router = express.Router();
const moment = require('moment');
const {API_KEY, youtubeAPI}  = require('../static/api');
const { ISO8601toDuration } = require('../static/functions');
//const { htmlId, cssId ,javascriptId, jqueryId }  = require('../static/ids');


const courseId = 'ASn3jKTYu0I';
const fetchSelectedCourses = async (apiKey, id) => {
    try {
      const response = await youtubeAPI.get(`/videos`, {
        params: {
            part: 'snippet, contentDetails,id, player,topicDetails, statistics',
            maxResults: 5,
            id,
            key: apiKey
        }
      });

    const result = response.data.items;
    const finalResult = Object.assign(result.map(item => {
        return {
          publishedAt: moment(item.snippet.publishedAt).fromNow(),
          title: item.snippet.title,
          imageUrl: item.snippet.thumbnails.high.url,
          videoId: item.id,
          duration: ISO8601toDuration(item.contentDetails.duration),
          likeCount: item.statistics.likeCount,
          viewCount: item.statistics.viewCount,
          embedUrl: item.player.embedHtml,
          newPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0'),
          oldPrice: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') + 30,
          bestSelling: Math.floor(new Date(item.snippet.publishedAt).getDate() + '0') > 160 ? true:false
        }
      }))
      return finalResult;

    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  };

//Define a route
router.get('/', async(req, res) => {
    try {
        // assuming apiKey is passed as a query parameter
        const selectedCourses = await fetchSelectedCourses(API_KEY, courseId);
        res.send(selectedCourses);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
})




// export the router module so that server.js file can use it
module.exports = router;
