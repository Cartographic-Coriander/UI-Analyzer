import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel, Button } from 'react-bootstrap';
import { projectModal } from '../../../../redux/actions.js';

export default class DashboardContainer extends Component {

  toggleProjectModel () {
    this.props.dispatch(projectModal(!this.props.modalState.addProjectModalVisibility));
  }

  render () {
    return (
      <div className = 'Dashboard'>
        <Col md = { 11 } mdOffset = { 3 }>
          <div className = "panel panel-default">
            <div className = "panel-body">
              <h3>Welcome to Scrutinize</h3>
            </div>
          </div>
          <Col md = { 6 } className = "dashboardLeftComponent">
            <div className = "panel panel-default dashboardLeftContainer">
              <div className = "panel-body dashboardLeft">
                <Button onClick = { this.toggleProjectModel.bind(this) } className = "btn btn-primary">add project</Button>
              </div>
            </div>
          </Col>
          <Col md = { 6 } className = "dashboardRightComponent">
            <Panel header = "Projects" className = "dashboardRightContainer">
              <Col md = { 12 } className = "firstDashboardPoint">
                <h5>Use projects collect data on how users interact with your website</h5>
              </Col>
              <Col md = { 12 }>
                <h5>Visualize data with heatmaps</h5>
              </Col>
              <Col md = { 12 }>
                <h5>record and replay mouse movements</h5>
              </Col>
              <Col md = { 12 }>
                <h5>Receive direct user feedback</h5>
              </Col>
            </Panel>
          </Col>
        </Col>
      </div>
    );
  }
}

const select = (state) => state;

export default connect(select)(DashboardContainer);