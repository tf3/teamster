import React from 'react';
import AddPersonForm from './AddPersonForm.jsx';

const UnassignedList = ({ unassigned }) => (
  <div className="unassigned">
    <ol>
      {unassigned.map(person => <li>{person.name}</li>)}
    </ol>
    <AddPersonForm />
  </div>
);

export default UnassignedList;
