import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest } from '../../../../redux/actions';

let fakeTest = [
  {
    id: 1,
    name: 'test one',
    prompt: 'this is prompt for test one',
    projectId: 1,
    url: 'www.url.com'
  },
  {
    id: 2,
    name: 'test Two',
    prompt: 'this is prompt for test two',
    projectId: 2,
    url: 'www.url.com'
  },
  {
    id: 3,
    name: 'test Three',
    prompt: 'this is prompt for test thres',
    projectId: 3,
    url: 'www.url.com'
  }
];


class TestContainer extends Component {

  updateTest (test) {
    this.props.dispatch(updatesTest(test));
  };

  deleteTest (test) {
    this.props.dispatch(deletesTest(test));
  };

  render () {
    return (
      <div className = "Tests">
        <h3>I am the test settings component</h3>
        <div>
          { fakeTest.map(function (test) {
            return <TestContainerEntry update = { this.updateTest.bind(this) } delete = { this.deleteTest.bind(this) } key = { test.id } name = { test.name } prompt = { test.prompt } id = { test.id } projectId = { test.projectId } url = { test.url } />
          }.bind(this)) }
        </div>
      </div>
    )
  };
}

const select = (state) => state

export default connect(select)(TestContainer)
