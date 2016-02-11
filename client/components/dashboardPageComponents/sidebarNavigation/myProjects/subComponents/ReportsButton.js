import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { contentState } from '../../../../../redux/actions';

class ReportsButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Reports'));
  }

  render () {
    return (
      <Button className = "ReportsButton btn-block" onClick = { this.handleClick.bind(this) }>
      Reports
      </Button>
    )
  }
}

const select = (state) => state

export default connect(select)(ReportsButton)