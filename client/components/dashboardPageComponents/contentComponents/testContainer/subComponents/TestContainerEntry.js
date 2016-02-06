import React, { Component } from 'react';

export default class TestContinerEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameDisplay: "none",
      newName : null,
      promptDisplay: "none",
      newPrompt: null,
      urlDisplay: "none",
      newUrl: null
    };
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
        id: this.props.id,
        projectId: this.props.projectId,
        name: this.state.newName || this.props.name,
        prompt: this.state.newPrompt || this.props.prompt,
        url: this.state.newUrl || this.props.url
      };

      this.props.update(updatedTest);
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
      this.setState({ newUrl : event.target.value })
    };

    return (
       <div>
        <form onSubmit = { updateTest.bind(this) } >
          <button onClick = { toggleNameInput.bind(this) } type = "button">edit</button><label>{ this.props.name }</label>
          <input onChange = { handleNameInput.bind(this) } id = "editName" style = { editNameStyle } type = "text"></input><br></br>
          <button onClick = { togglePromptInput.bind(this) } type = "button">edit</button><label>{ this.props.prompt }</label>
          <input onChange = { handlePromptInput.bind(this) } id = "editDescription" style = { editDiscriptionStyle } type = "text"></input><br></br>
          <button onClick = { toggleUrlInput.bind(this) } type = "button">edit</button><label>{ this.props.url }</label>
          <input onChange = { handleUrlInput.bind(this) } id = "editUrl" style = { editUrlStyle } type = "text"></input><br></br>
          <button onClick = { updateTest.bind(this) } type = "button">save changes</button>
          <button onClick = { deleteTest.bind(this) } type="button">delete test</button>
          <button onClick = { startTest.bind(this) } type = "button">start test</button>
        </form>
        <br></br>
      </div>
    );
  };
};