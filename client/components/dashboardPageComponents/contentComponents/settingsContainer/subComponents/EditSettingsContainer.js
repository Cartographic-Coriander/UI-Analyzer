import React from 'react';
import EditDescription from './EditDescription.js';
import EditName from './EditName.js';
import EditRoles from './EditRoles.js';
import EditTests from './EditTests.js';

export default React.createClass({

  render() {
    return (
      <h3>I am the edit settings container component</h3>
      <EditDescription />
      <EditName />
      <EditRoles />
      <EditTests />
    )
  }

});
