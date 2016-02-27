import React from 'react';
import GroupMember from './subComponents/GroupMember';

const corianderMembers = [{name: 'Maximo Cudich-Sieburger', description: 'Max resume personal'}, {name: 'Youngjun "Jota" Kwak', description: 'Jota resume personal'}, {name: 'Egan Tamashiro', description: 'Egan resume personal'}];

const groupMembers = corianderMembers.map((member) => {
  return <GroupMember key = { member.name } name = { member.name } description = { member.description }/>
});

const AboutUs = React.createClass({
  render() {
    return (
      <div className="aboutUs">
        { groupMembers }
      </div>
    )
  }
});

export default AboutUs;
