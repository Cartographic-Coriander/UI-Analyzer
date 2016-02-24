import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavItem, Navbar, Nav } from 'react-bootstrap';
import { signsOut, setFocus } from '../redux/actions';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/MyProjects';
import Content from '../components/dashboardPageComponents/contentComponents/Content';

export default class DashboardPage extends Component {
  handleLogout () {
    this.props.dispatch(signsOut());
    if (this.props.projects.list) {
      this.props.dispatch(setFocus('project', this.props.projects.list[this.props.projects.list.length - 1]));
    }
  }

  componentDidMount () {
    if (this.props.projects.list.length > 0) {
      this.props.dispatch(setFocus('project', this.props.projects.list[this.props.projects.list.length - 1]));
      this.props.dispatch(setFocus('test', this.props.projects.list[this.props.projects.length - 1].id));
    }
  }

  componentDidMount () {
    setTimeout(() => {
      window.removeHeatmap();
    }, 1200)
  }

  render () {
  console.log(this)
    return (
      <div className = "DashboardPage">
        <Navbar className="navbar navbar-inverse">
          <a className="navbar-brand" href="#">Scrutinize</a>
          <Nav className="navbar-nav navbar-right">
            <NavItem onClick={ () => { this.handleLogout() } } href = "#"> Log Out </NavItem>
          </Nav>
        </Navbar>
        <SidebarNavigation />
        { this.props.children }
      </div>
    );
  }
}

const select = (state) => state;

export default connect(select)(DashboardPage)