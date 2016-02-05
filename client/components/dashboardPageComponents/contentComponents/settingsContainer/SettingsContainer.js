import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsContainer from './subComponents/EditSettingsContainer';
import ProjectEntryComponent from './subComponents/ProjectEntryComponent';
import { updatesProject } from '../../../../redux/actions';

class SettingsContainer extends Component {

  updateProject (project) {
    this.props.dispatch(updatesProject(project));
  }

  render () {
    return (
      <div className = 'Settings'>
        <h3>I am the settings container component</h3>
        { (() => {
          if (this.props.projects.error !== null) {
            return <div>{ this.props.projects.error }</div>
          }
        })() }
        <div>
        { this.props.projects.list.map(function (project) {
          return <ProjectEntryComponent update = { this.updateProject.bind(this) } key = { project.id } id = { project.id } name = { project.name } description = { project.description }/>
        }.bind(this)) }
        {/*<EditSettingsContainer />*/}
        </div>
      </div>
    )
  }
}

const select = (state) => ({
  projects: state.projects
});

export default connect(select)(SettingsContainer)
