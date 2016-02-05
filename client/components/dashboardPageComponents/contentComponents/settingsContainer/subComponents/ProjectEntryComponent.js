import React, { Component } from 'react';

class ProjectEntryComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameDisplay: "none",
      newName : null,
      descriptionStyle: "none",
      newDescription: null
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

    let updateProject = () => {
      const updatedProject = {
        projectId: this.props.id,
        name: this.state.newName || this.props.name,
        description: this.state.newDescription || this.props.description
      };
      this.props.update(updatedProject);
    };

    let deleteProject = () => {
      const deletedProject = {
        projectId : this.props.id
      }
      this.props.delete(deletedProject);
    };

    let handleNameInput = (event) => {
      this.setState({ newName : event.target.value });
    };

    let handleDescriptionInput = (event) => {
      this.setState({ newDescription : event.target.value });
    };

    return (
      <div>
        <form onSubmit = { updateProject.bind(this) } >
          <button onClick = { toggleNameInput.bind(this) } type = "button" >edit</button>{ this.props.name } 
          <input onChange = { handleNameInput.bind(this) } id = "editName" style = { editNameStyle } type="text"></input><br></br>

          <button onClick = { toggleDescriptionInput.bind(this) } type = "button">edit</button>{ this.props.description }
          <input onChange = { handleDescriptionInput.bind(this) } id = "editDescription" style = { editDiscriptionStyle } type="text"></input><br></br>

          <button type = "submit">save changes</button>
          <button onClick = { deleteProject.bind(this) } type="button">delete project</button>
        </form>
        <br></br>
      </div>
    )
  }
}

export default ProjectEntryComponent;