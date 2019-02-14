import React, { Component } from 'react';
import './App.css';

class AndreApp extends Component {
  state = {users: []}


  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }


  render() {
    return (
      <div className="container">
        <div className="jumbotron j-greetings">
          <h1>Users</h1>
          {this.state.users.map(user =>
            <div key={user.id}>{user.username}, {user.id}</div>
          )}
        </div>
      </div>
    );
  }
}

export default AndreApp;
