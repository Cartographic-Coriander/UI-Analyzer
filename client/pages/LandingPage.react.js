import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Header from '../components/landingPageComponents/header/Header';
import Registration from '../components/landingPageComponents/Registration';
import ProductDescription from '../components/landingPageComponents/ProductDescription';
import Footer from '../components/landingPageComponents/Footer';
import AboutUs from '../components/landingPageComponents/aboutUs/AboutUs';
import LoginForm from '../components/landingPageComponents/LoginForm';
import { showLoginModal, showSignupModal, getsUser, postsUser, pageState } from '../redux/actions';

class LandingPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loginModalVisibility: false,
      registerModalVisibility: false
    };
  };

  onLogin (user) {
    this.props.dispatch(getsUser(user, browserHistory));
    this.toggleLoginModal();
  }

  onRegister (user) {
    this.props.dispatch(postsUser(user, browserHistory));
    this.toggleRegisterModal();
  }

  toggleLoginModal () {
    this.setState({ loginModalVisibility: !this.state.loginModalVisibility });
  }

  toggleRegisterModal () {
    this.setState({ registerModalVisibility: !this.state.registerModalVisibility });
  }

  render () {
    console.log(this)
    return (
      <div className = "LandingPage">
        <Header toggleLoginModal = { this.toggleLoginModal.bind(this) } toggleRegisterModal = { this.toggleRegisterModal.bind(this) }/>
        <LoginForm onSubmit = { this.onLogin.bind(this) } visibility = { this.state.loginModalVisibility } toggleLoginModal = { this.toggleLoginModal.bind(this) }/>
        <Registration onSubmit = { this.onRegister.bind(this) } visibility = { this.state.registerModalVisibility } toggleRegisterModal = { this.toggleRegisterModal.bind(this) }/>
        <ProductDescription toggleRegisterModal = { this.toggleRegisterModal.bind(this) }/>
        <AboutUs />
        <Footer />
      </div>
    );
  }
};

const select = (state) => state;

export default connect(select)(LandingPage);