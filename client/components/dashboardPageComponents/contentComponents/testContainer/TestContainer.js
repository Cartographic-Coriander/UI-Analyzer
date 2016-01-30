import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';

class TestContainer extends Component {
  render () {
    var className = () => this.props.buttonReducer.visibleContentComponent === 'Test' ? 'Test' : 'hide';
    return (
      <div className = { className() }>
        <h3>I am the test container component</h3>
        <TestContainerEntry />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(TestContainer)
