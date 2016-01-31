import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render () {
    return (
      <div className = 'Dashboard'>
        This is the Dashboard Container component
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardContainer)