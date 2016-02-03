import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';
import { Button } from 'react-bootstrap';

class TestButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Test'));
  }
  render () {
    return (
      <Button className = "TestButton" onClick = { this.handleClick.bind(this) }>
        Test
      </Button>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(TestButton)