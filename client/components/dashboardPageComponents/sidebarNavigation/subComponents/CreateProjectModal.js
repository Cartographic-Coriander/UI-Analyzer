import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Col, Modal, Row, Input, H5 } from 'react-bootstrap';
export const fields = [ 'projectName', 'projectDescription' ];

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
      <Modal show = { this.props.visibility } >
        <form onSubmit={ handleSubmit }>
          <Row>
            <Col xs = { 5 } md = { 12 }>
              <h4>Create a Project</h4>
            </Col>
          </Row>
          <Row>
            <Col xs = { 2 } md = { 2 }>Name</Col>
            <Col xs = { 5 } md = { 12 }>
              <Input type="text" placeholder="Project Name" {...projectName}/>
            </Col>
            {projectName.touched && projectName.error && <div>{projectName.error}</div>}
          </Row>
          <Row>
            <Col xs = { 2 } md = { 2 }>Description</Col>
            <Col xs = { 5 } md = { 12 }>
              <Input type = "textarea" placeholder="Project Description..." {...projectDescription}/>
            </Col>
            {projectDescription.touched && projectDescription.error && <div>{projectDescription.error}</div>}
          </Row>
          <Row>
            <Col xs = { 5 } md = { 12 }>
              <Button className = "btn-primary pull-right" type = "submit" disabled={ submitting}>{submitting ? <i/> : <i/> } Create Project</Button>
              <Button className = "pull-right" type = "button" onClick= { this.props.toggleVisibility }>cancel</Button>
            </Col>
          </Row>
        </form>
      </Modal>
    );
  }
};

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