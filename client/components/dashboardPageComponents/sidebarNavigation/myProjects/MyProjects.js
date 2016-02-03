import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';

class MyProjects extends Component {
  render () {
    var projects = [{
      name: 'project1',
      description: 'awesome',
      id: 0
    }, {
      name: 'project2',
      description: 'awesome',
      id: 1
    }];

    return (
    <div className = "MyProjects">
      {projects.map(item => 
        <ProjectListEntry name={item.name} key={item.id} description={item.description}/>
      )}
      <AddProjectButton />
    </div>
    )
  }
}

const select = (state) => state

export default connect(select)(MyProjects)
