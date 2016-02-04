import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentState } from '../../../../../redux/actions';

class AddProjectButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('AddProject'));
  }
  render () {
    return (
      <button className = "AddProjectButton" onClick = { this.handleClick.bind(this) }>
        Add Project
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(AddProjectButton)