const express = require('express');
const app = express();
const port = 3000;
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
const EE = require('./consumerUI');

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/', express.static('./dist', {
  index: "index.html"
}));

io.on('connection', function(socket) {
  //try {
    console.log('Client Connected');
    EE.on('tweetStream', function (tweet) {
      console.log("text : " + tweet);
      socket.emit('tweet', tweet);
    })
    EE.on('error', function (error) {
      console.error(`Error : ${error}`);
    });

  // } catch (error) {
  //   console.error(`Error : ${error}`);
  // }
});

// io.on('connection', (socket) => {
//   try {
//     EE.on('tweetStream', function(tweet) {
//       console.log(`tweetText : ${tweet}`)
//       socket.emit('tweet', tweet);
//     });

//     EE.on('error', function(error) {
//         throw error;
//     });
//     // consumer.on('message', function (message) {
//     //   //Test the consumer message id
//     //   msg = JSON.parse(message.value)
//     //   console.log(msg[0]._id)

//     //   if (message.value != undefined && message.value.length > 0) {
//     //     message.value.forEach((elem) => {
//     //       socket.emit('tweet', elem.text)
//     //     })
//     //   }
//     // })
//     // consumer.on('error', function (error) {
//     //   //  handle error 
//     //   console.log('error', error);
//     // });
//   } catch (error) {
//     console.error(`Error : ${error.code}`);
//   }
//   socket.on("disconnet", () => console.log("Client disconnected!"));
// });