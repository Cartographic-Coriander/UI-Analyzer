import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';

class ReportsButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Reports'));
  }
  render () {
    return (
      <button className = "ReportsButton" onClick = { this.handleClick.bind(this) }>
      Reports
      </button>
    )
  }
}

const select = (state) => state.form;

export default connect(select)(ReportsButton)