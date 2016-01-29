import React, { Component } from 'react';
import TestButton from './TestButton';
import ReportsButton from './ReportsButton';
import SettingsButton from './SettingsButton';
import InviteTestersButton from './InviteTestersButton';

export default class extends Component {
  render () {
    return (
      <div className = "Accordian">
        <TestButton />
        <ReportsButton />
        <SettingsButton />
        <InviteTestersButton />
      </div>
    )
  }
}