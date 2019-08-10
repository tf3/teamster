import React from 'react';

const controls = ({
  assignTeams, reassignTeams, resetTeams, unassigned, allTeamsFull, allTeamsEmpty,
}) => (
  <div className="controls">
    {!allTeamsEmpty() && (unassigned.length === 0 || allTeamsFull()) ? (
      <button type="button" onClick={reassignTeams}><i className="fa fa-random" /> Assign teams</button>
    ) : (
      <button type="button" onClick={assignTeams} disabled={unassigned.length === 0}><i className="fa fa-arrow-up" /> Assign teams</button>
    )}
    &nbsp; <button type="button" onClick={() => resetTeams()} disabled={allTeamsEmpty() === true}><i className="fa fa-arrow-down" /> Reset teams</button>
  </div>
);

export default controls;
