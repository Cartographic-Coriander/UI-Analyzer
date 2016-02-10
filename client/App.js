import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddNotes from './pages/AddComments.react';
import { connect } from 'react-redux';
import ReportPage from './pages/ReportPage.react.js';

class App extends Component {
  render() {
    {console.log('props:', this.props)}
    return (
      <div className="APP">
        { (() => {
            switch (this.props.stateRouter.pageState) {
              case 'not_authenticated':
                return <LandingPage />;
              case 'authenticated':
                return <DashboardPage />
              case 'imageView':
                return <AddNotes />
              case 'reportView':
                return <ReportPage />
              default:
                return <LandingPage />
            }
          })()
       }
      </div>
    )
  }
};

const select = (state) => state;

export default connect(select)(App);
