import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inviteTesters } from '../../../../../redux/actions';

class InviteTestersButton extends Component {
  handleClick () {
    this.props.dispatch(inviteTesters());
  }
  render () {
    return (
      <button className = "InvteTestersButton" onClick = { this.handleClick.bind(this) }>
      Invite Testers
      </button>
    )
  }
}

const select = (state) => state.form

export default connect(select)(InviteTestersButton)