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
        <div>
        { this.props.projects.list.map(function (project) {
          return <ProjectEntryComponent delete = { this.deleteProject.bind(this) } update = { this.updateProject.bind(this) } key = { project.id } id = { project.id } name = { project.name } description = { project.description }/>
        }.bind(this)) }
        {/*<EditSettingsContainer />*/}
        </div>
      </div>
    )
  };
}

const select = (state) => ({
  projects: state.projects
});

export default connect(select)(SettingsContainer)
