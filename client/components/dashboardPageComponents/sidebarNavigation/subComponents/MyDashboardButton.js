import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';
import { Button } from 'react-bootstrap';

class MyDashboardButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Dashboard'));
  }
  render () {
    return (
      <a href="#" className="list-group-item MyDashboardButton" onClick = { this.handleClick.bind(this) }>
        My Dashboard
      </a>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(MyDashboardButton)