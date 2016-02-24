import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';
import { contentState, setFocus, getsTest, getsComment, postsProject, postsInvitation } from '../../../redux/actions';
import CreateProjectModal from './subComponents/CreateProjectModal';
import InviteTestersModal from './subComponents/InviteTestersModal';

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

  handleClick (project, index) {
    browserHistory.push(`/dashboard/tests/${ index }`)
    this.props.dispatch(getsTest({ projectId: project.id }));
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
        return $(element).on('click', that.handleClick.bind(that, that.props.projects.list[index], index));
      })
    }, 1000);
  };

  sendInviteInfo (invitee) {
    var params = {
      email: invitee.emailField,
      firstname: invitee.firstNameField,
      surname: invitee.surnameField,
      projectId: this.props.projects.list[this.params.index]
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
        <InviteTestersModal onSubmit = { this.sendInviteInfo.bind(this) } visibility = { this.state.inviteTestersModalVisibility }  toggle = { this.toggleInviteModal.bind(this) }/>
        <CreateProjectModal onSubmit = { this.sendNewProject.bind(this) } visibility = { this.state.addProjectModalVisibility } hideVisibility = { this.toggleModalVisibility.bind(this) } />
      </div>
    );
  };
};

const select = (state) => state;

export default connect(select)(MyProjects)
