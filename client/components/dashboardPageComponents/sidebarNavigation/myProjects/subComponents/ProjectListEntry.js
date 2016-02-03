import React, { Component } from 'react';
import ProjectButton from './ProjectButton';
import TestButton from './TestButton';
import ReportsButton from './ReportsButton';
import SettingsButton from './SettingsButton';
import InviteTestersButton from './InviteTestersButton';

// export default class extends Component {
//   render () {
//     return (
//       <div className = "ProjectListEntry">
//         <ProjectButton name={this.props.name} />
//       </div>
//     )
//   }
// }

var Section = React.createClass({
  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  },
  getInitialState: function(){
     return {
       open: false,
       class: "section"
     }
  },
  render: function() {
    return (
      <div className={this.state.class}>
        <button>toggle</button>
        <div className="sectionhead" onClick={this.handleClick}>{this.props.title}</div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

export default class extends Component{
  render () {
    return (
      <div className="main">
        <div className="projectButton">{this.props.title}</div>
        <Section title={this.props.name}>
          <ul>
            <li><TestButton /></li>
            <li><ReportsButton /></li>
            <li><SettingsButton /></li>
            <li><InviteTestersButton /></li>
          </ul>
        </Section>
      </div>
    );
  }
}