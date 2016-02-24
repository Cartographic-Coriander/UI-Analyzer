import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';

class ProjectHeader extends Component {
  render () {
    console.log('header:', this)
    return (
      <Col md = { 9 } mdOffset = { 3 }>
        <div className = "panel panel-default">
          <div className = "panel-body">
            <h3>{ this.props.projects.list[this.props.params.index].name }</h3>
          </div>
          <div className = "panel-footer">
            <h4>{ this.props.projects.list[this.props.params.index].description }</h4>
          </div>
        </div>
      </Col>
    );
  }
}

const select = (state) => state;

export default connect(select)(ProjectHeader);
