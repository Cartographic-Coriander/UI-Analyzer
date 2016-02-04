import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';

class TestContainer extends Component {
  render () {
    return (
      <div className = 'Test'>
        <h3>I am the test container component</h3>
        <TestContainerEntry />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(TestContainer)
