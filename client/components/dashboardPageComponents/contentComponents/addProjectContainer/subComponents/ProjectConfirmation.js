import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class extends Component {
  render () {
    return (
      <div className = 'ProjectConfirmation'>
        Project Name: { this.props.project.projectName }
        Project Description: { this.props.project.projectDescription }
        <Button className = "ConfirmProjectButton" onClick = { () => this.props.confirmProject(this.props.project) }>Confirm</Button>
      </div>
    )
  }
}