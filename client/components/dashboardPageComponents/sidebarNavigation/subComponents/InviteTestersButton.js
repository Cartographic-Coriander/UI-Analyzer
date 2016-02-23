import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import inviteTesters from '../../../../redux/actions';

class InviteTestersButton extends Component {
  handleClick () {
    this.props.dispatch(inviteTesters());
    this.props.toggleInviteModal()
  }
  render () {
    return (
      <Button className = "InviteTestersButton btn-block" onClick = { this.handleClick.bind(this) }>
      Invite Testers
      </Button>
    )
  }
}

const select = (state) => state

export default connect(select)(InviteTestersButton)