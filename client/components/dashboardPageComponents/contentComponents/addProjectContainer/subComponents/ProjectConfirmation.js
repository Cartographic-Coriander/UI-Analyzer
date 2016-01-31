import React, { Component } from 'react';

export default class extends Component {
  render () {
    return (
      <div className = 'ProjectConfirmation'>
        Project Name: { this.props.project.projectName }
        Project Description: { this.props.project.projectDescription }
        <button className = "ConfirmProjectButton" onClick = { () => this.props.confirmProject( this.props.project ) }>Confirm</button>
      </div>
    )
  }
}