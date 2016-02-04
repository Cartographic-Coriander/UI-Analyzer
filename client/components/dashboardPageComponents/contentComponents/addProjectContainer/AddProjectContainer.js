import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProjectContainer from './subComponents/CreateProjectContainer';
import ProjectConfirmation from './subComponents/ProjectConfirmation';
import { postsProject } from '../../../../redux/actions';

class AddProjectContainer extends Component {
  constructor (props) {
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

  onConfirm (data) {
    let nullParams = { projectName: null, projectDescription: null };
    let params = { name: data.projectName, description: data.projectDescription };

    this.setState({ confirm: nullParams });
    this.props.dispatch(postsProject(params));
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
