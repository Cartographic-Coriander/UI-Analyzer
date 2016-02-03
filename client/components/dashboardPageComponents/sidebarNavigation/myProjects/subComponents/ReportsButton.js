import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';
import { Button } from 'react-bootstrap';

class ReportsButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Reports'));
  }
  render () {
    return (
      <Button className = "ReportsButton" onClick = { this.handleClick.bind(this) }>
      Reports
      </Button>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(ReportsButton)