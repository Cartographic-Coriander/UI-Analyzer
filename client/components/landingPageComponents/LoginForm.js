import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
export const fields = ['emailField', 'passwordField'];
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

const validate = values => {
  const errors = {};
  if (!values.emailField) {
    errors.emailField = 'Required';
  }
  if (!values.passwordField) {
    errors.passwordField = 'Required';
  }
  return errors;
};

class LoginForm extends Component {
  render () {
    let errorMessage = () => {
      if(this.props.errorMessage) {
        return (
          <Row>
            <Col xs = { 2 } md = { 2 }></Col>
            <Col xs = { 12 } md = { 10 } bsStyle = "danger" className = "errorMessage">
              { this.props.errorMessage }
            </Col>
          </Row>
        );
      }
    };

    const { fields: { emailField, passwordField }, handleSubmit, submitting } = this.props;
    return (
      <Modal show = { this.props.visibility }>
        <form onSubmit={ handleSubmit }>
          <Row>
            <Col xs = { 2 } md = { 2 }>e-mail</Col>
            <Col xs = { 5 } md = { 10 }>
              <Input type = "email" placeholder = "email address" { ...emailField }/>
            </Col>
            { emailField.touched && emailField.error && <Col xs = { 2 } md = { 2 }>{ emailField.error }</Col> }
          </Row>
          <Row>
            <Col xs = { 2 } md = { 2 }>password</Col>
            <Col xs = { 5 } md = { 10 }>
              <Input id = "passwordInput" type = "password" placeholder = "password" { ...passwordField } onClick = { this.props.clearError } />
            </Col>
            { passwordField.touched && passwordField.error && <Col xs = { 2 } md = { 2 }>{ passwordField.error }</Col> }
          </Row>
          { () => errorMessage() }
          <Row>
            <Col xs = { 5 } md = { 12 }>
              <Button className = "login-button btn-primary" type = "submit" disabled = { submitting }> { submitting ? <i/> : <i/> } login </Button>
              <Button className = "login-cancel-button" onClick = { this.props.toggleLoginModal } type = "button">cancel</Button>
            </Col>
          </Row>
        </form>
      </Modal>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'LoginForm',
  fields,
  validate
})(LoginForm);
