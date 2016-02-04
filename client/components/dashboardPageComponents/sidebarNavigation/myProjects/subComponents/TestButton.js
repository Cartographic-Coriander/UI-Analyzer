import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';

class TestButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Test'));
  }
  render () {
    return (
      <button className = "TestButton" onClick = { this.handleClick.bind(this) }>
        Test
      </button>
    )
  }
}

const select = (state) => state.form

export default connect(select)(TestButton)