import React from 'react';
import TestEntryDescription from './TestEntryDescription';
import CompareButton from './CompareButton';
import MakeGithubIssueButton from './MakeGithubIssueButton';
import ReportDetails from './ReportDetails';

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
