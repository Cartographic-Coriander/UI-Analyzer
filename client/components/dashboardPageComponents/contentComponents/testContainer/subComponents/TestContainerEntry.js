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
       <div className = "testEntryComponent">
        <form onSubmit = { updateTest.bind(this) } className = "testForm" >
          <div className = "testEntryComponentLeft">
            <h3> { this.props.name } </h3>
            <h4 className = "testUrl"><span className = "testUrl"> { this.props.url } </span></h4>
            <h4> { this.props.prompt } </h4>
          </div>
          <div className = "testEntryComponentRight">
            <div className = "editDiv">
              <button onClick = { toggleNameInput.bind(this) } type = "button">edit</button><span className = "editSpan">edit name</span> 
              <input onChange = { handleNameInput.bind(this) } id = "editName" style = { editNameStyle } type = "text"></input><br></br>
            </div>
            <div className = "editDiv">
              <button onClick = { togglePromptInput.bind(this) } type = "button">edit</button><span className = "editSpan">edit prompt</span> 
              <input onChange = { handlePromptInput.bind(this) } id = "editDescription" style = { editDiscriptionStyle } type = "text"></input><br></br>
            </div>
            <div className = "editDiv">
              <button onClick = { toggleUrlInput.bind(this) } type = "button">edit</button><span className = "editSpan">edit url</span> 
              <input onChange = { handleUrlInput.bind(this) } id = "editUrl" style = { editUrlStyle } type = "text"></input><br></br>
            </div>
            <br className = "floatClear" />
          </div>
        </form>
        <div className = "testEntryButtonContainer">
          <button onClick = { updateTest.bind(this) } className = "testEntryButton" type = "button">save changes</button>
          <button onClick = { deleteTest.bind(this) } className = "testEntryButton" type="button">delete test</button>
          <button onClick = { startTest.bind(this) } className = "testEntryButton" type = "button">start test</button>
        </div>
        <br></br>
      </div>
    );
  };
};
