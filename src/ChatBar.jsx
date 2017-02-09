import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
  super(props);
    this.setState = "";
  }

 onEnterMessage = (e) => {
 if (e.key === 'Enter' && e.target.value !== "") {
  this.props.postMessage(e.target.value)
 }
}
onEnterName = (e) => {
  if (e.key === "Enter") {
    if (this.props.state.currentUser.name === "Anonymous") {
      if (e.target.value && e.target.value !== "Anonymous") {
        this.props.updateName(e.target.value)
      }
    } else if (e.target.value !== this.props.state.currentUser.name) {
      if (e.target.value === "") {
       this.props.updateName("Anonymous")
      } else {
        this.props.updateName(e.target.value)
      }
    }
  }
}


  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your name(optional)" onKeyPress={this.onEnterName}/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnterMessage} />
     </footer>
     )
  }
}

export default ChatBar;