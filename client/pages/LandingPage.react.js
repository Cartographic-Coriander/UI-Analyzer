import React from 'react';
import Header from '../components/landingPageComponents/header/Header';
import Login from '../components/landingPageComponents/Login';
import Registration from '../components/landingPageComponents/Registration';
import ProductDescription from '../components/landingPageComponents/ProductDescription';
import Footer from '../components/landingPageComponents/Footer';
import AboutUs from '../components/landingPageComponents/aboutUs/AboutUs';

export default React.createClass({

  render() {
    return (
      <div className = "AppContainer">
        <Header />
        <Login />
        <Registration />
        <ProductDescription />
        <AboutUs />
        <Footer />
      </div>
    )
  }

});
