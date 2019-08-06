import React from 'react';
import TeamList from './TeamList.jsx';
import UnassignedList from './UnassignedList.jsx';

const placeholderState = {
  teams: [
    {
      name: 'Red',
      maxMembers: 5,
      members: [{ name: 'Thomas' }, { name: 'Joe' }],
    },
    {
      name: 'Blue',
      maxMembers: 5,
      members: [{ name: 'Jane' }, { name: 'Lane' }, { name: 'John' }],
    },
  ],
  unassigned: [{ name: 'Alex' }, { name: 'Alicia' }],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = placeholderState;
  }

  render() {
    const { teams, unassigned } = this.state;

    return (
      <div>
        <h1>Team Builder</h1>
        {teams.map(team => <TeamList team={team} />)}
        <UnassignedList unassigned={unassigned} />
      </div>
    );
  }
}

export default App;