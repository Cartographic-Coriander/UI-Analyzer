import React from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';

export default React.createClass({

  render() {
    return (
    <div>
      <li>
        <ProjectListEntry />
      </li>
      <AddProjectButton />
    </div>
    )
  }

});