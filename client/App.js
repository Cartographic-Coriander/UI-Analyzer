import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddNotes from './pages/addNotes.react.js';
import { connect } from 'react-redux';

class App extends Component {
  render() { 
    {(()=>{console.log('this is theprops at App.js: ', this.props)})()}
    return (
      <div>
        { (() => {
            switch (this.props.page.appState) {
              case 'not_authenticated':
                return <LandingPage />;
              case 'dashboard':
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

function mapStateToProps (state) {
  console.log('state at App.js', state)
  return state;
}

export default connect(mapStateToProps)(App);