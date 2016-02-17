import React, { Component } from 'react';

class WelcomeToComments extends Component {
  render () {
    return (
      <div id="testStartPrompt">
        <p id="testPrompt"></p>
        <p>Use the right arrow to get to the next image.</p>
        <p>Press Ctrl + D to end the feedback session.</p>
        <div id="testviewLoading">
          <div className="bigSqr">
            <div className="square first"></div>
            <div className="square second"></div>
            <div className="square third"></div>
            <div className="square fourth"></div>
          </div>
          <div className="testPrompt">loading...</div>
        </div>
      </div>
    )
  }
}

export default WelcomeToComments;