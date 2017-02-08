import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

var initialState = {
   //Put title in message list by passing it through as a prop
   //Store data in an module export/ import
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        id: "01",
        username: "Bob",
        content: "Has anyone seen my marbles?"
      },
      {
        id: "02",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
    ]
  }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.updateData = (newPeople) => {
    this.setState({currentUser: {name: newPeople}})
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  _postMessage = (e) => {
    console.log(e.target.value)
   if (e.key === 'Enter') {  //13 is registered to the enter button
    console.log('enterWorks')
    const newMessage = {id: this.state.messages.length + 1, username: 'Bob', content: e.target.value}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
     }
  }

  render() {
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar username={this.state.currentUser.name} postMessage={this._postMessage} />
      <Message />
      </div>
    );
  }
}

export default App;

