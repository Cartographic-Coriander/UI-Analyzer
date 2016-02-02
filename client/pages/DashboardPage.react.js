import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';
import { connect } from 'react-redux';
import { authChecker } from '../redux/actions';
import { Button } from 'react-bootstrap';

export default class DashboardPage extends Component {
  handleLogout (goodBye) {
    this.props.dispatch(authChecker(goodBye));
  }

  render () {
    return (
      <div className = "DashboardPage">
        <div className="dashboardNav btn-group-vertical">
        <Button className="btn-primary" onClick={ () => { this.handleLogout('leaving') } }>Log Out</Button>
        <SidebarNavigation />
        </div>
        <Content className= "dashboardContent"/>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardPage)