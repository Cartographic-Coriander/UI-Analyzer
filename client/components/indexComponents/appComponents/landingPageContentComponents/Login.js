import React from 'react';

export default React.createClass({

  render() {
    return (
      <div>
        <form>
          <h3>I am the login component that will appear</h3>
          <input type="text" placeholder="enter email here"></input>
          <input type="text" placeholder="password input here"></input>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }

});
