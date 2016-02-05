import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest, postsTest } from '../../../../redux/actions';
import { Modal } from 'react-bootstrap';

class TestContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      testModalDisplay: false,
      addTestName : null,
      addTestPrompt: null,
      addTestUrl: null
    };
  };

  //editing existing tests
  updateTest (test) {
    this.props.dispatch(updatesTest(test));
  };

  deleteTest (test) {
    this.props.dispatch(deletesTest(test));
  };

  //adding new tests
  addTest (test) {
    console.log(this)
    let newTest = {
      projectId: this.props.currentFocus.projectId,
      name: this.state.addTestName,
      url: this.state.addTestUrl,
      prompt: this.state.addTestPrompt 
    };
    this.hideModal();
    console.log(newTest);
    this.props.dispatch(postsTest(newTest));
  };

  newTestName (event) {
    this.setState({ addTestName : event.target.value });
  };

  newTestPrompt (event) {
    this.setState({ addTestPrompt : event.target.value });
  };

  newTestUrl (event) {
    this.setState({ addTestUrl : event.target.value });
  };

  //for showing and hiding modals
  toggleModal () {
    this.setState({
      testModalDisplay : this.state.testModalDisplay === true ? false : true
    })
  }

  hideModal () {
    this.setState({
      testModalDisplay : false
    })
  }

  //to get to the proxy server
  redirect () {
    let newUrl="www.google.com";

    window.location=newUrl;
  }

  render () {

    return (
      <div className = "Tests">
        <h3>I am the test settings component</h3>
        <div>
          { this.props.tests.list.map(function (test) {
            return <TestContainerEntry update = { this.updateTest.bind(this) } delete = { this.deleteTest.bind(this) } key = { test.id } name = { test.name } prompt = { test.prompt } id = { test.id } projectId = { test.projectId } url = { test.url } />
          }.bind(this)) }
        </div>

        <Modal show = { this.state.testModalDisplay }>
          <form>
            test name: <input onChange = { this.newTestName.bind(this) } type = "text"></input><br></br>
            test prompt: <input onChange = { this.newTestPrompt.bind(this) } type = "text"></input><br></br>
            test url: <input onChange = { this.newTestUrl.bind(this) } type = "text"></input><br></br>
            <button onClick = { this.addTest.bind(this) } type = "button">submit</button> <button onClick = { this.hideModal.bind(this) } type= "button" >cancel</button>
          </form>
        </Modal>

        <button onClick = { this.toggleModal.bind(this) } type= "button">add test</button>
        <button onClick = { this.redirect.bind(this) } type = "button">Start test</button>
      </div>
    )
  };
}

const select = (state) => state

export default connect(select)(TestContainer)
