import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavItem, Navbar, Nav } from 'react-bootstrap';
import { signsOut, getsProject } from '../redux/actions';
import { browserHistory } from 'react-router';
import SidebarNavigation from '../components/dashboardPageComponents/sidebarNavigation/SidebarNavigation';
import Content from '../components/dashboardPageComponents/contentComponents/Content';

export default class DashboardPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      projectModalVisibility : false
    };
  };

  handleLogout () {
    this.props.dispatch(signsOut(browserHistory));
  };

  toggleProjectVisibility () {
    this.setState(prev => ({ projectModalVisibility : !prev.projectModalVisibility }));
  };

  componentWillMount () {
    this.props.dispatch(getsProject());
  };

  componentDidMount () {
    setTimeout(() => {
      window.removeHeatmap();
    }, 1200);
  };

  render () {
    return (
      <div className = "DashboardPage">
        <Navbar className="navbar navbar-inverse">
          <a onClick = { () => browserHistory.push('/dashboard') } className="navbar-brand" href="#">Scrutinize</a>
          <Nav className="navbar-nav navbar-right">
            <NavItem onClick={ () => this.handleLogout() } href = "#"> Log Out </NavItem>
          </Nav>
        </Navbar>
        <SidebarNavigation visibility = { this.state.projectModalVisibility } toggleProjectVisibility = { this.toggleProjectVisibility.bind(this) }/>
        { React.cloneElement(this.props.children, { toggleProjectVisibility: this.toggleProjectVisibility.bind(this) }) }
      </div>
    );
  };
};

const select = (state) => state;

export default connect(select)(DashboardPage);
