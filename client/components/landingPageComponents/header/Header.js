import React from 'react';

const Header = () => {
  return (
    <div className="headerHolder">
      <div className="headerContent">
        <h3>the header component</h3>
      </div>
      <button className="getStartedButton headerButton btn btn-default">Get Started</button>
      <button className="loginButton headerButton btn btn-default">Login</button>
    </div>
  )
};

export default Header;
