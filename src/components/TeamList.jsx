import React from 'react';

const TeamList = ({ team }) => (
  <div className="team">
    <h3>{team.name} ({team.members.length}/{team.maxMembers})</h3>
    {team.members.length === 0 ? (
      <p>No members</p>
    ) : (
      <ol>
        {team.members.map(member => <li>{member.name}</li>)}
      </ol>
    )}
  </div>
);

export default TeamList;
