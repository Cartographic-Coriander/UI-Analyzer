import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';

export default class DashboardContainer extends Component {
  render () {
    return (
      <div className = 'Dashboard'>
        <Col md = { 9 } mdOffset = { 3 }>
          <div className = "panel panel-default">
            <div className = "panel-body">
              <h3>Welcome to Scrutinize</h3>
            </div>
            <div className = "panel-footer">
              <h4>add some projects</h4>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

const select = (state) => state;

export default connect(select)(DashboardContainer);