import React from 'react';
import TeamList from './TeamList.jsx';
import UnassignedList from './UnassignedList.jsx';
import AddTeamForm from './AddTeamForm.jsx';

const popRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

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

    this.addPerson = this.addPerson.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.allTeamsFull = this.allTeamsFull.bind(this);
    this.assignTeams = this.assignTeams.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.getTeamsWithoutMembers = this.getTeamsWithoutMembers.bind(this);
    this.resetTeams = this.resetTeams.bind(this);
  }

  getAllMembers() {
    const { teams } = this.state;

    return teams.reduce((allMembers, team) => (
      allMembers.concat(team.members)
    ), []);
  }

  getTeamsWithoutMembers() {
    const { teams } = this.state;

    return teams.map(team => ({
      name: team.name,
      maxMembers: team.maxMembers,
      members: [],
    }));
  }

  addPerson(person) {
    const { unassigned } = this.state;
    this.setState({
      unassigned: [...unassigned, person],
    });
  }

  addTeam(team) {
    const { teams } = this.state;
    console.log([...teams, team]);

    this.setState({
      teams: [...teams, team],
    });
  }

  deleteTeam(teamName) {
    console.log(teamName);
    const { teams, unassigned } = this.state;
    const teamToDelete = teams.find(({ name }) => name === teamName);
    const people = teamToDelete.members;

    this.setState({
      teams: teams.filter(({ name }) => name !== teamName),
      unassigned: [...unassigned, ...people],
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

  allTeamsFull() {
    const { teams } = this.state;
    return !teams.some(team => team.members.length < team.maxMembers);
  }

  assignTeams() {
    const { unassigned, teams } = this.state;
    const newTeams = teams.slice(0);

    while (unassigned.length > 0 && !this.allTeamsFull()) {
      newTeams.forEach((team) => {
        if (team.members.length < team.maxMembers) {
          const person = popRandom(unassigned);
          if (person) team.members.push(person);
        }
      });
    }

    this.setState({
      unassigned,
      teams: newTeams,
    });
  }

  render() {
    const { teams, unassigned } = this.state;

    return (
      <div>
        <div className="teams">
          {teams.map(team => <TeamList team={team} deleteTeam={this.deleteTeam} />)}
          <AddTeamForm addTeam={this.addTeam} />
        </div>
        <UnassignedList
          unassigned={unassigned}
          assignTeams={this.assignTeams}
          resetTeams={this.resetTeams}
          addPerson={this.addPerson}
        />
      </div>
    );
  }
}

export default App;
