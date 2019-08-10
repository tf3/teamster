import React from 'react';

const TeamList = ({ team, deleteTeam }) => (
  <div className="team">
    <button type="button" onClick={() => deleteTeam(team.name)}>
      {/* <span role="img" aria-label="delete">❌</span> */}
      <i className="fa fa-trash" aria-hidden="true" />
    </button>
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
