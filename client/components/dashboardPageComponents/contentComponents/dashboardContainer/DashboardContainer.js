import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel, Button } from 'react-bootstrap';

export default class DashboardContainer extends Component {

  toggleProjectModel () {
    this.props.dispatch(togglesProjectModal(!this.props.modalState.addProjectModalVisibility));
  }

  render () {
    return (
      <Col className = 'Dashboard'>
        <Col md = { 11 } mdOffset = { 3 }>
          <Panel footer = { <h4>Start by adding a project!</h4> }>
            <h3>Welcome to Scrutinize</h3>
          </Panel>
          <Col md = { 6 } className = "dashboardLeftComponent">
            <Panel className = "dashboardLeftContainer">
              <Panel className = "dashboardLeft">
                <Button onClick = { this.props.toggleProjectVisibility } className = "btn btn-primary">add project</Button>
              </Panel>
            </Panel>
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
                <h5>Record and replay mouse movements</h5>
              </Col>
              <Col md = { 12 }>
                <h5>Receive direct user feedback</h5>
              </Col>
            </Panel>
          </Col>
        </Col>
      </Col>
    );
  }
}

const select = (state) => state;

export default connect(select)(DashboardContainer);