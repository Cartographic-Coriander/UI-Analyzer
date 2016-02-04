import React, { Component } from 'react';
import MyDashboardButton from './subComponents/MyDashboardButton';
import MyProjects from './myProjects/MyProjects';

export default class extends Component {
  render () {
    return (
      <div className="SidebarNavigation">
        'This is SidebarNavigation'
        {/*<MyDashboardButton />*/}
        <MyProjects />
      </div>
    )
  }
}
