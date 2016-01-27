import React from 'react';
import EditDescription from './EditDescription';
import EditName from './EditName';
import EditRoles from './EditRoles';
import EditTests from './EditTests';

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
