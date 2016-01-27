import React from 'react';
import MyDashboardButton from './subComponents/MyDashboardButton';
import MyProjects from './myProjects/MyProjects';

export default React.createClass({

  render() {
    return (
      <div className="SidebarNavigation">
      'This is SidebarNavigation'
        <MyDashboardButton />
        <MyProjects />
      </div>

    )
  }

});
