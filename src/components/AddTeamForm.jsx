import React from 'react';

class AddTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      maxMembers: '',
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  validateInput() {
    const { name, maxMembers } = this.state;
    return name !== '' && maxMembers !== '' && !Number.isNaN(Number(maxMembers));
  }

  handleFormInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addTeam } = this.props;
    const team = this.state;

    if (this.validateInput()) {
      addTeam({
        name: team.name,
        maxMembers: Number(team.maxMembers),
        members: [],
      });

      this.setState({
        name: '',
        maxMembers: '',
      });

      e.target.name.focus();
    }
  }

  render() {
    const { name, maxMembers } = this.state;
    return (
      <div className="team">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Team name <br />
            <input type="text" name="name" value={name} onChange={this.handleFormInput} />
          </label>
          <label htmlFor="maxMembers">
            Number of members <br />
            <input type="text" name="maxMembers" value={maxMembers} onChange={this.handleFormInput} />
          </label>
          <input type="submit" hidden="hidden" />
        </form>
      </div>
    );
  }
}

export default AddTeamForm;
