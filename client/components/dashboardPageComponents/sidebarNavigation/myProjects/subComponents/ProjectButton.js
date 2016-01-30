import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';

class ProjectButton extends Component {
  handleClick () {
    this.props.dispatch(toggleContentComponent('Project'));
  }
  render () {
    return (
      <button className = "ProjectButton" onClick = { this.handleClick.bind(this) }>
        Project
      </button>
    )
  }
}

const select = (state) => state

export default connect(select)(ProjectButton)