const express = require('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

const PORT = 4000;

var messages = [];

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = (messageToBroadcast) => {
  wss.clients.forEach(function each(client){
    if(client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify(messageToBroadcast))
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  let getInitialMessages = {type: "initialMessages", messages: messages}
  ws.send(JSON.stringify(getInitialMessages));
  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message)
    switch(parsedMessage.type) {
      case "postMessage":
        let messageToClient = {
          type: "incomingMessage",
          uuid: uuid.v4(),
          name: parsedMessage.name,
          content:parsedMessage.content
        }
        messages = [...messages, messageToClient];
        let newMessage = {type: "incomingMessage", messages: messages}
        wss.broadcast(newMessage);
        break;
      case "postNotification":
        let nameChange = {
          type: "incomingNotification",
          uuid: uuid.v4(),
          oldName: parsedMessage.oldName,
          newName: parsedMessage.newName
        }
        messages = [...messages, nameChange];
        let newNotification = {type: "incomingNotification", messages: messages}
        wss.broadcast(newNotification);
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});



//ROB LECTURE NOTES
//set the app up
//const wss = new WebSocket.Server({server: app})
// define first event
// wss is the ability to access everybody, ws is who youre currently talking to

// wss.on('connection', (ws) => {
//   console.log("Check if the socket is working")
//   ws.send("Hello")

//   ws.on('close', () => console.log('Client left'))
// })
