const express = require('express');
const router = express.Router();

//Define a route
router.get('/html', (req, res) => {
    res.send('this is the html courses route')
})

router.get('/css', (req, res) => {
    res.send('this is the css courses route')
})


router.get('/javascript', (req, res) => {
    res.send('this is the javascript courses route')
})

router.get('/jquery', (req, res) => {
    res.send('this is the jquery courses route')
})


// export the router module so that server.js file can use it
module.exports = router;