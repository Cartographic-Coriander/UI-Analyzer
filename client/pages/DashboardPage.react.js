import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';
import { connect } from 'react-redux';
import { authChecker } from '../redux/actions';

export default class DashboardPage extends Component {
  handleLogout (goodBye) {
    this.props.dispatch(authChecker(goodBye));
  }

  render () {
    return (
      <div className = "DashboardPage">
        'This is DashboardPage'
        <button onClick={ () => { this.handleLogout('leaving') } }>Logout</button>
        <SidebarNavigation />
        <Content />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardPage)