import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <div className="headerComponent">
        <h3>the header component</h3>
        <button className="getStartedButton" onClick={ () => this.props.authenticateClick('authenticated') }>Get Started</button>
        <button className="loginButton">Login</button>
      </div>
      )
  }
}; 

export default Header;

