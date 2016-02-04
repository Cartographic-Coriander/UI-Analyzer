import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentState } from '../../../../../redux/actions';

class SettingsButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Settings'));
  }
  render () {
    return (
      <button className = "SettingsButton" onClick = { this.handleClick.bind(this) }>
        Settings
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(SettingsButton)