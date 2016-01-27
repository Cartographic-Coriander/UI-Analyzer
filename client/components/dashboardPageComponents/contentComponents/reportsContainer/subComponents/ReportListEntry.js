import React from 'react';
import TestEntryDescription from './TestEntryDescription.js';
import CompareButton from './CompareButton.js';
import MakeGithubIssueButton from './MakeGithubIssueButton.js';
import ReportDetails from './ReportDetails.js';

export default React.createClass({

  render() {
    return (
      <h3>I am the report list entry component</h3>
      <TestEntryDescription />
      <CompareButton />
      <MakeGithubIssueButton />
      <ReportDetails />
    )
  }

});
