import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';

class MyDashboardButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Dashboard'));
  }
  render () {
    return (
      <button className = "MyDashboardButton" onClick = { this.handleClick.bind(this) }>
        My Dashboard
      </button>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(MyDashboardButton)