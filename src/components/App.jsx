import React from 'react';
import TeamList from './TeamList';
import UnassignedList from './UnassignedList';
import AddTeamForm from './AddTeamForm';
import {
  formatPdfData, downloadPdf, popRandom, getId, generateCSV, copyLink,
} from '../utilities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], unassigned: [] };

    this.addPeople = this.addPeople.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.allTeamsFull = this.allTeamsFull.bind(this);
    this.allTeamsEmpty = this.allTeamsEmpty.bind(this);
    this.assignTeams = this.assignTeams.bind(this);
    this.reassignTeams = this.reassignTeams.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.fetchFromServer = this.fetchFromServer.bind(this);
    this.getTeamsWithoutMembers = this.getTeamsWithoutMembers.bind(this);
    this.getUnpinnedTeamsWithoutMembers = this.getUnpinnedTeamsWithoutMembers.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.resetTeams = this.resetTeams.bind(this);
    this.resetUnpinnedTeams = this.resetUnpinnedTeams.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
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

  getUnpinnedTeamsWithoutMembers() {
    const { teams } = this.state;
    const unpinnedTeams = teams.filter(team => !team.pinned);

    return unpinnedTeams.map(team => (
      {
        name: team.name,
        maxMembers: team.maxMembers,
        members: [],
        pinned: false,
      }
    ));
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

  resetUnpinnedTeams(callback) {
    const { unassigned, teams } = this.state;
    const pinnedTeams = teams.filter(team => team.pinned);
    const unpinnedTeams = teams.filter(team => !team.pinned);
    const unpinnedTeamMembers = unpinnedTeams.reduce((members, team) => (
      members.concat(team.members)
    ), []);
    const unpinnedTeamsWithoutMembers = this.getUnpinnedTeamsWithoutMembers();

    this.setState({
      teams: [...pinnedTeams, ...unpinnedTeamsWithoutMembers],
      unassigned: [...unassigned, ...unpinnedTeamMembers],
    }, () => {
      callback();
      this.sendToServer();
    });
  }

  allTeamsFull() {
    const { teams } = this.state;
    const unpinnedTeams = teams.filter(team => !team.pinned);
    return !unpinnedTeams.some(team => team.members.length < team.maxMembers);
  }

  allTeamsEmpty() {
    const { teams } = this.state;
    return teams.every(team => team.members.length === 0);
  }

  assignTeams() {
    const { unassigned, teams } = this.state;
    const pinnedTeams = teams.filter(team => team.pinned);
    const unpinnedTeams = teams.filter(team => !team.pinned);

    while (unassigned.length > 0 && !this.allTeamsFull()) {
      unpinnedTeams.forEach((team) => {
        if (team.members.length < team.maxMembers) {
          const person = popRandom(unassigned);
          if (person) team.members.push(person);
        }
      });
    }

    this.setState({
      unassigned,
      teams: [...pinnedTeams, ...unpinnedTeams],
    }, this.sendToServer);
  }

  reassignTeams() {
    this.resetUnpinnedTeams(this.assignTeams);
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
      .catch(console.log);
  }

  togglePinned(teamName) {
    const { teams } = this.state;
    const newTeams = teams.slice(0);

    const team = newTeams.find(({ name }) => name === teamName);
    team.pinned = !team.pinned;
    this.setState({
      teams: newTeams,
    }, this.sendToServer);
  }

  fetchFromServer() {
    fetch(`/groups/${getId()}`)
      .then(response => response.json())
      .then(data => this.setState(data)) // TODO: check to make sure there's not an error
      .catch(console.log);
  }

  downloadCSV() {
    const { teams, unassigned } = this.state;
    const csv = generateCSV({ teams, unassigned });
    const link = document.createElement('a');

    link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`);
    link.setAttribute('download', 'teams.csv');
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    const { teams, unassigned } = this.state;

    return (
      <div>
        <div className="teams">
          {teams.map(team => (
            <TeamList
              team={team}
              deleteTeam={this.deleteTeam}
              togglePinned={this.togglePinned}
            />
          ))}
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
          allTeamsEmpty={this.allTeamsEmpty}
        />
        <div className="bottom">
          <button type="button" onClick={this.downloadCSV}>
            <i className="fa fa-file-excel-o" /> Download CSV
          </button>  &nbsp;
          <button type="button" onClick={() => downloadPdf(formatPdfData(this.state))}>
            <i className="fa fa-file-pdf-o" /> Download PDF
          </button>
        </div>
        <div className="link" onClick={copyLink} role="button" tabIndex={0}>
          <i className="fa fa-link" aria-hidden="true" />
          <input id="link" value={document.location.href} type="text" readOnly />
        </div>
      </div>
    );
  }
}

export default App;
