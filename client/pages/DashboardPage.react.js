import React from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/Content';

export default React.createClass({
  
  render() {
    return (
      <div className = "DashboardPage">
      <SidebarNavigation />
      <Content />
      </div>
    )
  }

});