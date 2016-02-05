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
        { (() => {
          switch (this.props.stateRouter.contentState) {
            case 'Reports':
              return <ReportsContainer />;
            case 'Dashboard':
              return <DashboardContainer />;
            case 'AddProject':
              return <AddProjectContainer />;
            case 'GetStarted':
              return <GetStartedContainer />;
            case 'Settings':
              return <SettingsContainer />;
            case 'Test':
              return <TestContainer />;
          }
        })() }
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(Content)