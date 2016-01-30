import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';

export default class DashboardPage extends Component {
  render () {
    return (
      <div className = "DashboardPage">
        'This is DashboardPage'
        <SidebarNavigation />
        <Content />
      </div>
    )
  }
}