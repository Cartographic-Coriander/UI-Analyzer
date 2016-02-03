import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../../redux/actions';
import { Button } from 'react-bootstrap';
import Accordian from './Accordian';

class ProjectButton extends Component {
  handleClick () {
    this.props.dispatch(toggleAccordian());
  }
  render () {
    return (
      <a href="#" className = "list-group-item ProjectButton" onClick = { this.handleClick.bind(this) }>
        Project
        <ul className="dropdown-menu"> 
          <Accordian />
        </ul>
      </a>
    )
  }
}

const select = (state) => state.buttonReducer

export default connect(select)(ProjectButton)