import React, { Component } from 'react';

export default class extends Component {
  render () {
    var className = () => this.props.project.projectName !== null ? 'ProjectConfirmation' : 'hide'
    return (
      <div className = { className() }>
        Project Name: { this.props.project.projectName }
        Project Description: { this.props.project.projectDescription }
        <button className = "ConfirmProjectButton" onClick = { () => this.props.confirmProject(this.props.project) }>Confirm</button>
      </div>
    )
  }
}