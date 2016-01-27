import React from 'react';
import GroupMember from './subComponents/GroupMember';

const corianderMembers = ['Max', 'Jota', 'Egan'];

//state isnt used here (about us not going to be changing much, no need state)
const memberList = () => {
  const groupMembers = corianderMembers.map((member) => {
    return <GroupMember name={member}/>
  });

  return (
    <div>
      <h3>Cartographic Coriander</h3>
      <ul>
        {groupMembers}
      </ul>
    </div>
  )
}

export default memberList;
