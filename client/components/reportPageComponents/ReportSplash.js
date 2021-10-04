import React, { Component } from 'react';

export default class ReportSplash extends Component {
  render () {
    return (
      <div id="testStartPrompt">
        <p>Use the right arrow to get to the next image.</p>
        <p>Press Ctrl + H to view mouse movement heatmap.</p>
        <p>Press Ctrl + R to replay mouse movement.</p>
        <p>Press Ctrl + D to exit the report.</p>
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