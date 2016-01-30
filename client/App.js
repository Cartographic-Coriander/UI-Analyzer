import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';
import AddNotes from './pages/addNotes.react.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <AddNotes />
        <DashboardPage />
        <LandingPage />
      </div>
    )
  }
};