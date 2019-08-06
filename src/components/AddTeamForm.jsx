import React from 'react';

const AddTeamForm = () => (
  <div className="team">
    <form>
      <label>
        New team
        <input type="text" name="teamName" />
        <button>Add team</button>
      </label>
    </form>
  </div>
);

export default AddTeamForm;