import React from 'react';

const AddPersonForm = ({ addPeople }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPeople([{ name: e.target.name.value }]);
    e.target.name.value = '';
  };

  // Starting at the first character, this strips out all non-letters up to
  // the first letter character. It's useful for removing hyphens or bullets
  // from pasted lists of names.
  const cleanUpName = (name) => {
    const pattern = /^[^a-zA-Z]*(.*)$/;
    return name.match(pattern)[1];
  };

  const handlePaste = (e) => {
    const names = e.clipboardData.getData('text').split('\n');
    if (names.length <= 1) return; // Don't do anything special if only one line of text is pasted

    e.preventDefault();
    const people = names.map(cleanUpName)
      .filter(name => name.trim() !== '')
      .map(name => ({ name }));
    addPeople(people);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        New person <br />
        <input type="text" name="name" onPaste={handlePaste} />
      </label>
    </form>
  );
};

export default AddPersonForm;
