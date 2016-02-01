import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/landingPageComponents/header/Header';
import Login from '../components/landingPageComponents/Login';
import Registration from '../components/landingPageComponents/Registration';
import ProductDescription from '../components/landingPageComponents/ProductDescription';
import Footer from '../components/landingPageComponents/Footer';
import AboutUs from '../components/landingPageComponents/aboutUs/AboutUs';
import ButtonOne from '../components/landingPageComponents/ButtonOne';
import ButtonTwo from '../components/landingPageComponents/ButtonTwo';
import { switchVisibility, authChecker } from '../redux/actions';
import LoginForm from '../components/landingPageComponents/LoginForm';

class LandingPage extends Component {
  handleClick (button) {
    this.props.dispatch(switchVisibility(button));
  }

  getAuthenticated (auth) {
    this.props.dispatch(authChecker(auth))
  }

  render () {
    return (
      <div className = "LandingPage">
        <Header authenticateClick={ this.getAuthenticated.bind(this) } />
        <LoginForm />
        <Registration />
        <ProductDescription />
        <AboutUs />
        <Footer />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(LandingPage)