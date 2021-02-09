// const express = require('express')

// const app = express();
// let serv = require('http').Server(app);

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/src/index.html');
// });
// app.use('/src', express.static(__dirname + '/src'));

// serv.listen(2000);

// console.log('server started');

// let io = require('socket.io')(serv, {});
// io.sockets.on('connection', function(socket) {
//     console.log('socket connection')


//     socket.on('happy', function() {
//         console.log('happy');
//     });


// });


// require('dotenv').config();

// // import express, { static } from 'express';
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

// // main routes
// app.get('/status', (req, res, next) => {
//     res.status(200);
//     res.json({ 'status': 'ok' });
//   });
  
//   // catch all other routes
//   app.use((req, res, next) => {
//     res.status(404);
//     res.json({ message: '404 - Not Found' });
//   });
  
//   // handle errors
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({ error : err });
//   });
  
//   // have the server start listening on the provided port
//   app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server started on port ${process.env.PORT || 3000}`);
//   });


// // const server = require('http').Server(app)
// // const io = require('socket.io')(server);

// // const players = {};

// // app.use('/scripts',static(__dirname + '/scripts'))
// // app.use('/assets',static(__dirname + '/assets'))

// // app.get('/',function(req,res) {
// //     res.sendFile(__dirname+ '/index.html')
// // });

// // server.listen(8081,function(){ // Listens to port 8081
// //     console.log('Listening on '+server.address().port);
// // });