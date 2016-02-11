import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/landingPageComponents/header/Header';
import Registration from '../components/landingPageComponents/Registration';
import ProductDescription from '../components/landingPageComponents/ProductDescription';
import Footer from '../components/landingPageComponents/Footer';
import AboutUs from '../components/landingPageComponents/aboutUs/AboutUs';
import LoginForm from '../components/landingPageComponents/LoginForm';
import { showLoginModal, showSignupModal, getsUser, postsUser } from '../redux/actions';

class LandingPage extends Component {
  onLogin (user) {
    this.props.dispatch(getsUser(user));
    this.props.dispatch(showLoginModal(false));
  }

  onRegister (user) {
    this.props.dispatch(postsUser(user));
    this.props.dispatch(showSignupModal(false));
  }

  showLoginModal () {
    this.props.dispatch(showLoginModal(true));
  }

  hideLoginModal () {
    this.props.dispatch(showLoginModal(false));
  }

  showRegisterModal () {
    this.props.dispatch(showSignupModal(true));
  }

  hideRegistrationModal () {
    this.props.dispatch(showSignupModal(false));
  }

  render () {
    return (
      <div className = "LandingPage">
        <Header showLogin = { this.showLoginModal.bind(this) } showSignup = { this.showRegisterModal.bind(this) }/>
        <LoginForm onSubmit = { this.onLogin.bind(this) } showLoginModal = { this.props.modalState.login }  hideLogin={ this.hideLoginModal.bind(this) }  />
        <Registration onSubmit = { this.onRegister.bind(this) } showRegistrationModal={ this.props.modalState.getStarted } hideRegModal={ this.hideRegistrationModal.bind(this) } />
        <ProductDescription showRegistration = { this.showRegisterModal.bind(this) } />
        <AboutUs />
        <Footer />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(LandingPage)