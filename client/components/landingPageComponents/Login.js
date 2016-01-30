import React from 'react';

export default React.createClass({

  render() {
    return (
      <div className="loginComponent">
        <h3>I am the login component</h3>
        <div className="loginInputHolder">
          {/*div above wraps input content for flexbox*/}
          <form>
            <input type="text" placeholder="enter email here"></input>
            <input type="text" placeholder="password input here"></input>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    )
  }

});
