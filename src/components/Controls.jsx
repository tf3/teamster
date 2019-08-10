import React from 'react';

const controls = ({
  assignTeams, reassignTeams, resetTeams, unassigned, allTeamsFull,
}) => (
  <div className="controls">
    {(unassigned.length === 0 || allTeamsFull()) ? (
      <button type="button" onClick={reassignTeams}>Re-assign teams</button>
    ) : (
      <button type="button" onClick={assignTeams}>Assign teams</button>
    )}
    &nbsp; <button type="button" onClick={() => resetTeams()}>Reset teams</button>
  </div>
);

export default controls;
