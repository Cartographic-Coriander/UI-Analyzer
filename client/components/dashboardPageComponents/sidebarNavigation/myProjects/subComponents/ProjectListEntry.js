import React, { Component } from 'react';
import ProjectButton from './ProjectButton';
import TestButton from './TestButton';
import ReportsButton from './ReportsButton';
import SettingsButton from './SettingsButton';
import InviteTestersButton from './InviteTestersButton';
import {Accordion} from 'react-sanfona';
import {AccordionItem} from 'react-sanfona';

export default class extends Component{
  render () {
    var projectArray = this.props.name;
    console.log('projectArray: ', projectArray);
    return (
      <Accordion>
          {[1].map((item) => {
              return (
                  <AccordionItem title={this.props.name}>
                    <div>
                      <ul>
                       <li><TestButton /></li>
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

      // <div className="main">
      //   <div className="projectButton">{this.props.title}</div>
      //     <Accordion>
      //       <AccordionItem><TestButton /></AccordionItem>
      //       <AccordionItem><ReportsButton /></AccordionItem>
      //       <AccordionItem><SettingsButton /></AccordionItem>
      //       <AccordionItem><InviteTestersButton /></AccordionItem>
      //     </Accordion>
      // </div>
}