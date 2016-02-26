import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel, Button } from 'react-bootstrap';

export default class DashboardContainer extends Component {
  render () {
    return (
      <div className = 'Dashboard'>
        <Col md = { 11 } mdOffset = { 3 }>
          <div className = "panel panel-default">
            <div className = "panel-body">
              <h3>Welcome to Scrutinize</h3>
            </div>
          </div>
          <Col md = { 6 }>
            <div className = "panel panel-default dashboardLeftContainer">
              <div className = "panel-body dashboardLeft">
                <Button className = "btn btn-primary">add project</Button>
              </div>
            </div>
          </Col>
          <Col md = { 6 }>
            <Panel header = "Projects" className = "dashboardRightContainer">
              <h5>Use projects collect data on how users interact with your website</h5>
            </Panel>
          </Col>
        </Col>
      </div>
    );
  }
}

const select = (state) => state;

export default connect(select)(DashboardContainer);