const Group = require('./group.js');
const db = require('../db.js');

const placeholderGroup = {
  teams: [3, 2, 1], unassigned: [1, 2, 3],
};

afterAll(() => {
  db.disconnect();
});

describe('group controller', () => {
  it('adds groups to the database', () => (
    Group.add(placeholderGroup)
      .then(newGroup => newGroup._id)
      .then(id => Group.find(id))
      .then(foundGroup => expect(foundGroup.teams[0]).toBe(3))
  ));
});
