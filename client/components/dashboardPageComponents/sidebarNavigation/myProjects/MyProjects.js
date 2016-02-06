import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import { connect } from 'react-redux';
import { contentState, setFocus, getsTest, postsProject } from '../../../../redux/actions';
import ProjectButton from './subComponents/ProjectButton';
import TestButton from './subComponents/TestButton';
import ReportsButton from './subComponents/ReportsButton';
import SettingsButton from './subComponents/SettingsButton';
import InviteTestersButton from './subComponents/InviteTestersButton';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';
import CreateProjectContainer from '../../contentComponents/addProjectContainer/subComponents/CreateProjectContainer';

class MyProjects extends Component {
  //setting initial addProject modal visibility to not be shown
  constructor (props) {
    super(props)
    this.state = {
      addProjectModalVisibility : false
    };
  };

  //toggle add project modal visibilty
  toggleModalVisibility () {
    this.setState({ addProjectModalVisibility: this.state.addProjectModalVisibility ? false : true })
  }

  //sending data from add project form in the modal and hiding the modal
  sendNewProject (project) {
    let newProject = {
      name: project.projectName,
      description: project.projectDescription
    };
    this.props.dispatch(postsProject(newProject));
    this.toggleModalVisibility();
  }

  handleClick (project) {
    this.props.dispatch(getsTest({ projectId: project.id }));
    this.props.dispatch(setFocus('project', project));
    this.props.dispatch(contentState('Test'));
  }

  setContent (context) {
    this.props.dispatch(contentState(context));
  }

  componentDidMount () {
    var that = this;
    setTimeout(() => {$('.react-sanfona-item').children('h3').map(function (index, element) {
        return $(element).on('click', that.handleClick.bind(that, that.props.projects.list[index]));
      })}, 500);
  }

  render () {
    return (
      <div>
        <button type = "button" onClick = { this.toggleModalVisibility.bind(this) }>Add Project</button>
        <Accordion className = "ProjectAccordion">
            { this.props.projects.list.map((project) => {
                return (
                  <AccordionItem key = { project.id } title = { project.name } >
                    <div>
                      <ul className = "projectAccordionItems">
                       <li><TestButton/></li>
                       <li><ReportsButton /></li>
                       <li><SettingsButton /></li>
                       <li><InviteTestersButton /></li>
                      </ul>
                    </div>
                  </AccordionItem>
                );
            })}
        </Accordion>
        <CreateProjectContainer onSubmit = { this.sendNewProject.bind(this) } visibility = { this.state.addProjectModalVisibility } hideVisibility = { this.toggleModalVisibility.bind(this) } />
      </div>
    );
  }
}

const select = (state) => state

export default connect(select)(MyProjects)
