import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
  super(props);
    this.setState = "";
  }

  // _checkStatus = (e) => {
  //   this.props.postMessage(e)
  // }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" value={this.props.username} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.props.postMessage} />
     </footer>
     )
  }
}

export default ChatBar;