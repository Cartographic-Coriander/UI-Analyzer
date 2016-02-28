import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';
import { getsTest, postsProject, postsInvitation } from '../../../redux/actions';
import CreateProjectModal from './subComponents/CreateProjectModal';
import InviteTestersModal from './subComponents/InviteTestersModal';

class MyProjects extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inviteTestersModalVisibility: false,
      inviteProjectIndex: null
    };
  };

  // Toggle invite modal visibility
  toggleInviteModal () {
    this.setState(prev => ({ inviteTestersModalVisibility: !prev.inviteTestersModalVisibility }));
  }

  // Post data from project modal form and hides the modal
  addProject (project) {
    let params = {
      name: project.projectName,
      description: project.projectDescription
    };

    this.props.dispatch(postsProject(params));
    this.props.toggleProjectVisibility();
    this.componentDidMount();
  };

  onProjectClick (project, index) {
    this.props.dispatch(getsTest({ projectId: project.id }, browserHistory, index));
  };

  componentDidMount () {
    var that = this;
    setTimeout(() => {
      $('.react-sanfona-item').children('h3').map(function (index, element) {
        return $(element).on('click', that.onProjectClick.bind(that, that.props.projects.list[index], index));
      })
    }, 1000);
  };

  addInvite (invitee) {
    var params = {
      email: invitee.emailField,
      firstname: invitee.firstNameField,
      surname: invitee.surnameField,
      projectId: this.props.projects.list[this.state.inviteProjectIndex].id
    };

    this.toggleInviteModal();
    this.props.dispatch(postsInvitation(params));
  };

  sidebarResize () {
    $('.SidebarNavigation').css('height', $(document).height());
  };

  render () {
    this.sidebarResize();
    return (
      <div className = "SidebarNavigation list-group sidebar-wrapper">
        <Button className = "MyDashboardButton btn-default btn-block" type = "button" onClick = { this.props.toggleProjectVisibility }>Add Project</Button>
        <Accordion>
          { this.props.projects.list.map((project, index) => {
              return (
                <AccordionItem key = { index } title = { project.name } >
                  <div>
                    <ul className = "accordionItems">
                      <li><Button onClick = { () => browserHistory.push(`/dashboard/tests/${ index }`) } className = "TestButton btn-block" >Tests</Button></li>
                      <li><Button onClick = { () => browserHistory.push(`/dashboard/settings/${ index }`) } className = "TestButton btn-block">Settings</Button></li>
                      <li><Button onClick = { () => { this.toggleInviteModal(); this.setState({ inviteProjectIndex: index }) }  } className = "TestButton btn-block">Invite Testers</Button></li>
                    </ul>
                  </div>
                </AccordionItem>
              );
          })}
        </Accordion>
        <InviteTestersModal onSubmit = { this.addInvite.bind(this) } visibility = { this.state.inviteTestersModalVisibility }  toggle = { this.toggleInviteModal.bind(this) }/>
        <CreateProjectModal onSubmit = { this.addProject.bind(this) } visibility = { this.props.visibility } toggleVisibility = { this.props.toggleProjectVisibility } />
      </div>
    );
  };
};

const select = (state) => state;

export default connect(select)(MyProjects);
