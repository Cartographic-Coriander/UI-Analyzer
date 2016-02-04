import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentState } from '../../../../../redux/actions';

class TestButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Test'));
  }
  render () {
    return (
      <button className = "TestButton" onClick = { this.handleClick.bind(this) }>
        Test
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(TestButton)