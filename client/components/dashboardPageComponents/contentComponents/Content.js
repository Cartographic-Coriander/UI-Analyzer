import React, { Component } from 'react';
import DashboardDefault from './dashboardContainer/DashboardContainer'

export default class Content extends Component {
  render () {
    return (
      <div>
        { this.props.children || <DashboardDefault toggleProjectVisibility = { this.props.toggleProjectVisibility } /> }
      </div>
    )
  }
}