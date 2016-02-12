import React, { Component } from 'react';
import MyProjects from './myProjects/MyProjects';

export default class extends Component {
  componentDidMount () {
    $('.SidebarNavigation').css('height', $(document).height() + 30);
  }

  render () {
    this.componentDidMount()
    return (
      <div className="SidebarNavigation list-group sidebar-wrapper">
        <MyProjects />
      </div>
    )
  }

}
