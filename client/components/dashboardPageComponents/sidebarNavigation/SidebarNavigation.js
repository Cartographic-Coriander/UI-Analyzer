import React from 'react';
import MyDashboardButton from './subComponents/MyDashboardButton';
import MyProjects from './myProjects/MyProjects';

export default React.createClass({

  render() {
    return (

      <div className = "SidebarNavigation">
        <MyDashboardButton />
        <MyProjects />
      </div>

    )
  }

});
