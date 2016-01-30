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

class LandingPage extends Component {
  render() {
    return (
      <div className = "LandingPage">
        <ButtonOne />
        <ButtonTwo />
        <Header />
        <Login />
        <Registration />
        <ProductDescription />
        <AboutUs />
        <Footer />
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(LandingPage)