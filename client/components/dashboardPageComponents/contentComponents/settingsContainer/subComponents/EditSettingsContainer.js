import React, { Component } from 'react';
import EditDescription from './EditDescription';
import EditName from './EditName';
import EditRoles from './EditRoles';
import EditTests from './EditTests';

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the edit settings container component</h3>
        <EditDescription />
        <EditName />
        <EditRoles />
        <EditTests />
      </div>
    )
  }
}
