import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <ul className="headerComponent">
          <li className="getStartedButton" onClick={ () => this.props.authenticateClick('authenticated') }> <a href="#">Get Started</a></li>
          <li className="loginButton"><a href="#">Log In</a></li>
      </ul>
      )
  }
}; 

export default Header;

