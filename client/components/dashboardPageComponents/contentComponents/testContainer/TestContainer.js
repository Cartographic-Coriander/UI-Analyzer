import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest, postsTest, setFocus } from '../../../../redux/actions';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

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
      projectId: this.props.currentFocus.project.id,
      name: this.state.addTestName,
      url: this.state.addTestUrl,
      prompt: this.state.addTestPrompt
    };
    this.hideModal();
    console.log(newTest);
    this.props.dispatch(postsTest(newTest));
  };

  newTestName (event) {
    this.setState({ addTestName: event.target.value });
  };

  newTestPrompt (event) {
    this.setState({ addTestPrompt: event.target.value });
  };

  newTestUrl (event) {
    this.setState({ addTestUrl: event.target.value });
  };

  //for showing and hiding modals
  toggleModal () {
    this.setState({
      testModalDisplay: this.state.testModalDisplay === true ? false : true
    })
  }

  hideModal () {
    this.setState({
      testModalDisplay : false
    })
  }

  //to get to the proxy server
  startTest (test) {
    let portLength = window.location.port.length > 0 ? window.location.port.length + 1 : 0;
    let location = window.location.origin.slice(0, -portLength);
    let newUrl = window.location.origin + '/testview?url=' + test.url + '&testId=' + test.testId + '&access_token=' + test.access_token + '&location=' + location;

    this.props.dispatch(setFocus('test', this.props.tests.list[test.index]));
    window.location = newUrl;
  }

  render () {
    return (
      <div className = "Tests">
        <div>
          { this.props.tests.list.map((test, index) => {
              console.log(index)
              return <TestContainerEntry
                update = { this.updateTest.bind(this) }
                delete = { this.deleteTest.bind(this) }
                startTest = { this.startTest.bind(this) }
                key = { test.id }
                index = { index }
                name = { test.name }
                prompt = { test.prompt }
                id = { test.id }
                projectId = { test.projectId }
                url = { test.url }
              />
            })
          }
        </div>

        <Modal show = { this.state.testModalDisplay }>
          <form>
            <span className = "createTestSpan">test name: </span><input onChange = { this.newTestName.bind(this) } className = "addTestInput" type = "text"></input><br></br>
            <span className = "createTestSpan">test prompt: </span><input onChange = { this.newTestPrompt.bind(this) } className = "addTestInput" type = "text"></input><br></br>
            <span className = "createTestSpan">test url: </span><input onChange = { this.newTestUrl.bind(this) } className = "addTestInput" type = "text"></input><br></br>
            <Button onClick = { this.addTest.bind(this) } type = "button">submit</Button>
            <Button onClick = { this.hideModal.bind(this) } type= "button">cancel</Button>
          </form>
        </Modal>
        <Button onClick = { this.toggleModal.bind(this) } className = "addTestButton" type= "button">add test</Button>
      </div>
    );
  };
}

const select = (state) => state

export default connect(select)(TestContainer)
