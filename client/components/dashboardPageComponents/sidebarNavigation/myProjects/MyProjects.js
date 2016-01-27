import React from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './AddProjectButton';

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