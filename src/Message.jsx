import React, {Component} from 'react';

const Message = ({color, message}) =>

<div className="message" key={message.id}>
 <span className="username" style={{color: message.color}}>{message.name}</span>
  <span className="content">{message.content}</span>
</div>

export default Message;