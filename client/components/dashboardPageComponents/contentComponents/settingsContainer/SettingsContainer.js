import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';
import { updatesProject, deletesProject, getsProject, setFocus } from '../../../../redux/actions';

class SettingsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameDisplay: "none",
      newName : null,
      descriptionStyle: "none",
      newDescription: null,
      modalVisibility: false
    };
  };

  componentDidMount () {
    this.setState({ newDescription: this.props.currentFocus.project.description });
    this.setState({ newName: this.props.currentFocus.project.name });
  };

  render () {
    let editNameStyle = {
      display: this.state.nameDisplay
    };

    let editDiscriptionStyle = {
      display: this.state.descriptionStyle
    };

    let toggleNameInput = () => {
      this.state.nameDisplay === "inline-block" ? this.setState({ nameDisplay:"none" }) : this.setState({ nameDisplay:"inline-block" });
    };

    let toggleDescriptionInput = () => {
      this.state.descriptionStyle === "inline-block" ? this.setState({ descriptionStyle:"none" }) : this.setState({ descriptionStyle:"inline-block" });
    };

    let toggleModal = () => {
      this.state.modalVisibility === false ?  this.setState({ modalVisibility: true }) : this.setState({ modalVisibility: false });
    };

    let updateProject = () => {
      let params = {
        projectId: this.props.currentFocus.project.id,
        name: this.state.newName || this.props.currentFocus.project.name,
        description: this.state.newDescription || this.props.currentFocus.project.description
      };

      this.props.dispatch(updatesProject(params));
      this.props.dispatch(getsProject());
      this.props.dispatch(setFocus( 'project', { id: this.props.currentFocus.project.id, name: this.state.newName, description: this.state.newDescription }));
      toggleModal();
    };

    let deleteProject = () => {
      let deletedProject = {
        projectId : this.props.currentFocus.project.id
      };

      this.props.dispatch(deletesProject(params));
      this.props.dispatch(setFocus( 'project', { id: null, name: null, description: null }));
      this.props.dispatch(setFocus( 'test', { id: null, name: null, projectId: null, prompt: null, url: null }));
    };

    let handleNameInput = (event) => {
      this.setState({ newName : event.target.value });
    };

    let handleDescriptionInput = (event) => {
      this.setState({ newDescription : event.target.value });
    };

    return (
      <div className = 'Settings'>
        <Col className = "projectEntryComponent" xs = { 12 } md = { 9 }>
          <div className = "well bs-component">
            <Row className = "testRow" >
              <Col className = "testLeftSideLabel" xs = { 6 } md = { 3 } ><h5> name </h5></Col>
              <Col xs = { 12 } md = { 8 } className = "projectContent" ><h5>{ this.props.currentFocus.project.name }</h5></Col>
            </Row>
            <hr />
            <Row className = "testRow">
              <Col className = "testLeftSideLabel" xs = { 6 } md = { 3 }><h5> description </h5></Col>
              <Col xs = { 12 } md = { 8 }className = "projectContent" ><h5>{ this.props.currentFocus.project.description }</h5></Col>
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
                  <Input onChange = { handleNameInput.bind(this) } id = "editName" type = "text" value = { this.state.newName } />
                </Col>
              </Row>
              <Row>
                <Col xs = { 2 } md = { 2 }>description</Col>
                <Col xs = { 12 } md = { 10 }>
                  <Input onChange = { handleDescriptionInput.bind(this) } id = "editDescription" type = "textarea" value = { this.state.newDescription } />
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

const select = (state) => ({
  projects: state.projects,
  currentFocus: state.currentFocus,
  tests: state.tests
});

export default connect(select)(SettingsContainer)
