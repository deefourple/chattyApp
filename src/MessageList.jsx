import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
        <div id="message-list">
          {this.props.state.messages.map(message => {
            if (message.type === "incomingMessage") {
              return <Message key={message.uuid} message={message}/>
               } else {
                //if (message.type === "incomingNotification")
               return <Notification key={message.uuid} message={message}/>
              }
      })}
      </div>
    );
  }
}

export default MessageList;
