import React from 'react';
import GroupMember from './subComponents/GroupMember';

const corianderMembers = ['Max Cudich', 'Youngjun "Jota" Kwak', 'Egan Tamashiro'];


const groupMembers = corianderMembers.map((member) => {
  return <GroupMember key={member} name={member} />
});

const AboutUs = React.createClass({

  render() {
    return (
      <div className="aboutUs">
        {groupMembers}
      </div>
    )
  }

});

export default AboutUs;
