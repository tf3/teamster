import React from 'react';
import AddPersonForm from './AddPersonForm.jsx';

const UnassignedList = ({ unassigned, addPeople, assignTeams, reassignTeams, deletePerson, resetTeams, allTeamsFull }) => (
  <div className="unassigned">
    <div className="controls">
      {(unassigned.length === 0 || allTeamsFull()) ? (
        <button onClick={reassignTeams}>Re-assign teams</button>
      ) : (
        <button onClick={assignTeams}>Assign teams</button>
      )}
      &nbsp; <button onClick={resetTeams}>Reset teams</button>
    </div>
    <h3>Not assigned to a team</h3>
    <ol>
      {unassigned.map(person => <li>{person.name} <button onClick={() => deletePerson(person.name)}>❌</button></li>)}
    </ol>
    <AddPersonForm addPeople={addPeople} />
  </div>
);

export default UnassignedList;
