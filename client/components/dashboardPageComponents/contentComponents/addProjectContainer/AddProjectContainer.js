import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProjectContainer from './subComponents/CreateProjectContainer';
import ProjectConfirmation from './subComponents/ProjectConfirmation';
import { addProject, confirmProject } from '../../../../redux/actions';

class AddProjectContainer extends Component {
  constructor () {
    super(props);
    this.state = {
      confirm: {
        projectName: null,
        projectDescription: null
      }
    };
  }

  onSubmit (project) {
    this.setState({ confirm: project });
  }

  onConfirm (project) {
    let params = { projectName: null, projectDescription: null };

    this.setState({ confirm: params });
    this.props.dispatch(postsProject(project));
  }

  render () {
    return (
      <div className = 'AddProject'>
        <h3>I am the add project container component</h3>
        <CreateProjectContainer onSubmit = { this.onSubmit.bind(this) }/>
        { (() => {
          if (this.state.confirm.projectName !== null) {
            return <ProjectConfirmation project = { this.state.confirm } confirmProject = { this.onConfirm.bind(this) }/>
          }
        })() }
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(AddProjectContainer)
