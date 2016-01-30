import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './projectHeader/ProjectHeader';
import DashboardContainer from './dashboardContainer/DashboardContainer';
import AddProjectContainer from './addProjectContainer/AddProjectContainer';
import GetStartedContainer from './getStartedContainer/GetStartedContainer';
import ReportsContainer from './reportsContainer/ReportsContainer';
import SettingsContainer from './settingsContainer/SettingsContainer';
import TestContainer from './testContainer/TestContainer';

class Content extends Component {
  render () {
    return (
      <div>
        <ProjectHeader />
        <DashboardContainer visibility = { this.props.visibleContentComponent }/>
        <AddProjectContainer visibility = { this.props.visibleContentComponent }/>
        <GetStartedContainer visibility = { this.props.visibleContentComponent }/>
        <ReportsContainer visibility = { this.props.visibleContentComponent }/>
        <SettingsContainer visibility = { this.props.visibleContentComponent }/>
        <TestContainer visibility = { this.props.visibleContentComponent }/>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(Content)