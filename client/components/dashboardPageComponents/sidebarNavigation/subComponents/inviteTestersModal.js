import React, { Component, PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
export const fields = ['firstNameField', 'emailField', 'surnameField'];

const validate = values => {
  const errors = {};
  if (!values.emailField) {
    errors.emailField = 'Required';
  }
  return errors;
};

class inviteTesters extends Component {
  render () {
  const { fields: { firstNameField, surnameField,  emailField }, handleSubmit, submitting } = this.props;
    return (
    <Modal show = { this.props.visibility } className = "inviteForm">
      <form onSubmit = { handleSubmit }>
        <div>
          <label>first name</label>
          <div>
            <Input type = "text" { ...firstNameField }/>
          </div>
          { firstNameField.touched && firstNameField.error && <div>{ firstNameField.error }</div>}
        </div>
        <div>
          <label>surname</label>
          <div>
            <Input type = "text" { ...surnameField }/>
          </div>
          { surnameField.touched && surnameField.error && <div>{ surnameField.error }</div>}
        </div>
        <div>
          <label>e-mail</label>
          <div>
            <Input type = "email" { ...emailField }/>
          </div>
          { emailField.touched && emailField.error && <div>{ emailField.error}</div> }
        </div>
        <div>
          <Button className = "login-button btn-primary" type = "submit" disabled = { submitting }>
            { submitting ? <i/> : <i/> } submit
          </Button>
          <Button className = "login-cancel-button" onClick = { this.props.toggle } type = "button">
            cancel
          </Button>
        </div>
      </form>
    </Modal>
    )
  }
};

inviteTesters.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'inviteTesters',
  fields,
  validate
})(inviteTesters);