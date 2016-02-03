import React, { Component } from 'react';
import TestEntryDescription from './TestEntryDescription';
import StartTestButton from './StartTestButton';
import EditTestButton from './EditTestButton';

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the test container entry component</h3>
        <TestEntryDescription />
        <StartTestButton />
        <EditTestButton />
      </div>
    )
  }
}
