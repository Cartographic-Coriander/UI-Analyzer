import React, { Component } from 'react';
import InviteTesters from './InviteTesters';
import NewProjectButton from './NewProjectButton';
import ProjectDescriptionInput from './ProjectDescriptionInput';
import ProjectNameInput from './ProjectNameInput';

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the create project container</h3>
        <ProjectNameInput />
        <ProjectDescriptionInput />
        <InviteTesters />
        <NewProjectButton />
      </div>
    )
  }
}