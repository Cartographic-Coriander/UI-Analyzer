import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';

class ProjectHeader extends Component {
  render () {
    return (
      <Col md = { 9 } mdOffset = { 3 }>
        <Panel>
          <div className = "panel-body">
            <h3>{ this.props.projects.list[this.props.params.index].name } blah blah blah</h3>
          </div>
          <div className = "panel-footer">
            <h4>{ this.props.projects.list[this.props.params.index].description }</h4>
          </div>
        </Panel>
      </Col>
    )
  }
}

const select = (state) => state

export default connect(select)(ProjectHeader)