import React from 'react';
import LandingPageContentComponent from './appComponents/LandingPageContent';
import DashboardPageComponent from './pages/DashboardPage.react' 

export default React.createClass({

  render() {
    return <div className = "AppContainer">
      <LandingPageContentComponent />
      <DashboardPageComponent />
    </div>
  }

});
