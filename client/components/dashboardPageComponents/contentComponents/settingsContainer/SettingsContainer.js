import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsContainer from './subComponents/EditSettingsContainer';
import ProjectEntryComponent from './subComponents/ProjectEntryComponent';

class SettingsContainer extends Component {
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
          return <ProjectEntryComponent key = { project.id } name = { project.name } description = { project.description }/>
        }) }
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
