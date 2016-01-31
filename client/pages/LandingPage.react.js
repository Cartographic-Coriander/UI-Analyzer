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

class LandingPage extends Component {
  handleClick (button) {
    this.props.dispatch(switchVisibility(button));
  }

  getAuthenticated (auth) {
    console.log('getting authenticated ', auth)
    this.props.dispatch(authChecker(auth))
  }

  render () {
    return (
      <div className = "LandingPage">
        <ButtonOne buttonOne={ this.props.buttonOne } clickHandler={ this.handleClick.bind(this) } />
        <ButtonTwo buttonTwo={ this.props.buttonTwo } clickHandler={ this.handleClick.bind(this) } />
        <Header authenticateClick={ this.getAuthenticated.bind(this) } />
        <Login />
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