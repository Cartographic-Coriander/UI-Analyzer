import React, { Component } from 'react';
import LandingPage from './pages/LandingPage.react';
import DashboardPage from './pages/DashboardPage.react';

export default class App extends Component {
  render() {
    return (
      <div>
        <DashboardPage />
        <LandingPage />
      </div>
    )
  }
};