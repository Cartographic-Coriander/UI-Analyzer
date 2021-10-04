import React, { Component } from 'react';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

export default class TestContinerEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name : null,
      prompt: null,
      url: null,
      modalVisbility: false
    };
  };

  componentDidMount () {
    this.setState({ name: this.props.name });
    this.setState({ prompt: this.props.prompt });
    this.setState({ url: this.props.url });
  };

  toggleModal () {
    this.setState(prev => ({ modalVisibility: !prev.modalVisibility }));
  };

  updateTest () {
    const params = {
      testId: this.props.id,
      projectId: this.props.projectId,
      name: this.state.name || this.props.name,
      prompt: this.state.prompt || this.props.prompt,
      url: this.state.url || this.props.url,
      index: this.props.index
    };

    this.props.update(params);
    this.toggleModal();
  };

  deleteTest () {
    const params = {
      projectId : this.props.projectId,
      testId: this.props.id
    };

    this.props.delete(params);
  };

  startTest () {
    let token = JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token;
    const params = {
      url: this.props.url,
      index: this.props.index,
      testId: this.props.id,
      prompt: this.props.prompt,
      access_token: token
    };

    this.props.startTest(params);
  };

  handleNameInput (event) {
    this.setState({ name : event.target.value });
  };

  handlePromptInput (event) {
    this.setState({ prompt : event.target.value });
  };

  handleUrlInput (event) {
    this.setState({ url : event.target.value });
  };

  viewReport () {
    const params = {
      id: this.props.id,
      projectId: this.props.projectId,
      name: this.props.name,
      prompt: this.props.prompt,
      url: this.props.url
    };

    this.props.viewReport(params);
  };

  render () {
    return (
      <Col className = "testEntryComponent" xs = { 12 } md = { 9 }>
        <div className = "well bs-component">
          <Row className = "testRow">
            <Col xs = { 6 } md = { 3 } ><h5> name </h5></Col>
            <Col xs = { 5 } md = { 8 } className = "testContent" ><h5>{ this.props.name }</h5></Col>
          </Row>
          <hr />
          <Row className = "testRow">
            <Col xs = { 6 } md = { 3 }><h5> url </h5></Col>
            <Col xs = { 5 } md = { 8 } className = "testContent" ><h5><span className = "testUrl"> { this.props.url } </span></h5></Col>
          </Row>
          <hr />
          <Row className = "testRow">
            <Col xs = { 6 } md = { 3 }><h5> prompt </h5></Col>
            <Col xs = { 5 } md = { 8 }className = "testContent" ><h5>{ this.props.prompt }</h5></Col>
          </Row>
          <hr />
          <Row className = "testEntryButtonContainer">
            <Button onClick = { this.toggleModal.bind(this) } className = "testEntryButton" type = "button">edit test</Button>
            <Button onClick = { this.deleteTest.bind(this) } className = "testEntryButton" type = "button">delete test</Button>
            <Button onClick = { this.startTest.bind(this) } className = "btn btn-primary testEntryButton" type = "button">start test</Button>
            <Button onClick = { this.viewReport.bind(this) } className = "btn btn-primary testEntryButton" type = "button">view report</Button>
          </Row>
        </div>

        <Modal show = { this.state.modalVisibility }>
          <form onSubmit = { this.updateTest.bind(this) }>
            <Row>
              <Col xs = { 2 } md = { 2 }>name</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handleNameInput.bind(this) }  type = "text" value = { this.state.name } />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 2 }>url</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handleUrlInput.bind(this) } type = "text" value = { this.state.url } />
              </Col>
            </Row>
            <Row>
              <Col xs = { 2 } md = { 2 }>prompt</Col>
              <Col xs = { 5 } md = { 12 }>
                <Input onChange = { this.handlePromptInput.bind(this) } type = "textarea" value = { this.state.prompt } />
              </Col>
            </Row>
          </form>
          <Row>
            <Col xs = { 5 } md = { 12 }>
              <Button className = "btn btn-primary pull-right" onClick = { this.updateTest.bind(this) } type = "button">save changes</Button>
              <Button className = "pull-right" onClick = { this.toggleModal.bind(this) } type = "button">cancel</Button>
            </Col>
          </Row>
        </Modal>
      </Col>
    );
  };
};