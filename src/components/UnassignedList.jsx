import React from 'react';
import AddPersonForm from './AddPersonForm';
import Controls from './Controls';

const UnassignedList = ({
  unassigned, addPeople, assignTeams, reassignTeams, deletePerson, resetTeams, allTeamsFull,
}) => (
  <div className="unassigned">
    <Controls
      assignTeams={assignTeams}
      reassignTeams={reassignTeams}
      resetTeams={resetTeams}
      unassigned={unassigned}
      allTeamsFull={allTeamsFull}
    />
    <h3>Not assigned to a team</h3>
    <ol>
      {unassigned.map(person => (
        <li>
          {person.name} &nbsp;
          <button type="button" onClick={() => deletePerson(person.name)}>
            <span role="img" aria-label="delete">❌</span>
          </button>
        </li>
      ))}
    </ol>
    <AddPersonForm addPeople={addPeople} />
  </div>
);

export default UnassignedList;
