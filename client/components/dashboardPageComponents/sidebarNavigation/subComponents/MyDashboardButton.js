import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentState } from '../../../../redux/actions';

class MyDashboardButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Dashboard'));
  }
  render () {
    return (
      <button className = "MyDashboardButton" onClick = { this.handleClick.bind(this) }>
        My Dashboard
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(MyDashboardButton)