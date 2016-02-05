import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';
import { connect } from 'react-redux';
import { contentState, setFocus, getsTest } from '../../../../redux/actions';
import ProjectButton from './subComponents/ProjectButton';
import TestButton from './subComponents/TestButton';
import ReportsButton from './subComponents/ReportsButton';
import SettingsButton from './subComponents/SettingsButton';
import InviteTestersButton from './subComponents/InviteTestersButton';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Button } from 'react-bootstrap';

class MyProjects extends Component {
  handleClick (projectId) {
    this.props.dispatch(getsTest({ projectId: projectId }));
    this.props.dispatch(setFocus('projectId', projectId));
    this.props.dispatch(contentState('Test'));
  }

  setContent (context) {
    this.props.dispatch(contentState(context));
  }

  componentDidMount () {
    var that = this;
    setTimeout(() => {$('.react-sanfona-item').children('h3').map(function (index, element) {
        return $(element).on('click', that.handleClick.bind(that, that.props.projects.list[index].id));
      })}, 500);
  }

  render () {
    return (
      <div>
        <AddProjectButton />
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
      </div>
    );
  }
}

const select = (state) => state

export default connect(select)(MyProjects)
