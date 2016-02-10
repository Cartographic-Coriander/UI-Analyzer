import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Accordian from './Accordian';
import { contentState } from '../../../../../redux/actions';

class ProjectButton extends Component {
  handleClick () {
    // this.props.dispatch(toggleAccordian());
  }
  render () {
    return (
      <a href="#" className = "list-group-item ProjectButton" onClick = { this.handleClick.bind(this) }>
        {this.props.name}
        <ul className="dropdown-menu"> 
          <Accordian />
        </ul>
      </a>
    )
  }
}

const select = (state) => state

export default connect(select)(ProjectButton)