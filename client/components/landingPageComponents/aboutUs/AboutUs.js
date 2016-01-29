import React from 'react';
import GroupMember from './subComponents/GroupMember';

const corianderMembers = ['Max', 'Jota', 'Egan'];


const groupMembers = corianderMembers.map((member) => {
  return <GroupMember name={member} />
});

const AboutUs = React.createClass({

  render() {
    return (
      <div>
        <ul>
          {groupMembers}
        </ul>
      </div>
    )
  }

});

export default AboutUs;
