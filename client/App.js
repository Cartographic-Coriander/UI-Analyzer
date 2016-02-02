import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddNotes from './pages/addNotes.react.js';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    {(()=>{console.log('this is the props at App.js: ', this.props)})()}
    return (
      <div>
        { (() => {
            switch (this.props.authReducer.appState) {
              case 'not_authenticated':
                return <LandingPage />;
              case 'authenticated':
                console.log('whats happening')
                return <DashboardPage />;
              case 'Image_Appear':
                return <AddNotes />
              default:
                return <LandingPage />
            }
          })()
       }

      </div>
    )
  }
};

function mapStoP (state) {
  return state;
}

export default connect(mapStoP)(App);