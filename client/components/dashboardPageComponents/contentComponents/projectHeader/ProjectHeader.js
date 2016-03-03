import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';
import { getsProject } from '../../../../redux/actions';

class ProjectHeader extends Component {
  render () {
    return (
      <Col md = { 9 } mdOffset = { 3 }>
        <div className = "panel panel-default">
          <div className = "panel-body">
            <h3>{ this.props.projects.list[this.props.params.projectIndex].name }</h3>
          </div>
          <div className = "panel-footer">
            <h4>{ this.props.projects.list[this.props.params.projectIndex].description }</h4>
          </div>
        </div>
      </Col>
    );
  }
}

const select = (state) => state;

export default connect(select)(ProjectHeader);
