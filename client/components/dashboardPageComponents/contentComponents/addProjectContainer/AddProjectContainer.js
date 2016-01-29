import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProjectContainer from './subComponents/CreateProjectContainer';

class AddProjectContainer extends Component {
  render() {
    var className = () => this.props.visibleContentComponent === 'AddProject' ? 'AddProject' : 'hide'
    console.log(className())
    return (
      <div className = { className() }>
        <h3>I am the add project container component</h3>
        <CreateProjectContainer />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(AddProjectContainer)
