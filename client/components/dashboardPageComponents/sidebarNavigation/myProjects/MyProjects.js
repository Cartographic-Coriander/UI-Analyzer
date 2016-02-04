import React, { Component } from 'react';
import ProjectListEntry from './subComponents/ProjectListEntry';
import AddProjectButton from './subComponents/AddProjectButton';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';
import ProjectButton from './subComponents/ProjectButton';
import TestButton from './subComponents/TestButton';
import ReportsButton from './subComponents/ReportsButton';
import SettingsButton from './subComponents/SettingsButton';
import InviteTestersButton from './subComponents/InviteTestersButton';
import {Accordion} from 'react-sanfona';
import {AccordionItem} from 'react-sanfona';
import { Button } from 'react-bootstrap';

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
    }, {
      name: 'project3',
      description: 'awesome',
      id: 2
    }];

    return (
      <Accordion className="ProjectAccordion">
          {projects.map((item) => {
              return (
                <AccordionItem title={item.name}>
                  <div>
                    <ul className="projectAccordionItems">
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
    );
  }
}

const select = (state) => state

export default connect(select)(MyProjects)
