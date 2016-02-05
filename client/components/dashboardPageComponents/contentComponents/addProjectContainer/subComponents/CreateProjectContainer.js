import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import InviteTesters from './InviteTesters';
export const fields = [ 'projectName', 'projectDescription' ];
import { Modal } from 'react-bootstrap';

const validate = values => {
  const errors = {};
  if (!values.projectName) {
    errors.projectName = 'Required';
  } else if (values.projectName.length > 50) {
    errors.projectName = 'Must be 50 characters or less';
  }
  return errors;
};

class CreateProjectContainer extends Component {
  render () {
    const { fields: { projectName, projectDescription }, handleSubmit, submitting } = this.props;
    return (
      <Modal show = { this.props.visibility }>
        <form onSubmit={ handleSubmit }>
          <div>
            <label>Project Name</label>
            <div>
              <input type="text" placeholder="Project Name" {...projectName}/>
            </div>
            {projectName.touched && projectName.error && <div>{projectName.error}</div>}
          </div>
          <div>
            <label>Project Description</label>
            <div>
              <textarea placeholder="Project Description..." {...projectDescription}/>
            </div>
            {projectDescription.touched && projectDescription.error && <div>{projectDescription.error}</div>}
          </div>
          <div>
            <button type="submit" disabled={submitting}>
              {submitting ? <i/> : <i/>} Create Project
            </button>
            <button type="button" onClick= { this.props.hideVisibility }>
              cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

CreateProjectContainer.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'createProject',
  fields,
  validate
})(CreateProjectContainer);