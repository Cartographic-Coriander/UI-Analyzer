import React, { Component } from 'react';

export default class AddCommentsSplash extends Component {
  render () {
    return (
      <div id="testStartPrompt">
        <p>Use the right arrow to get to the next image.</p>
        <p>Click on the image to leave a comment.</p>
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
    );
  }
};