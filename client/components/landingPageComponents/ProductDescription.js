import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

export default React.createClass({

  render() {
    return (
      <div className="productDescription">
        <Jumbotron className="landingPage-Jumbotron">
          <video className="landingPageVideo" z-index="-50" autoPlay mute loop src="https://s3-us-west-1.amazonaws.com/scrutinize/landingPageVideo.mp4">
          </video>
          <div id="landingPageText">
            <h1>Inspiration from Users, for Users</h1>
            <p>Scrutinize tracks, aggregates and reports user behavior on your website.</p>
            <p>Gain insights into your users to optimize UI/UX.</p>
            <p><Button className="btn-primary btn-lg getStartedBtn-lg" onClick={ this.props.showRegistration } >Get Started</Button></p>
          </div>
        </Jumbotron>

        <div className="productExampleContainer">
          <div className="productExample">
            <h4>Track User Behavior</h4>
            <p>Lorem ipsum sit amet</p>
          </div>
          <div className="productExample">
            <h4>Gather Visual Feedback</h4>
            <p>Lorem ipsum sit amet</p>
          </div>
        </div>
        <div className="productExampleContainer">
          <div className="productExample">
            <h4>Analyze Project Result</h4>
            <p>Lorem ipsum sit amet</p>
          </div>
          <div className="productExample">
            <h4>Take Action</h4>
            <p>Lorem ipsum sit amet</p>
          </div>
        </div>

      </div>
    )
  }

});

var mapStateToProps = function (state) {
  
  return state
};