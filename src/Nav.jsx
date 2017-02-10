import React, {Component} from 'react';

class Nav extends Component {
  render() {
  console.log("Rendering <Nav/>");
    return (
        <nav>
          <h1>Chattie</h1>
          <h3>{this.props.count} Users Currently Online</h3>
        </nav>
      );
  }
}

export default Nav;