import React, { Component } from 'react';
import TestButton from './TestButton';
import ReportsButton from './ReportsButton';
import SettingsButton from './SettingsButton';
import InviteTestersButton from './InviteTestersButton';

export default class extends Component {
  render () {
    return (
      <li className = "Accordian">
        <li><TestButton /></li>
        <li><ReportsButton /></li>
        <li><SettingsButton /></li>
        <li><InviteTestersButton /></li>
      </li>
    )
  }
}