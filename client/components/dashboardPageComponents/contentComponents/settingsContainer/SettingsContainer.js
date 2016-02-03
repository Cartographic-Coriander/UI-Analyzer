import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsContainer from './subComponents/EditSettingsContainer';
import ProjectEntryComponent from './subComponents/ProjectEntryComponent';

let fakeData = {
  list: [{
        id: 1,
        name: 'project one',
        description: 'damn MVP'
      },
      {
        id: 2,
        name: 'project two',
        description: 'heatmaps'
      },
      {
        id: 3,
        name: 'project three',
        description: 'reports'
      },
      {
        id: 4,
        name: 'project four',
        description: 'styling'
  }],
  error: null,
};


class SettingsContainer extends Component {

  render () {

    return (
      <div className = 'Settings'>
        <h3>I am the settings container component</h3>
        { (() => {
          if (fakeData.error !== null) {
            return <div>{fakeData.error}</div>
          }
        })() }
        <div>
        { fakeData.list.map(function (project) {
          return <ProjectEntryComponent key={ project.id } name={ project.name } description={ project.description }/>
        }) }
        {/*<EditSettingsContainer />*/}
        </div>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(SettingsContainer)
