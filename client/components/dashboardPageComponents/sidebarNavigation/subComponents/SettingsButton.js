import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { contentState, setFocus } from '../../../../redux/actions';

class SettingsButton extends Component {
  handleClick () {
    var params = {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description
    };

    this.props.dispatch(setFocus('project', params));
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