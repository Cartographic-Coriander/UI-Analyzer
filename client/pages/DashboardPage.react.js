import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';
import { connect } from 'react-redux';
import { authChecker, showImagePage } from '../redux/actions';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { signsOut, setFocus } from '../redux/actions';

export default class DashboardPage extends Component {
  handleLogout () {
    setTimeout(function(){
      localStorage.removeItem('Scrutinize.saved.state');
    },100);
    this.props.dispatch(signsOut());
    if (this.props.projects.list) {
      this.props.dispatch(setFocus({project: this.props.projects.list[0]}));
    }
  }

  handleClick () {
    // this.props.dispatch(showImagePage('show_image'));
  }

  render () {
    return (
      <div className = "DashboardPage">
        <Navbar className="navbar-inverse dashboardPageHeader">
          <a className="navbar-brand" href="#">Scrutinize</a>
          <Nav className="navbar-nav navbar-right">
            <NavItem onClick={ () => { this.handleLogout('leaving') } } href = "#"> Log Out </NavItem>
          </Nav>
        </Navbar>
        <SidebarNavigation />
        <Content />
        {/* <button onClick={ this.handleClick.bind(this) }>make image appear</button> */}
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(DashboardPage)
