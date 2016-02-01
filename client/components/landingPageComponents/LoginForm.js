import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
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
    <form onSubmit={ handleSubmit }>
      <div>
        <label>enter e-mail</label>
        <div>
          <input type="text" placeholder="enter e-mail" {...emailField}/>
        </div>
        {emailField.touched && emailField.error && <div>{emailField.error}</div>}
      </div>
      <div>
        <label>enter password</label>
        <div>
          <input type="text" placeholder="------password-----:)" {...passwordField}/>
        </div>
        {passwordField.touched && passwordField.error && <div>{passwordField.error}</div>}
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} login
        </button>
      </div>
    </form>
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
