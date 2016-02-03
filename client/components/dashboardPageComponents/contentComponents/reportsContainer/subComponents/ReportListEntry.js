import React, { Component } from 'react';
import TestEntryDescription from './TestEntryDescription';
import CompareButton from './CompareButton';
import MakeGithubIssueButton from './MakeGithubIssueButton';
import ReportDetails from './ReportDetails';

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the report list entry component</h3>
        <TestEntryDescription />
        <CompareButton />
        <MakeGithubIssueButton />
        <ReportDetails />
      </div>
    )
  }
}
