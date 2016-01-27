import React from 'react';

export default React.createClass({

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="enter email here"></input>
          <input type="text" placeholder="password input here"></input>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }

});
