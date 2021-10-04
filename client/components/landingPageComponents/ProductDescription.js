import React, { Component } from 'react';
import { Jumbotron, Button, Panel } from 'react-bootstrap';

export default class extends Component {
  render() {
    return (
      <div className = "productDescription">
        <Jumbotron className = "landingPage-Jumbotron">
          <video className = "landingPageVideo" z-index = "-50" autoPlay mute loop src = "https://s3-us-west-1.amazonaws.com/scrutinize/landingPageVideo.mp4">
          </video>
          <div id = "landingPageText">
            <h1>Inspiration from Users, for Users</h1>
            <p>Scrutinize tracks, aggregates and reports user behavior for your website.</p>
            <p>Gain insights into your users to optimize UI/UX.</p>
            <p><Button className="btn-primary btn-lg getStartedBtn-lg" onClick = { this.props.toggleRegisterModal } >Get Started</Button></p>
          </div>
        </Jumbotron>

        <div className = "productExampleContainer">
          <div className = "productExample">
            <h4>Track User Behavior</h4>
            <p>Stop guessing what your users want.</p>
            <p>Track the actual user behavior on your website</p>
            <p>and understand what your users really need.</p>
          </div>
          <div className = "productExample">
            <h4>Gather User Feedback</h4>
            <p>User feedback complements user behavior data.</p>
            <p>After completing a test session, </p>
            <p>users can provide feedback for your website.</p>
          </div>
          <div className = "productExample">
            <h4>Analyze Project Result</h4>
            <p>Using heatmap, mouse replay and visual feedback,</p>
            <p>Scrutinize generates project reports</p>
            <p>that provide deeper insights into your website.</p>
          </div>
          <div className = "productExample">
            <h4>Take Action</h4>
            <p>Improve your website based on the test results.</p>
            <p>You can create another test for your updated website</p>
            <p>to improve the UI/UX iteratively.</p>
          </div>
        </div>
      </div>
    );
  }
};
