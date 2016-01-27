import React from 'react';
import TestEntryDescription from './TestEntryDescription';
import StartTestButton from './StartTestButton';
import EditTestButton from './EditTestButton';

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
