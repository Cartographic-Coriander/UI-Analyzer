import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render () {
    var className = () => this.props.buttonReducer.visibleContentComponent === 'Dashboard' ? 'Dashboard' : 'hide'
    return (
      <div className = { className() }>
        This is the Dashboard Container component
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardContainer)