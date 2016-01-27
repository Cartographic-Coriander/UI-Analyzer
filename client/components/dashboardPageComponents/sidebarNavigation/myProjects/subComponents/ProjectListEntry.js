import React from 'react';
import ProjectButton from './ProjectButton';
import Accordian from './Accordian';

export default React.createClass({

  render() {
    return (
      <div className = "ProjectListEntry">
        <ProjectButton />
        <Accordian />
      </div>
    )
  }

})