import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';

class SettingsButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Settings'));
  }
  render () {
    return (
      <button className = "SettingsButton" onClick = { this.handleClick.bind(this) }>
        Settings
      </button>
    )
  }
}

const select = (state) => state.form

export default connect(select)(SettingsButton)