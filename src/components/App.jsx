import React from 'react';
import TeamList from './TeamList';
import UnassignedList from './UnassignedList';
import AddTeamForm from './AddTeamForm';

const popRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

const getId = () => document.location.pathname.slice(1);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], unassigned: [] };

    this.addPeople = this.addPeople.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.allTeamsFull = this.allTeamsFull.bind(this);
    this.assignTeams = this.assignTeams.bind(this);
    this.reassignTeams = this.reassignTeams.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.fetchFromServer = this.fetchFromServer.bind(this);
    this.getTeamsWithoutMembers = this.getTeamsWithoutMembers.bind(this);
    this.resetTeams = this.resetTeams.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  componentDidMount() {
    this.fetchFromServer();
    setInterval(this.fetchFromServer, 2000);
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
    }, this.sendToServer);
  }

  deletePerson(personName) {
    const { unassigned } = this.state;
    this.setState({
      unassigned: unassigned.filter(({ name }) => name !== personName),
    }, this.sendToServer);
  }

  addTeam(team) {
    const { teams } = this.state;

    this.setState({
      teams: [...teams, team],
    }, this.sendToServer);
  }

  deleteTeam(teamName) {
    const { teams, unassigned } = this.state;
    const teamToDelete = teams.find(({ name }) => name === teamName);
    const people = teamToDelete.members;

    this.setState({
      teams: teams.filter(({ name }) => name !== teamName),
      unassigned: [...unassigned, ...people],
    }, this.sendToServer);
  }

  // Moves all team members to unassigned. The team names and max members are unchanged.
  resetTeams(callback) {
    const { unassigned } = this.state;
    const oldTeamMembers = this.getAllMembers();

    this.setState({
      teams: this.getTeamsWithoutMembers(),
      unassigned: unassigned.concat(oldTeamMembers),
    }, () => {
      if (callback) callback();
      this.sendToServer();
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
    }, this.sendToServer);
  }

  reassignTeams() {
    this.resetTeams(this.assignTeams);
  }

  sendToServer() {
    const { teams, unassigned } = this.state;

    fetch(`/groups/${getId()}`, {
      method: 'PUT',
      body: JSON.stringify({ teams, unassigned }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(console.log)
      .catch(console.log);
  }

  fetchFromServer() {
    fetch(`/groups/${getId()}`)
      .then(response => response.json())
      .then(data => this.setState(data)) // TODO: check to make sure there's not an error
      .catch(console.log);
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
