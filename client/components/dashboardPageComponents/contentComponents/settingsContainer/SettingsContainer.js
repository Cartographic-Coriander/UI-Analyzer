import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';
import { updatesProject, deletesProject, getsProject, setFocus } from '../../../../redux/actions';

class SettingsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      name : null,
      description: null,
      modalVisibility: false
    };
  };

  componentWillMount () {
    this.props.dispatch(getsProject());
    this.setState({ id: this.props.projects.list[this.props.params.index].id });
    this.setState({ description: this.props.projects.list[this.props.params.index].description });
    this.setState({ name: this.props.projects.list[this.props.params.index].name });
  };

  render () {
    let toggleModal = () => {
      this.setState({ modalVisibility: !this.state.modalVisibility });
    };

    let updateProject = () => {
      let params = {
        projectId: this.state.id,
        name: this.state.name,
        description: this.state.description
      };

      this.props.dispatch(updatesProject(params));
      toggleModal();
    };

    let deleteProject = () => {
      let params = {
        projectId : this.state.id
      };

      this.props.dispatch(deletesProject(params));
      browserHistory.push('/dashboard');
    };

    let handleNameInput = (event) => {
      this.setState({ name : event.target.value });
    };

    let handleDescriptionInput = (event) => {
      this.setState({ description : event.target.value });
    };

    return (
      <div className = 'Settings'>
        { this.props.children }
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
              <Button className = "btn-primary" onClick = { toggleModal.bind(this) } type = "button">edit project</Button>
              <Button className = "btn-default" onClick = { deleteProject.bind(this) } type="button">delete project</Button>
            </Row>
          </div>

          <Modal show = { this.state.modalVisibility }>
            <form className = "settingsForm" onSubmit = { updateProject.bind(this) } >
              <Row>
                <Col xs = { 2 } md = { 2 }>name</Col>
                <Col xs = { 12 } md = { 10 }>
                  <Input onChange = { handleNameInput.bind(this) } id = "editName" type = "text" value = { this.state.name } />
                </Col>
              </Row>
              <Row>
                <Col xs = { 2 } md = { 2 }>description</Col>
                <Col xs = { 12 } md = { 10 }>
                  <Input onChange = { handleDescriptionInput.bind(this) } id = "editDescription" type = "textarea" value = { this.state.description } />
                </Col>
              </Row>
            </form>
            <Row>
              <Col xs = { 12 } md = { 12 }>
                <Button className = "btn-primary" onClick = { updateProject.bind(this) } type = "button">save changes</Button>
                <Button onClick = { toggleModal.bind(this) } className = "btn-default" type = "button">cancel</Button>
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
