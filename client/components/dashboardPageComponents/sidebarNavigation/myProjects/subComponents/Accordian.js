import React from 'react';
import TestButton from './TestButton';
import ReportsButton from './ReportsButton';
import SettingsButton from './SettingsButton';
import InviteTestersButton from './InviteTestersButton';

export default React.createClass({
  
  render() {
    return (
      <div className = "Accordian">
        <TestButton />
        <ReportsButton />
        <SettingsButton />
        <InviteTestersButton />
      </div>
    )
  }

});