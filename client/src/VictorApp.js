import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {cookies: []}

  componentDidMount() {
    fetch('cookiesV')
      .then(res => res.json())
      .then(cookies => this.setState({ cookies }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.cookies.map(user =>
          <div key={user.id}>{user.username}, {user.id}</div>
        )}
      </div>
    );
  }
}

export default App;
