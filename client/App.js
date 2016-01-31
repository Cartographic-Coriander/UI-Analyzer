import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddNotes from './pages/addNotes.react.js';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    {(()=>{console.log('this is the props: ', this.props)})()}
    return (
      <div>
        <LandingPage />
        <DashboardPage />
        <AddNotes />
      </div>
    )
  }
};

function mapStoP (state) {
  console.log(state);
  return state;
}

export default connect(mapStoP)(App);