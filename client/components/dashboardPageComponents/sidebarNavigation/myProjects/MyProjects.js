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
    return (
      <div>
        <AddProjectButton />
        <Accordion className="ProjectAccordion">
            { this.props.projects.list.map((item) => {
                return (
                  <AccordionItem key={ item.id } title={ item.name }>
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
      </div>
    );
  }
}

const select = (state) => state

export default connect(select)(MyProjects)
