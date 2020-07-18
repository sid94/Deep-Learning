const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
const EE = require('./consumerUI');

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/', express.static('./dist', {
  index: "index.html"
}));

io.on('connection', function(socket) {
  try {
    console.log('Client Connected');
    EE.on('tweetStream', function (tweet) {
      socket.emit('tweet', tweet);
    })
    EE.on('error', function (error) {
      console.error(`Error : ${error}`);
    });
    socket.on("disconnet", () => console.log("Client disconnected!"));
  } catch (error) {
    console.error(`Error : ${error}`);
  }
});
