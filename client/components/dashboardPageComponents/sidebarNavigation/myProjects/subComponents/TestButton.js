import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { contentState, getsTest } from '../../../../../redux/actions';

class TestButton extends Component {
  handleClick () {
    this.props.dispatch(getsTest({ projectId: this.props.id }))
    this.props.dispatch(contentState('Test'));
  }

  render () {
    return (
      <Button className = "TestButton btn-block" onClick = { this.handleClick.bind(this) }>
        Test
      </Button>
    );
  }
}

const select = (state) => state

export default connect(select)(TestButton)