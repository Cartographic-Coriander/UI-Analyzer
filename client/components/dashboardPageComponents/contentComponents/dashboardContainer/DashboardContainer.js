import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render () {
    var className = () => this.props.visibleContentComponent === 'Dashboard' ? 'Dashboard' : 'hide'
    console.log(this.props.visibleContentComponent, className())
    return (
      <div className = { className() }>
        This is the Dashboard Container component
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardContainer)