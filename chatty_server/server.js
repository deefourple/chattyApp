const express = require('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

const PORT = 4000;

var messages = [];

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer.Server({ server });

wss.broadcast = (messageToBroadcast) => {
  wss.clients.forEach(function each(client){
    if(client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify(messageToBroadcast))
    }
  });
};

 userCount = () => {
  let onlineUsers = {type: "usersOnline", number: wss.clients.size};
  wss.broadcast(onlineUsers)
 }

let randomColor = function() {
  let selectionOfColors = ["#01c10b", "#f2e610", "#f28c10", "#ff0000", "#00fff2", "#f972f7", "#878787"];
  return selectionOfColors[Math.floor(Math.random() * 6) + 1]
}

wss.on('connection', (ws) => {
  userCount();
  console.log('Client connected');
  //console.log("CLIENTS:", wss.clients.length) //Object.keys(wss.clients).length;
  let getInitialMessages = {type: "initialMessages", messages: messages}
  ws.send(JSON.stringify(getInitialMessages));
  let getInitialColour = {type: "initialColor", color: randomColor()}
  ws.send(JSON.stringify(getInitialColour));
  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message)
    switch(parsedMessage.type) {
      case "postMessage":
        let messageToClient = {
          type: "incomingMessage",
          uuid: uuid.v4(),
          name: parsedMessage.name,
          content:parsedMessage.content,
          color: parsedMessage.color
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

  ws.on('close', () => userCount());
});