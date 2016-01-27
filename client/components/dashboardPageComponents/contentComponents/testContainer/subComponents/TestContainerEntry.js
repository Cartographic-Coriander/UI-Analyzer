import React from 'react';
import TestEntryDescription from './TestEntryDescription.js';
import StartTestButton from './StartTestButton.js';
import EditTestButton from './EditTestButton.js';

export default React.createClass({

  render() {
    return (
      <h3>I am the test container entry component</h3>
      <TestEntryDescription />
      <StartTestButton />
      <EditTestButton />
    )
  }

});
