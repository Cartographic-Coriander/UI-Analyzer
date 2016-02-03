import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';
import { connect } from 'react-redux';
import { authChecker } from '../redux/actions';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

export default class DashboardPage extends Component {
  handleLogout (goodBye) {
    this.props.dispatch(authChecker(goodBye));
  }

  render () {
    return (
      <div className = "DashboardPage">
      <Navbar className="navbar-inverse dashboardPageHeader">
        <a className="navbar-brand" href="#">Scrutinize</a>
        <Nav className="navbar-nav navbar-right">
          <NavItem onClick={ () => { this.handleLogout('leaving') } }> Log Out </NavItem>
        </Nav>
      </Navbar>
      <SidebarNavigation />
      <Content className= "dashboardContent"/>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardPage)