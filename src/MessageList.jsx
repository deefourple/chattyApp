import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <div>
        <div id="message-list">
        {this.props.state.messages.map( message => <Message key={message.uuid} message={message}/>) }
          <div className="message system">
            oldname changed their name to newName.
          </div>
        </div>
      </div>

    );
  }
}

export default MessageList;
