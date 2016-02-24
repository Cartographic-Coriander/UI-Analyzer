import React, { Component } from 'react';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

export default class TestContinerEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameDisplay: "none",
      newName : null,
      promptDisplay: "none",
      newPrompt: null,
      urlDisplay: "none",
      newUrl: null,
      modalVisbility: false
    };
  };

  componentDidMount () {
    this.setState({ newName: this.props.name });
    this.setState({ newPrompt: this.props.prompt });
    this.setState({ newUrl: this.props.url });
  };

  render () {
    let editNameStyle = {
      display: this.state.nameDisplay
    };

    let editDiscriptionStyle = {
      display: this.state.promptDisplay
    };

    let editUrlStyle = {
      display: this.state.urlDisplay
    };

    let toggleModal = () => {
      this.state.modalVisbility === false ? this.setState({ modalVisbility: true }) : this.setState({ modalVisbility: false });
    };

    let toggleNameInput = () => {
       this.state.nameDisplay === "inline-block" ? this.setState({ nameDisplay:"none" }) : this.setState({ nameDisplay:"inline-block" });
    };

    let togglePromptInput = () => {
      this.state.promptDisplay === "inline-block" ? this.setState({ promptDisplay:"none" }) : this.setState({ promptDisplay:"inline-block" });
    };

    let toggleUrlInput = () => {
      this.state.urlDisplay === "inline-block" ? this.setState({ urlDisplay:"none" }) : this.setState({ urlDisplay:"inline-block" });
    };

    let updateTest = () => {
      const updatedTest = {
        testId: this.props.id,
        projectId: this.props.projectId,
        name: this.state.newName || this.props.name,
        prompt: this.state.newPrompt || this.props.prompt,
        url: this.state.newUrl || this.props.url,
        index: this.props.index
      };

      this.props.update(updatedTest);
      toggleModal();
    };

    let deleteTest = () => {
      const deletedTest = {
        projectId : this.props.projectId,
        testId: this.props.id
      };

      this.props.delete(deletedTest);
    };

    let startTest = () => {
      let token = JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token
      const startTest = {
        url: this.props.url,
        index: this.props.index,
        testId: this.props.id,
        prompt: this.props.prompt,
        access_token: token
      };

      this.props.startTest(startTest);
    };

    let handleNameInput = (event) => {
      this.setState({ newName : event.target.value });
    };

    let handlePromptInput = (event) => {
      this.setState({ newPrompt : event.target.value });
    };

    let handleUrlInput = (event) => {
      this.setState({ newUrl : event.target.value });
    };

    let viewReport = () => {
      const params = {
        id: this.props.id,
        projectId: this.props.projectId,
        name: this.props.name,
        prompt: this.props.prompt,
        url: this.props.url
      };

      this.props.viewReport(params);
    };

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
              <Button onClick = { toggleModal.bind(this) } className = "testEntryButton" type = "button">edit test</Button>
              <Button onClick = { deleteTest.bind(this) } className = "testEntryButton" type = "button">delete test</Button>
              <Button onClick = { startTest.bind(this) } className = "btn btn-primary testEntryButton" type = "button">start test</Button>
              <Button onClick = { viewReport.bind(this) } className = "btn btn-primary testEntryButton" type = "button">view report</Button>
            </Row>
          </div>

          <Modal show = { this.state.modalVisbility }>
            <form onSubmit = { updateTest.bind(this) }>
              <Row>
                <Col xs = { 2 } md = { 2 }>name</Col>
                <Col xs = { 5 } md = { 12 }>
                  <Input onChange = { handleNameInput.bind(this) }  type = "text" value = { this.state.newName } />
                </Col>
              </Row>
              <Row>
                <Col xs = { 2 } md = { 2 }>url</Col>
                <Col xs = { 5 } md = { 12 }>
                  <Input onChange = { handleUrlInput.bind(this) } type = "text" value = { this.state.newUrl } />
                </Col>
              </Row>
              <Row>
                <Col xs = { 2 } md = { 2 }>prompt</Col>
                <Col xs = { 5 } md = { 12 }>
                  <Input onChange = { handlePromptInput.bind(this) } type = "textarea" value = { this.state.newPrompt } />
                </Col>
              </Row>
            </form>
            <Row>
              <Col xs = { 5 } md = { 12 }>
                <Button className = "btn btn-primary pull-right" onClick = { updateTest.bind(this) } type = "button">save changes</Button>
                <Button className = "pull-right" onClick = { toggleModal.bind(this) } type = "button">cancel</Button>
              </Col>
            </Row>
          </Modal>
        </Col>
    );
  };
};