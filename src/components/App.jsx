import React from 'react';
import TeamList from './TeamList';
import UnassignedList from './UnassignedList';
import AddTeamForm from './AddTeamForm';

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

    this.addPeople = this.addPeople.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.allTeamsFull = this.allTeamsFull.bind(this);
    this.assignTeams = this.assignTeams.bind(this);
    this.reassignTeams = this.reassignTeams.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
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

  addPeople(people) {
    const { unassigned } = this.state;
    this.setState({
      unassigned: [...unassigned, ...people],
    });
  }

  deletePerson(personName) {
    const { unassigned } = this.state;
    this.setState({
      unassigned: unassigned.filter(({ name }) => name !== personName),
    });
  }

  addTeam(team) {
    const { teams } = this.state;

    this.setState({
      teams: [...teams, team],
    });
  }

  deleteTeam(teamName) {
    const { teams, unassigned } = this.state;
    const teamToDelete = teams.find(({ name }) => name === teamName);
    const people = teamToDelete.members;

    this.setState({
      teams: teams.filter(({ name }) => name !== teamName),
      unassigned: [...unassigned, ...people],
    });
  }

  // Moves all team members to unassigned. The team names and max members are unchanged.
  resetTeams(callback) {
    const { unassigned } = this.state;
    const oldTeamMembers = this.getAllMembers();

    this.setState({
      teams: this.getTeamsWithoutMembers(),
      unassigned: unassigned.concat(oldTeamMembers),
    }, callback);
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

  reassignTeams() {
    this.resetTeams(this.assignTeams);
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
          reassignTeams={this.reassignTeams}
          resetTeams={this.resetTeams}
          addPeople={this.addPeople}
          deletePerson={this.deletePerson}
          allTeamsFull={this.allTeamsFull}
        />
      </div>
    );
  }
}

export default App;
