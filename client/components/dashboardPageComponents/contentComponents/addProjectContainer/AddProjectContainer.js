import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProjectContainer from './subComponents/CreateProjectContainer';
import ProjectConfirmation from './subComponents/ProjectConfirmation';
import { addProject, confirmProject } from '../../../../redux/actions';

class AddProjectContainer extends Component {
  onSubmit (project) {
    this.props.dispatch(confirmProject(project));
  }
  onConfirm (project) {
    let params = { projectName: null, projectDescription: null };
    this.props.dispatch(confirmProject(params));
    this.props.dispatch(addProject(project));
  }
  render () {
    return (
      <div className = 'AddProject'>
        <h3>I am the add project container component</h3>
        <CreateProjectContainer onSubmit = { this.onSubmit.bind(this) }/>
        { (() => {
          if (this.props.projectReducer.confirm.projectName !== null) {
            return <ProjectConfirmation project = { this.props.projectReducer.confirm } confirmProject = { this.onConfirm.bind(this) }/>
          }
        })() }
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(AddProjectContainer)
