import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
export const fields = ['emailField', 'passwordField'];

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

class LoginForm extends Component{
  render () {
  const { fields: { emailField, passwordField }, handleSubmit, submitting } = this.props;
    return (
    <Modal>
      <form onSubmit={ handleSubmit }>
        <div>
          <label>e-mail</label>
          <div>
            <input type="text" {...emailField}/>
          </div>
          {emailField.touched && emailField.error && <div>{emailField.error}</div>}
        </div>
        <div>
          <label>password</label>
          <div>
            <input type="text" {...passwordField}/>
          </div>
          {passwordField.touched && passwordField.error && <div>{passwordField.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} login
          </button>
        </div>
      </form>
    </Modal>
    )
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
