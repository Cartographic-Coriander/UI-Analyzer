import React from 'react';
import { Panel } from 'react-bootstrap';

const GroupMember = (props) => {
  return (
    <div className = "panel panel-primary authorProfile">
      <div className = "panel-heading">
        <a className = "memberName panel-title">{ props.name }</a>
      </div>
      <div className = "panel-body">
        { props.description }
      </div>
    </div>
  );
};

export default GroupMember;