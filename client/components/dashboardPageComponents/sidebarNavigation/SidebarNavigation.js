import React, { Component } from 'react';
import MyDashboardButton from './subComponents/MyDashboardButton';
import MyProjects from './myProjects/MyProjects';

export default class extends Component {
  componentDidMount () {
    console.log('it did mount');
    console.log($('.SidebarNavigation'));
    $('.SidebarNavigation').css('height', $(document).height());
  }
  
  render () {
    this.componentDidMount()
    return (
      <div className="SidebarNavigation list-group sidebar-wrapper">
        <MyDashboardButton />
        <MyProjects />
      </div>
    )
  }

}
