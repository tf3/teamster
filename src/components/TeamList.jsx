import React from 'react';

const TeamList = ({ team, deleteTeam, togglePinned }) => (
  <div className={`team ${team.pinned ? 'pinned' : ''}`}>
    <button className="pin" type="button" onClick={() => togglePinned(team.name)}>
      <i className="fa fa-thumb-tack" aria-hidden="true" />
    </button>
    <button type="button" onClick={() => deleteTeam(team.name)}>
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
