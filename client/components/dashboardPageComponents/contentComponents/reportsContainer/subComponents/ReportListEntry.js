import React, { Component } from 'react';
import TestEntryDescription from './TestEntryDescription';
import CompareButton from './CompareButton';
import MakeGithubIssueButton from './MakeGithubIssueButton';
import ReportDetails from './ReportDetails';

export default class extends Component {
  
  getReportDetailForImage () {
    const params = {
      imageId: image.id
    };

    this.props.reportDetails(params);
  };



  render () {
    return (
      <div>
      
      </div>
    )
  }
}
