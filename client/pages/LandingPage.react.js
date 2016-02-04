import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/landingPageComponents/header/Header';
import Login from '../components/landingPageComponents/Login';
import Registration from '../components/landingPageComponents/Registration';
import ProductDescription from '../components/landingPageComponents/ProductDescription';
import Footer from '../components/landingPageComponents/Footer';
import AboutUs from '../components/landingPageComponents/aboutUs/AboutUs';
import { switchVisibility, authChecker, authUser, registerUser, showLoginModal, showSignupModal, getsUser, postsUser } from '../redux/actions';
import LoginForm from '../components/landingPageComponents/LoginForm';

class LandingPage extends Component {
  handleClick (button) {
    this.props.dispatch(switchVisibility(button));
  }

  onLogin (user) {
    this.props.dispatch(getsUser(user));;
    this.props.dispatch(showLoginModal(false));
    this.props.dispatch({
      type: 'PAGE_STATE',
      data: 'dashboard'
    })
  }

  onRegister (user) {
    this.props.dispatch(postsUser(user));
    this.props.dispatch(showSignupModal(false));
  }

  hideLogModal () {
    this.props.dispatch(showLoginModal(false))
  }

  showLogModal () {
    this.props.dispatch(showLoginModal(true));
  }

  hideRegistrationModal () {
    this.props.dispatch(showSignupModal(false));
  }

  showRegisterModal () {
    this.props.dispatch(showSignupModal(true));
  }

  render () {
    return (
      <div className = "LandingPage">
        {/* TODO     :       get authenticated may not be needed now*/}
        <Header showLogin={ this.showLogModal.bind(this) } showSignup= { this.showRegisterModal.bind(this) }/>
        <LoginForm onSubmit={ this.onLogin.bind(this) } showLoginModal = { this.props.modalState.login } hideLogin={ this.hideLogModal.bind(this) } />
        <Registration onSubmit={ this.onRegister.bind(this) } showRegistrationModal={ this.props.modalState.getStarted } hideRegModal={ this.hideRegistrationModal.bind(this) } />
        <ProductDescription showRegistration={ this.showRegisterModal.bind(this) } />
        <AboutUs />
        <Footer />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(LandingPage)