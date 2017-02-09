import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Notification from './Notification.jsx';

var initialState = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: []
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onMessageReceive = (message) => {
    console.log("Parsed Message Data -->", JSON.parse(message.data))
    let parsedMessage = JSON.parse(message.data);
    switch (parsedMessage.type){
      case "initialMessages":
        this.setState({messages: parsedMessage.messages})
      case "incomingMessage":
        this.setState({messages: parsedMessage.messages})
      break;
      case "incomingNotification":
        let old = parsedMessage.messages[parsedMessage.messages.length -1].oldName;
        let newest = parsedMessage.messages[parsedMessage.messages.length -1].newName;
        console.log("old: ", old);
        console.log("new: ", newest);
        this.setState({currentUser: {name: newest, oldName: old},
                      messages: parsedMessage.messages})
      break;
   }
  }

  //sends message to server
  onMessageSend = (message) => {
    this.ws.send(JSON.stringify(message))
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:4000')
    this.ws.addEventListener('message', this.onMessageReceive);
  }

  _onUpdateName = (name) => {
    let nameToServer = {
    type: "postNotification",
    oldName: this.state.currentUser.name,
    newName: name
    }
    this.onMessageSend(nameToServer)
    if (name) {
      this.setState({currentUser: {name: name},})
    } else {
      this.setState({currentUser: {name: "Anonymous"}})
    }
  }

  _postMessage = (content) => {
    let sendAwayMessage = {
      type: "postMessage",
      name: this.state.currentUser.name,
      content: content
     }
     console.log("Sent message -->", sendAwayMessage)
     this.onMessageSend(sendAwayMessage)
     document.getElementById("new-message").value = "";
  }

  render() {
    return (
      <div>
      <nav>
        <h1>ChatFish</h1>
      </nav>
      <MessageList state={this.state}/>
      <ChatBar state={this.state} updateName={this._onUpdateName} postMessage={this._postMessage} />
      </div>
    );
  }
}

export default App;
