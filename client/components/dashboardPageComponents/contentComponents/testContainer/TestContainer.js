import React, { Component } from 'react';
import TestContainerEntry from './subComponents/TestContainerEntry';

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the test container component</h3>
        <TestContainerEntry />
      </div>
    )
  }
}