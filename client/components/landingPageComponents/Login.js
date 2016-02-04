import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <h3>I am the login component</h3>
        <form>
          <input type="text" placeholder="enter email here"></input>
          <input type="text" placeholder="password input here"></input>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }

});
