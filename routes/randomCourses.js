const express = require('express');
const router = express.Router();


//Define a route
router.get('/', (req, res) => {
    res.send('this is the random courses route')
})


// export the router module so that server.js file can use it
module.exports = router;