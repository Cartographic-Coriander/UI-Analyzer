import React from 'react';
import GroupMember from './subComponents/GroupMember';

const corianderMembers = [
{name: 'Maximo Cudich-Sieburger', description: 'Max resume personal'}, 
{name: 'Youngjun "Jota" Kwak', description: 'Jota resume personal'}, 
{name: 'Egan Tamashiro', description: 'In addition to being a full-stack developer, Egan loves the ocean and everything about the game of baseball.'}];

const groupMembers = corianderMembers.map((member) => {
  return <GroupMember key = { member.name } name = { member.name } description = { member.description } gitHub = { member.gitHub }/>
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
