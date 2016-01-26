import React from 'react';
import Header from './landingPageContentComponents/Header';
import Login from './landingPageContentComponents/Login';
import Registration from './landingPageContentComponents/Registration';
import ProductDescription from './landingPageContentComponents/ProductDescription';
import Footer from './landingPageContentComponents/Footer';
import AboutUs from './landingPageContentComponents/AboutUs';

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
