import React, { Component } from 'react';
import ProjectButton from './ProjectButton';
import Accordian from './Accordian';

export default class extends Component {
  render () {
    return (
      <div className = "ProjectListEntry">
        <ProjectButton />
        <Accordian />
      </div>
    )
  }
}