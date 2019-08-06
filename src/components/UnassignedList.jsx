import React from 'react';
import AddPersonForm from './AddPersonForm.jsx';

const UnassignedList = ({ unassigned, addPerson, assignTeams, resetTeams }) => (
  <div className="unassigned">
    <button onClick={assignTeams}>Assign teams</button> <button onClick={resetTeams}>Reset teams</button>
    <h3>Not assigned to a team</h3>
    <ol>
      {unassigned.map(person => <li>{person.name}</li>)}
    </ol>
    <AddPersonForm addPerson={addPerson} />
  </div>
);

export default UnassignedList;
