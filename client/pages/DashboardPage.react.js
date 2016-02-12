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
    this.props.dispatch(signsOut());
    if (this.props.projects.list) {
      this.props.dispatch(setFocus('project', this.props.projects.list[this.props.projects.list.length - 1]));
    }
    setTimeout(() => {
      localStorage.removeItem('Scrutinize.saved.state');
    }, 250)
  }

  componentDidMount () {
    if (this.props.projects.list.length > 0) {
      this.props.dispatch(setFocus('project', this.props.projects.list[this.props.projects.list.length - 1]));
      this.props.dispatch(setFocus('test', this.props.projects.list[this.props.projects.length - 1].id));
    }
  }

  render () {
    return (
      <div className = "DashboardPage">
        <Navbar className="navbar navbar-inverse">
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
