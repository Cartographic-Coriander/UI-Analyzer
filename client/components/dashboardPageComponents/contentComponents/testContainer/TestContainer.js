import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TestContainerEntry from './subComponents/TestContainerEntry';
import { deletesTest, updatesTest, postsTest, getsImage, getsTest, getsProject, postsTestView } from '../../../../redux/actions';
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

  startTest (test) {
    var portLength = window.location.port.length > 0 ? window.location.port.length + 1 : 0;
    if (portLength > 0) {
      var location = window.location.origin.slice(0, -portLength);
    } else {
      var location = window.location.origin;
    }

    // Assembly URL to pass to proxy
    var testUrl = `${ window.location.origin }/testview?url=${ test.url }&testId=${ test.testId }&access_token=${ test.access_token }&location=${ location }&callbackUrl=${ window.location.origin }/addcomments/${ test.testId }&prompt=${ test.prompt }`;
    this.props.dispatch(postsTestView(testUrl));
  };

  updateTest (test) {
    this.props.dispatch(updatesTest(test));
  };

  deleteTest (test) {
    this.props.dispatch(deletesTest(test));
  };

  addTest (test) {
    let urlInput = this.state.addTestUrl;
    let testUrl = urlInput.substr(0, 4) === 'www.' ? `http://${ urlInput }` : urlInput;
    let newTest = {
      projectId: this.props.projects.list[this.props.params.projectIndex].id,
      name: this.state.addTestName,
      url: testUrl,
      prompt: this.state.addTestPrompt
    };

    this.props.dispatch(postsTest(newTest));
    this.toggleModal();
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

  toggleModal () {
    this.setState(prev => ({ testModalDisplay: !prev.testModalDisplay }));
  };

  headerVisibility () {
    if (this.props.projects.list.length > 0) {
      return this.props.children;
    }
  };

  render () {
    return (
      <div className = "Tests">
        { this.headerVisibility() }
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
};

const select = (state) => state;

export default connect(select)(TestContainer);
