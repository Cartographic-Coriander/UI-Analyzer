import React, { Component } from 'react';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';
import { connect } from 'react-redux';
import { authChecker, showImagePage } from '../redux/actions';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { signsOut, setFocus } from '../redux/actions';
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

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

  componentDidMount () {
    setTimeout(() => {
      window.removeHeatmap();
    }, 1200)
  }

  render () {
  console.log(this.props, Link)
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
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    props: state,
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(DashboardPage)