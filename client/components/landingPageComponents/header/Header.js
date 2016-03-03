import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar className = "navbar-inverse landingPageHeader main-header">
        <a className = "navbar-brand" href="#">Scrutinize</a>
        <Nav className = "navbar-nav navbar-right">
          <NavItem onClick = { () => this.props.toggleRegisterModal() }> Get Started </NavItem>
          <NavItem onClick = { () => this.props.toggleLoginModal() }> Log In </NavItem>
        </Nav>
      </Navbar>
    );
  }
};