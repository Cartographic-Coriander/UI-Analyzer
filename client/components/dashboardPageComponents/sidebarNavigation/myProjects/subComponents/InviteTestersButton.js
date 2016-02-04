import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inviteTesters } from '../../../../../redux/actions';
import { Button } from 'react-bootstrap';

class InviteTestersButton extends Component {
  handleClick () {
    this.props.dispatch(inviteTesters());
  }
  render () {
    return (
      <Button className = "InvteTestersButton btn-block" onClick = { this.handleClick.bind(this) }>
      Invite Testers
      </Button>
    )
  }
}

const select = (state) => state

export default connect(select)(InviteTestersButton)