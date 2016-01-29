import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportListEntry from './subComponents/ReportListEntry';

class ReportsContainer extends Component {
  render () {
    var className = () => this.props.visibleContentComponent === 'Reports' ? 'Reports' : 'hide';
    return (
      <div className = { className() }>
        <h3>I am the reports container component</h3>
        <ReportListEntry />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(ReportsContainer)
