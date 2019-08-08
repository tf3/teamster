import React from 'react';
import AddPersonForm from './AddPersonForm.jsx';

const UnassignedList = ({ unassigned, addPeople, assignTeams, deletePerson, resetTeams }) => (
  <div className="unassigned">
    <div class="controls">
      <button onClick={assignTeams}>Assign teams</button> <button onClick={resetTeams}>Reset teams</button>
    </div>
    <h3>Not assigned to a team</h3>
    <ol>
      {unassigned.map(person => <li>{person.name} <button onClick={() => deletePerson(person.name)}>❌</button></li>)}
    </ol>
    <AddPersonForm addPeople={addPeople} />
  </div>
);

export default UnassignedList;
