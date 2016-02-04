import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentState } from '../../../../../redux/actions';

class ReportsButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Reports'));
  }
  render () {
    return (
      <button className = "ReportsButton" onClick = { this.handleClick.bind(this) }>
      Reports
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(ReportsButton)