import React, { Component } from 'react';
import { Button, Col, Modal, Row, Input } from 'react-bootstrap';

class ProjectEntryComponent extends Component {
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
      console.log('toggline', this)
      this.state.modalVisibility === false ?  this.setState({ modalVisibility: true }) : this.setState({ modalVisibility: false });
    };

    let updateProject = () => {
      const updatedProject = {
        projectId: this.props.id,
        name: this.state.newName || this.props.name,
        description: this.state.newDescription || this.props.description
      };
      console.log('updateProject called', updatedProject)
      this.props.update(updatedProject);
    };

    let deleteProject = () => {
      const deletedProject = {
        projectId : this.props.id
      }
      console.log('deleteproject called', deletedProject)
      this.props.delete(deletedProject);
    };

    let handleNameInput = (event) => {
      this.setState({ newName : event.target.value });
    };

    let handleDescriptionInput = (event) => {
      this.setState({ newDescription : event.target.value });
    };

    return (
      <Col className = "projectEntryComponent" xs={12} md={9}>
        <Row className = "testRow" >
          <Col className = "testLeftSideLabel" xs={6} md={3} ><h5> name </h5></Col>
          <Col xs={12} md={6} className = "projectContent" ><h5>{ this.props.name }</h5></Col>
        </Row>
        <hr />
        <Row className = "testRow">
          <Col className = "testLeftSideLabel" xs={6} md={3}><h5> prompt </h5></Col>
          <Col xs={12} md={9}className = "projectContent" ><h5>{ this.props.description }</h5></Col>
        </Row>
        <hr />
        <Row className = "testRow">
          <Button className = "projectEntryButton" onClick = { toggleModal.bind(this) } type = "button">edit project</Button>
          <Button className = "projectEntryButton" onClick = { deleteProject.bind(this) } type="button">delete project</Button>
        </Row>
        <br />

        <Modal show = { this.state.modalVisibility }>
          <form className = "settingsForm" onSubmit = { updateProject.bind(this) } >
            <Row>
              <Col xs={2} md={2}>name</Col>
              <Col  xs={12} md={10}>
                <Input onChange = { handleNameInput.bind(this) } id = "editName" type = "text" placeholder = { this.props.name } />
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={2}>description</Col>
              <Col xs={12} md={10}>
                <Input onChange = { handleDescriptionInput.bind(this) } id = "editUrl" type = "textarea" placeholder = { this.props.description } />
              </Col>
            </Row>
          </form>
            <Col className = "projectButtons">
              <Button className = "projectEntryButton" onClick = { updateProject.bind(this) } type = "button">save changes</Button>
              <Button onClick = { toggleModal.bind(this) } className = "testEntryButton" type = "button">cancel</Button>
            </Col>
        </Modal>

      </Col>
    )
  }
}

export default ProjectEntryComponent;