import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
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
    <Modal show={ this.props.showRegistrationModal }>
      <form onSubmit={ handleSubmit }>
        <div>
          <label>first name</label>
          <div>
            <input type="text" {...firstName}/>
          </div>
          {firstName.touched && firstName.error && <div>{firstName.error}</div>}
        </div>
        <div>
          <label>last name</label>
          <div>
            <input type="text" {...lastName}/>
          </div>
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </div>
        <div>
          <label>company</label>
          <div>
            <input type="text" {...company}/>
          </div>
          {company.touched && company.error && <div>{company.error}</div>}
        </div>
        <div>
          <label>enter e-mail</label>
          <div>
            <input type="text" {...emailField}/>
          </div>
          {emailField.touched && emailField.error && <div>{emailField.error}</div>}
        </div>
        <div>
          <label>enter password</label>
          <div>
            <input type="text" {...passwordField}/>
          </div>
          {passwordField.touched && passwordField.error && <div>{passwordField.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} sign up
          </button>
        </div>
      </form>
    </Modal>
    )
  }
}

SignUpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'SignUpForm',
  fields,
  validate
})(SignUpForm);