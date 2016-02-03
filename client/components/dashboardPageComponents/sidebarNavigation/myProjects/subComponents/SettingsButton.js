import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';
import { Button } from 'react-bootstrap';

class SettingsButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Settings'));
  }
  render () {
    return (
      <Button className = "SettingsButton" onClick = { this.handleClick.bind(this) }>
        Settings
      </Button>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(SettingsButton)