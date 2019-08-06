import React from 'react';

const UnassignedList = ({ unassigned }) => (
  <div className="unassigned">
    <ol>
      {unassigned.map(person => <li>{person.name}</li>)}
    </ol>
  </div>
);

export default UnassignedList;
