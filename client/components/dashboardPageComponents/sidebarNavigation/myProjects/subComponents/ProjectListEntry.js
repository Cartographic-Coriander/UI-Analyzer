import React, { Component } from 'react';
import ProjectButton from './ProjectButton';

export default class extends Component {
  render () {
    return (
      <div className = "ProjectListEntry">
        <ProjectButton />
      </div>
    )
  }
}