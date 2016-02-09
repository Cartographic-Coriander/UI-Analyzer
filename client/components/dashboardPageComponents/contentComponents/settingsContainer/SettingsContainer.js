import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsContainer from './subComponents/EditSettingsContainer';
import ProjectEntryComponent from './subComponents/ProjectEntryComponent';
import { updatesProject, deletesProject } from '../../../../redux/actions';

class SettingsContainer extends Component {

  updateProject (project) {
    this.props.dispatch(updatesProject(project));
  };

  deleteProject (project) {
    this.props.dispatch(deletesProject(project));
  };

  render () {
    return (
      <div className = 'Settings'>
        { (() => {
          if (this.props.projects.error !== null) {
            return <div>{ this.props.projects.error }</div>
          }
        })() }
        { (() => {
          if (this.props.currentFocus.project.description !== null) {
            return <ProjectEntryComponent delete = { this.deleteProject.bind(this) } update = { this.updateProject.bind(this) } key = { this.props.currentFocus.project.id } id = { this.props.currentFocus.project.id } name = { this.props.currentFocus.project.name } description = { this.props.currentFocus.project.description }/>
          }
        })() }
      </div>
    )
  };
}

const select = (state) => ({
  projects: state.projects,
  currentFocus: state.currentFocus
});

export default connect(select)(SettingsContainer)
