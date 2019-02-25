import React, { Component } from 'react';
import './App.css';



class VicApp extends Component {
  state = {cookies: []}

  // componentDidMount() {
  //   fetch('cookiesV')
  //     .then(res => res.json())
  //     .then(cookies => this.setState({ cookies }));
  // }

    // this receives click event
  getComponent(event) {
    event.currentTarget.style.backgroundColor = '#50cc39';
      // fetch('cookiesV')
      //     .then(res => res.json())
      //     .then(cookies => this.setState({ cookies }));
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

        {/*click this to initiate cookie process*/}
        <div>
            <h1 onClick={this.getComponent.bind(this)}>CLICK ME</h1>
        </div>
      </div>
    );
  }
}

export default VicApp;
