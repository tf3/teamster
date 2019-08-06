import React from 'react';

const AddPersonForm = ({ addPerson }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPerson({ name: e.target.name.value });
    e.target.name.value = '';
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        New person <br />
        <input type="text" name="name" />
      </label>
    </form>
  );
};

export default AddPersonForm;
