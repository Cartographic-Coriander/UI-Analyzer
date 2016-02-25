import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest, postsTest, getsImage, getsTest, getsProject } from '../../../../redux/actions';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

class TestContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testModalDisplay: false,
      addTestName : null,
      addTestPrompt: null,
      addTestUrl: null
    };
  };

  componentWillMount () {
    this.props.dispatch(getsProject(this.setInitialState.bind(this)));
  };

  setInitialState () {
    this.props.dispatch(getsTest({ projectId: this.props.projects.list[this.props.params.projectIndex].id }, browserHistory, this.props.params.projectIndex));
  };

  //to get to the proxy server
  startTest (test) {
    let portLength = window.location.port.length > 0 ? window.location.port.length + 1 : 0;
    let location = window.location.origin.slice(0, -portLength);

    //sending user to mouse tracking page
    let newUrl = `${ window.location.origin }/testview?url=${ test.url }&testId=${ test.testId }&access_token=${ test.access_token }&location=${ location }&callbackUrl=${ window.location.origin }/addcomments/${ test.testId }&prompt=${ test.prompt }`;
    window.location = newUrl;
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
    let urlInput = this.state.addTestUrl;
    let testUrl = urlInput.substr(0, 4) === 'www.' ? `http://${ urlInput }` : urlInput;
    let newTest = {
      projectId: this.props.projects.list[this.props.params.projectIndex].id,
      name: this.state.addTestName,
      url: testUrl,
      prompt: this.state.addTestPrompt
    };

    this.toggleModal();
    this.props.dispatch(postsTest(newTest));
  };

  getReport (test) {
    this.props.dispatch(getsImage(test, browserHistory));
  };

  handleNameInput (event) {
    this.setState({ addTestName: event.target.value });
  };

  handlePromptInput (event) {
    this.setState({ addTestPrompt: event.target.value });
  };

  handleUrlInput (event) {
    this.setState({ addTestUrl: event.target.value });
  };

  //for showing and hiding modals
  toggleModal () {
    this.setState({ testModalDisplay: !this.state.testModalDisplay });
  };

  render () {
    let header = () => {
      if (this.props.projects.list.length > 0) {
        return this.props.children;
      }
    };

    return (
      <div className = "Tests">
        { header() }
        <div>
          { this.props.tests.list.map((test, index) => {
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
              <Col xs = { 2 } md = { 5 }>Test Name</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handleNameInput.bind(this) } type = "text" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 5 }>Test Url</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handleUrlInput.bind(this) } type = "text" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 5 }>Test Prompt</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handlePromptInput.bind(this) } type = "textarea" />
              </Col>
            </Row>
            <Row>
              <Col xs = { 5 } md = { 12 }>
                <Button className = "btn-primary pull-right" onClick = { this.addTest.bind(this) } type = "button">submit</Button>
                <Button className = "pull-right" onClick = { this.toggleModal.bind(this) } type = "button">cancel</Button>
              </Col>
            </Row>
          </form>
        </Modal>
      </div>
    );
  };
}

const select = (state) => state;

export default connect(select)(TestContainer);
