import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';
import { updatesProject, deletesProject, getsProject, setFocus } from '../../../../redux/actions';

class SettingsContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: null,
      name : null,
      description: null,
      modalVisibility: false
    };
  };

  componentWillMount () {
    this.props.dispatch(getsProject(this.setInitialState.bind(this)));
  };

  setInitialState () {
    this.setState({ id: this.props.projects.list[this.props.params.projectIndex].id });
    this.setState({ description: this.props.projects.list[this.props.params.projectIndex].description });
    this.setState({ name: this.props.projects.list[this.props.params.projectIndex].name });
  };

  updateProject () {
    let params = {
      projectId: this.state.id,
      name: this.state.name,
      description: this.state.description,
      index: this.props.params.index
    };

    this.props.dispatch(updatesProject(params));
    this.toggleModal();
  };

  deleteProject () {
    let params = {
      projectId : this.state.id
    };

    this.props.dispatch(deletesProject(params, browserHistory));
  };

  handleNameInput (event) {
    this.setState({ name : event.target.value });
  };

  handleDescriptionInput (event) {
    this.setState({ description : event.target.value });
  };

  toggleModal () {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  headerVisibility () {
    if (this.props.projects.list.length > 0) {
      return this.props.children;
    }
  };

  render () {
    return (
      <div className = 'Settings'>
        { this.headerVisibility() }
        <Col className = "projectEntryComponent" xs = { 12 } md = { 9 }>
          <div className = "well bs-component">
            <Row className = "testRow" >
              <Col className = "testLeftSideLabel" xs = { 6 } md = { 3 } ><h5> name </h5></Col>
              <Col xs = { 12 } md = { 8 } className = "projectContent" ><h5>{ this.state.name }</h5></Col>
            </Row>
            <hr />
            <Row className = "testRow">
              <Col className = "testLeftSideLabel" xs = { 6 } md = { 3 }><h5> description </h5></Col>
              <Col xs = { 12 } md = { 8 }className = "projectContent" ><h5>{ this.state.description }</h5></Col>
            </Row>
            <hr />
            <Row className = "testRow">
              <Button className = "btn-primary" onClick = { this.toggleModal.bind(this) } type = "button">edit project</Button>
              <Button className = "btn-default" onClick = { this.deleteProject.bind(this) } type="button">delete project</Button>
            </Row>
          </div>

          <Modal show = { this.state.modalVisibility }>
            <form className = "settingsForm" onSubmit = { this.updateProject.bind(this) } >
              <Row>
                <Col xs = { 2 } md = { 2 }>name</Col>
                <Col xs = { 12 } md = { 10 }>
                  <Input onChange = { this.handleNameInput.bind(this) } id = "editName" type = "text" value = { this.state.name } />
                </Col>
              </Row>
              <Row>
                <Col xs = { 2 } md = { 2 }>description</Col>
                <Col xs = { 12 } md = { 10 }>
                  <Input onChange = { this.handleDescriptionInput.bind(this) } id = "editDescription" type = "textarea" value = { this.state.description } />
                </Col>
              </Row>
            </form>
            <Row>
              <Col xs = { 12 } md = { 12 }>
                <Button className = "btn-primary" onClick = { this.updateProject.bind(this) } type = "button">save changes</Button>
                <Button onClick = { this.toggleModal.bind(this) } className = "btn-default" type = "button">cancel</Button>
              </Col>
            </Row>
          </Modal>
        </Col>
      </div>
    )
  };
}

const select = (state) => state;

export default connect(select)(SettingsContainer)
