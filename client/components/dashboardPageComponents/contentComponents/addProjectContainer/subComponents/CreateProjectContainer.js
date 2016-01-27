import React from 'react';
import InviteTesters from './InviteTesters.js';
import NewProjectButton from './NewProjectButton.js';
import ProjectDescriptionInput from './ProjectDescriptionInput.js';
import ProjectNameInput from './ProjectNameInput';

export default React.createClass({

  render() {
    return (
      <h3>I am the create project container</h3>
      <ProjectNameInput />
      <ProjectDescriptionInput />
      <InviteTesters />
      <NewProjectButton />
    )
  }

});