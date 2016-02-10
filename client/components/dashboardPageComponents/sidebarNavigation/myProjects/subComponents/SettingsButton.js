import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { contentState } from '../../../../../redux/actions';

class SettingsButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Settings'));
  }

  render () {
    return (
      <Button className = "SettingsButton btn-block" onClick = { this.handleClick.bind(this) }>
        Settings
      </Button>
    )
  }
}

const select = (state) => state

export default connect(select)(SettingsButton)