const http = require('http');
require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT; 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.get('/', (req, res) => {
    res.send('FElearn API');
});

// Include route files
const categoriesRoute = require('./routes/categories');
const randomCoursesRoute = require('./routes/randomCourses');
const selectedCourseRoutes = require('./routes/selected');

//use routes
app.use('/categories', categoriesRoute);
app.use('/randomCourses', randomCoursesRoute);
app.use('/selected', selectedCourseRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



















// //Create an HTTP server

// const server = http.createServer((req, res) => {
//     //Set the response headers
//     res.writeHead(200, {'Content-Type': 'text/html'});


//     // Write the response content
//     res.write('<h1>Hello, Node.js HTTP Server!</h1>')
// });

// // Specify the port to listen on
// const port = 3000;

// server.listen(port, () => {
//     console.log(`Node.js HTTP server is runnnig on port ${port}`)
// })