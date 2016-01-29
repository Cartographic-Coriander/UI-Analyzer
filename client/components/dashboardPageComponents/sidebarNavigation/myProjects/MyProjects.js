import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';

export default class extends Component {
  render () {
    return (
    <div>
      <li>
        <ProjectListEntry />
      </li>
      <AddProjectButton />
    </div>
    )
  }
}