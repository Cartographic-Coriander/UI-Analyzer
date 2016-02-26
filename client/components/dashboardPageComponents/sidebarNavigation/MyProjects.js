import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';
import { contentState, setFocus, getsTest, getsComment, postsProject, postsInvitation, projectModal } from '../../../redux/actions';
import CreateProjectModal from './subComponents/CreateProjectModal';
import InviteTestersModal from './subComponents/InviteTestersModal';

class MyProjects extends Component {
  //setting initial addProject modal visibility to not be shown
  constructor (props) {
    super(props);
    this.state = {
      inviteTestersModalVisibility: false
    };
  };

  //toggle add project modal visibilty
  toggleProjectModal () {
    this.props.dispatch(projectModal(!this.props.modalState.addProjectModalVisibility));
  };

  //toggle invite modal visibility
  toggleInviteModal () {
    this.setState({ inviteTestersModalVisibility: !this.state.inviteTestersModalVisibility });
  }

  //sending data from add project form in the modal and hiding the modal
  addProject (project) {
    let params = {
      name: project.projectName,
      description: project.projectDescription
    };

    this.props.dispatch(postsProject(params));
    this.toggleProjectModal();
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
      projectId: this.props.projects.list[this.params.projectIndex]
    };

    this.props.dispatch(postsInvitation(params));
    this.toggleInviteModal();
  };

  sidebarResize () {
    $('.SidebarNavigation').css('height', $(document).height());
  };

  render () {
    this.sidebarResize();
    return (
      <div className="SidebarNavigation list-group sidebar-wrapper">
        <Button className="MyDashboardButton btn-default btn-block" type = "button" onClick = { this.toggleProjectModal.bind(this) }>Add Project</Button>
        <Accordion activeItems = { this.props.projects.list.length - 1 } >
          { this.props.projects.list.map((project, index) => {
              return (
                <AccordionItem key = { index } title = { project.name } >
                  <div>
                    <ul className = "accordionItems">
                      <li><Button onClick = { () => browserHistory.push(`/dashboard/tests/${ index }`) } className = "TestButton btn-block" >Tests</Button></li>
                      <li><Button onClick = { () => browserHistory.push(`/dashboard/settings/${ index }`) } className = "TestButton btn-block">Settings</Button></li>
                      <li><Button onClick = { () => this.toggleInviteModal() } className = "TestButton btn-block">Invite Testers</Button></li>
                    </ul>
                  </div>
                </AccordionItem>
              );
          })}
        </Accordion>
        <InviteTestersModal onSubmit = { this.addInvite.bind(this) } visibility = { this.state.inviteTestersModalVisibility }  toggle = { this.toggleInviteModal.bind(this) }/>
        <CreateProjectModal onSubmit = { this.addProject.bind(this) } visibility = { this.props.modalState.addProjectModalVisibility } hideVisibility = { this.toggleProjectModal.bind(this) } />
      </div>
    );
  };
};

const select = (state) => state;

export default connect(select)(MyProjects);
