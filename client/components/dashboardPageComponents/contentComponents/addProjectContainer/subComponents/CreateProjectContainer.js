import React from 'react';
import InviteTesters from './InviteTesters';
import NewProjectButton from './NewProjectButton';
import ProjectDescriptionInput from './ProjectDescriptionInput';
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