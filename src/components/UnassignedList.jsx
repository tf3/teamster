import React from 'react';
import AddPersonForm from './AddPersonForm';
import Controls from './Controls';

const UnassignedList = ({
  unassigned, addPeople, assignTeams, reassignTeams, deletePerson, resetTeams,
  allTeamsFull, allTeamsEmpty,
}) => (
  <div className="unassigned">
    <Controls
      assignTeams={assignTeams}
      reassignTeams={reassignTeams}
      resetTeams={resetTeams}
      unassigned={unassigned}
      allTeamsFull={allTeamsFull}
      allTeamsEmpty={allTeamsEmpty}

    />
    <h3>Not assigned to a team</h3>
    <ol>
      {unassigned.map(person => (
        <li>
          {person.name} &nbsp;
          <button type="button" onClick={() => deletePerson(person.name)}>
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ol>
    <AddPersonForm addPeople={addPeople} />
  </div>
);

export default UnassignedList;
