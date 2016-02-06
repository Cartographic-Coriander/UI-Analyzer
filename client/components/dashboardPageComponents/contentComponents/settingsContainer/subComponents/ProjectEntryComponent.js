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
      <div className =  "projectEntryComponent">
        <form className = "settingsForm" onSubmit = { updateProject.bind(this) } >
          <div className = "projectEntryComponentLeft">
            <h3>{ this.props.name }</h3>
            <h4>{ this.props.description }</h4>
          </div>
          <div className = "projectEntryComponentRight">
            <div className = "editNameDiv">
              <button onClick = { toggleNameInput.bind(this) } type = "button" >edit </button><span className = "editNameSpan">edit name</span> 
              <input onChange = { handleNameInput.bind(this) } id = "editName" style = { editNameStyle } type="text" placeholder = { this.props.name } ></input><br></br>
            </div>

            <button onClick = { toggleDescriptionInput.bind(this) } type = "button">edit </button>edit description
            <input onChange = { handleDescriptionInput.bind(this) } id = "editDescription" style = { editDiscriptionStyle } type="text" placeholder= { this.props.description } ></input><br></br>
          </div>
          <br className = "floatClear" />
        </form>
        <div className = "projectEntryComponentButtonContainer" >
          <button className = "projectEntryButton" onClick = { updateProject.bind(this) } type = "button">save changes</button>
          <button className = "projectEntryButton" onClick = { deleteProject.bind(this) } type="button">delete project</button>
        </div>
        <br></br>
      </div>
    )
  }
}

export default ProjectEntryComponent;