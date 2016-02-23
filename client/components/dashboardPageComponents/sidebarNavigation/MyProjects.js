import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';
import { contentState, setFocus, getsTest, getsComment, postsProject, postsInvitation } from '../../../redux/actions';
import CreateProjectContainer from './subComponents/CreateProjectContainer';
import InviteTestersModal from './subComponents/inviteTestersModal';
import ProjectButton from './subComponents/ProjectButton';
import TestButton from './subComponents/TestButton';
import ReportsButton from './subComponents/ReportsButton';
import SettingsButton from './subComponents/SettingsButton';
import InviteTestersButton from './subComponents/InviteTestersButton';

class MyProjects extends Component {
  //setting initial addProject modal visibility to not be shown
  constructor (props) {
    super(props)
    this.state = {
      addProjectModalVisibility : false,
      inviteTestersModalVisibility: false
    };
  };

  //toggle add project modal visibilty
  toggleModalVisibility () {
    this.setState({ addProjectModalVisibility: this.state.addProjectModalVisibility ? false : true });
  };

  //toggle invite modal visibility
  toggleInviteModal () {
    this.state.inviteTestersModalVisibility ? this.setState({ inviteTestersModalVisibility : false }) : this.setState({ inviteTestersModalVisibility : true });
  }

  //sending data from add project form in the modal and hiding the modal
  sendNewProject (project) {
    let newProject = {
      name: project.projectName,
      description: project.projectDescription
    };

    this.props.dispatch(postsProject(newProject));
    this.toggleModalVisibility();
    this.componentDidMount();
  };

  handleClick (project) {
    this.props.dispatch(getsTest({ projectId: project.id }));
    this.props.dispatch(setFocus('project', project));
    this.props.dispatch(contentState('Test'));
  };

  setContent (context) {
    this.props.dispatch(contentState(context));
  };

  componentDidMount () {
    var that = this;
  // this.props.dispatch(getsComment({id: this.props.currentFocus.image.id}))
    setTimeout(() => {
      $('.react-sanfona-item').children('h3').map(function (index, element) {
        return $(element).on('click', that.handleClick.bind(that, that.props.projects.list[index]));
      })
    }, 100);
  };

  sendInviteInfo (invitee) {
    var params = {
      email: invitee.emailField,
      firstname: invitee.firstNameField,
      surname: invitee.surnameField,
      projectId: this.props.currentFocus.project.id
    };

    this.props.dispatch(postsInvitation(params))
    this.setState({ inviteTestersModalVisibility : false })
  };

  sidebarResize () {
    $('.SidebarNavigation').css('height', $(document).height());
  };

  render () {
    this.sidebarResize();
    return (
      <div className="SidebarNavigation list-group sidebar-wrapper">
        <Button className="MyDashboardButton btn-default btn-block" type = "button" onClick = { this.toggleModalVisibility.bind(this) }>Add Project</Button>
        <Accordion className = "ProjectAccordion" activeItems = { this.props.projects.list.length - 1 } >
            { this.props.projects.list.map((project) => {
                return (
                  <AccordionItem key = { project } title = { project.name } >
                    <div>
                      <ul className = "projectAccordionItems">
                       <li><TestButton id = { project.id }/></li>
                       <li><SettingsButton id = { project.id } name = { project.name } description = { project.description } /></li>
                       <li><InviteTestersButton toggleInviteModal = { this.toggleInviteModal.bind(this) } /></li>
                      </ul>
                    </div>
                  </AccordionItem>
                );
            })}
        </Accordion>
        <InviteTestersModal onSubmit = { this.sendInviteInfo.bind(this) } visibility = { this.state.inviteTestersModalVisibility }  toggle = { this.toggleInviteModal.bind(this) }/>
        <CreateProjectContainer onSubmit = { this.sendNewProject.bind(this) } visibility = { this.state.addProjectModalVisibility } hideVisibility = { this.toggleModalVisibility.bind(this) } />
      </div>
    );
  };
};

const select = (state) => state

export default connect(select)(MyProjects)
