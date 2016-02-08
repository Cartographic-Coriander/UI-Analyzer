import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      projectName: null
    }
  }

  updateHeader () {
    this.props.projects.each((item) => console.log(item))
  }

  render () {
    return (
      <div>
        <h3>
          { () => updateHeader() }
        </h3>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(ProjectHeader)