import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';
export const fields = ['firstName', 'lastName', 'company', 'emailField', 'passwordField'];

const validate = values => {
  const errors = {};
  if (!values.emailField) {
    errors.emailField = 'Required';
  }
  if (!values.passwordField) {
    errors.passwordField = 'Required';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  return errors;
};

class SignUpForm extends Component{
  render () {
  const { fields: { firstName, lastName, company, emailField, passwordField }, handleSubmit, submitting } = this.props;
    return (
    <Modal show = { this.props.visibility }>
      <form onSubmit = { handleSubmit }>
        <Row>
          <Col xs = { 2 } md = { 2 }>First Name</Col>
          <Col xs = { 12 } md = { 10 }>
            <Input type = "text" placeholder = "First Name" { ...firstName }/>
          </Col>
          { firstName.touched && firstName.error && <Col xs = { 2 } md = { 2 }>{ firstName.error }</Col> }
        </Row>
        <Row>
          <Col xs = { 2 } md = { 2 }>Surname</Col>
          <Col xs = { 12 } md = { 10 }>
            <Input type = "text" placeholder = "Surname" { ...lastName }/>
          </Col>
          { lastName.touched && lastName.error && <Col xs = { 2 } md = { 2 }>{ lastName.error }</Col> }
        </Row>
        <Row>
          <Col xs = { 2 } md = { 2 }>Company</Col>
          <Col xs = { 12 } md = { 10 }>
            <Input type="text" placeholder = "Company" { ...company }/>
          </Col>
          { company.touched && company.error && <Col xs = { 2 } md = { 2 }>{ company.error }</Col> }
        </Row>
        <Row>
          <Col xs = { 2 } md = { 2 }>e-mail</Col>
          <Col xs = { 12 } md = { 10 }>
            <Input type = "email" placeholder = "email" { ...emailField }/>
          </Col>
          { emailField.touched && emailField.error && <Col xs = { 2 } md = { 2 }>{ emailField.error }</Col> }
        </Row>
        <Row>
          <Col xs = { 2 } md = { 2 }>Password</Col>
          <Col xs = { 12 } md = { 10 }>
            <Input type = "password" placeholder = "Password" {...passwordField}/>
          </Col>
          { passwordField.touched && passwordField.error && <Col xs = { 2 } md = { 2 }>{ passwordField.error }</Col> }
        </Row>
        <Row>
          <Col xs = { 12 } md = { 12 }>
            <Button className = "btn-primary signup-button" type = "submit" disabled = { submitting }> sign up</Button>
            <Button type = "button" className = "signup-cancel-button" onClick = { () => this.props.toggleRegisterModal() }>cancel</Button>
          </Col>
        </Row>
      </form>
    </Modal>
    );
  }
};

SignUpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'SignUpForm',
  fields,
  validate
})(SignUpForm);