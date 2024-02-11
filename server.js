const http = require('http');

const express = require('express');
const app = express();


// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('hello root node');
});


const port = process.env.PORT || 3000; 

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