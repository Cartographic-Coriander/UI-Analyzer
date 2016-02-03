import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';

class MyProjects extends Component {
  render () {
    return (
    <div className = "MyProjects">
      <ProjectListEntry />
      <AddProjectButton />
    </div>
    )
  }
}

const select = (state) => state

export default connect(select)(MyProjects)