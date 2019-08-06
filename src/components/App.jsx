import React from 'react';
import TeamList from './TeamList.jsx';
import UnassignedList from './UnassignedList.jsx';
import AddTeamForm from './AddTeamForm.jsx';

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
    {
      name: 'Green',
      maxMembers: 3,
      members: [{ name: 'Sally' }, { name: 'Jen' }],
    },
  ],
  unassigned: [{ name: 'Alex' }, { name: 'Alicia' }],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = placeholderState;

    this.resetTeams = this.resetTeams.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.getTeamsWithoutMembers = this.getTeamsWithoutMembers.bind(this);
  }

  getAllMembers() {
    const { teams } = this.state;

    return teams.reduce((allMembers, team) => (
      allMembers.concat(team.members)
    ), []);
  }

  getTeamsWithoutMembers() {
    const { teams } = this.state;

    return teams.map((team) => {
      return {
        name: team.name,
        maxMembers: team.maxMembers,
        members: [],
      }
    });
  }

  // Moves all team members to unassigned. The team names and max members are unchanged.
  resetTeams() {
    const { unassigned } = this.state;
    const oldTeamMembers = this.getAllMembers();

    this.setState({
      teams: this.getTeamsWithoutMembers(),
      unassigned: unassigned.concat(oldTeamMembers),
    });
  }

  render() {
    const { teams, unassigned } = this.state;

    return (
      <div>
        <h1>Team Builder</h1>
        <div className="teams">
          {teams.map(team => <TeamList team={team} />)}
          <AddTeamForm />
        </div>
        <UnassignedList unassigned={unassigned} resetTeams={this.resetTeams} />
      </div>
    );
  }
}

export default App;
