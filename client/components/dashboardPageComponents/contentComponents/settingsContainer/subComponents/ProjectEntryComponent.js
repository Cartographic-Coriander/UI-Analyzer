import React, { Component } from 'react';

class ProjectEntryComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      nameDisplay: "none",
      discriptionStyle: "none"
    }
  }

  render () {

    let editNameStyle = {
      display: this.state.nameDisplay
    } 

    let editDiscriptionStyle = {
      display: this.state.discriptionStyle
    }

    let toggleNameInput = function () {
      if(this.state.nameDisplay === "inline-block") {
        this.setState({ nameDisplay : "none" })
      } else {
        this.setState({ nameDisplay: "inline-block"})
      }
    }

    let toggleDiscriptionInput = function () {
      if(this.state.discriptionStyle === "inline-block") {
        this.setState({ discriptionStyle : "none" })
      } else {
        this.setState({ discriptionStyle: "inline-block"})
      }
    }

    return (
      <div>
        <form>
        <button onClick={ toggleNameInput.bind(this) } type="button" >edit</button>{ this.props.name } <input style={ editNameStyle } type="text"></input><br></br> 
        <button onClick={ toggleDiscriptionInput.bind(this) } type="button">edit</button>{ this.props.description } <input style={ editDiscriptionStyle } type="text"></input><br></br>
        <button type="submit">submit</button>
        </form>
        <br></br>
      </div>
    )
  }
}

export default ProjectEntryComponent;