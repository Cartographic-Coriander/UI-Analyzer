import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './projectHeader/ProjectHeader';
import AddProjectContainer from './addProjectContainer/AddProjectContainer';
import ReportsContainer from './reportsContainer/ReportsContainer';
import SettingsContainer from './settingsContainer/SettingsContainer';
import TestContainer from './testContainer/TestContainer';

class Content extends Component {
  render () {
    return (
      <div className = "col-md-9 col-md-offset-3 content">
        {/* changing the project header when a project is selected */}
        { (() => {
            if (this.props.projects.list) {
              let currentProject, currentDescription;
              this.props.projects.list.forEach( (project) => {
                if ( this.props.currentFocus.project.id === project.id) {
                  currentProject = project.name;
                  currentDescription = project.description;
                }
              })
              return (
                <div className = "col-md-9">
                  <div className = "panel panel-default">
                    <div className = "panel-body">
                      <h3>{ currentProject }</h3>
                    </div>
                    <div className = "panel-footer">
                      <h4>{ currentDescription }</h4>
                    </div>
                  </div>
                </div>
              )
            }
          })() }
        {/* changing what is shown in content area based on which accordion button is clicked */}
        { (() => {
          switch (this.props.stateRouter.contentState) {
            case 'Reports':
              return <ReportsContainer />;
            case 'AddProject':
              return <AddProjectContainer />;
            case 'Settings':
              return <SettingsContainer />;
            case 'Test':
              return <TestContainer />;
            default:
              return <TestContainer />;
          }
        })() }
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(Content)