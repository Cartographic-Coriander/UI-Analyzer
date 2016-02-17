import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest, postsTest, setFocus, pageState, getsImage, contentState } from '../../../../redux/actions';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

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
    // this.props.dispatch(getsImage({ testId: }))
  };

  deleteTest (test) {
    this.props.dispatch(deletesTest(test));
  };

  getReport (test) {
    this.props.dispatch(getsImage(test));
    // this.props.dispatch(contentState('Reports'));
    this.props.dispatch(setFocus('test', test))
    this.props.dispatch(pageState('reportView'));
  };

  //adding new tests
  addTest (test) {
    let urlInput = this.state.addTestUrl;
    let testUrl = urlInput.substr(0,4) === 'www.' ? 'http://' + urlInput : urlInput;
    let newTest = {
      projectId: this.props.currentFocus.project.id,
      name: this.state.addTestName,
      url: testUrl,
      prompt: this.state.addTestPrompt
    };

    this.hideModal();
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
      testModalDisplay: !this.state.testModalDisplay
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

    //sending user to image commenting page
    this.props.dispatch(pageState('imageView'));

    //sending user to mouse tracking page
    let newUrl = window.location.origin + '/testview?url=' + test.url + '&testId=' + test.testId + '&access_token=' + test.access_token + '&location=' + location + '&callbackUrl=' + window.location.origin + '&prompt=' + test.prompt;
    this.props.dispatch(setFocus('test', this.props.tests.list[test.index]));

    window.location = newUrl;
  }

  render () {
    return (
      <div>
        <div>
          { this.props.tests.list.map((test, index) => {
              console.log(index)
              return <TestContainerEntry
                update = { this.updateTest.bind(this) }
                delete = { this.deleteTest.bind(this) }
                startTest = { this.startTest.bind(this) }
                viewReport = { this.getReport.bind(this) }
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
        <Row>
          <Col xs = { 12 } md = { 9 }>
            <Button onClick = { this.toggleModal.bind(this) } className = "addTestButton btn-primary btn-md pull-right" type= "button">add test</Button>
          </Col>
        </Row>

        <Modal show = { this.state.testModalDisplay }>
          <form>
            <Row>
              <Col xs = { 2 } md = { 2 }>Test Name</Col>
              <Col xs = { 12 } md = { 10 }>
                <Input onChange = { this.newTestName.bind(this) } className = "addTestInput" type = "text" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 2 }>Test Url</Col>
              <Col xs = { 12 } md = { 10 }>
                <Input onChange = { this.newTestUrl.bind(this) } className = "addTestInput" type = "text" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 2 }>Test Prompt</Col>
              <Col xs = { 12 } md = { 10 }>
                <Input onChange = { this.newTestPrompt.bind(this) } type = "textarea" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 12 } md = { 12 }>
                <Button className = "btn-primary" onClick = { this.addTest.bind(this) } type = "button">submit</Button>
                <Button onClick = { this.hideModal.bind(this) } type= "button">cancel</Button>
              </Col>
            </Row>
          </form>
        </Modal>
      </div>
    );
  };
}

const select = (state) => state

export default connect(select)(TestContainer)
