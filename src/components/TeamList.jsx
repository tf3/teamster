import React from 'react';

const TeamList = ({ team, deleteTeam }) => (
  <div className="team">
    <button onClick={() => deleteTeam(team.name)}>❌</button>
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
