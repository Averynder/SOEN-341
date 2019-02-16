import React, { Component } from 'react';

class LoginForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
		const inputData = new FormData(event.target);
    const username = inputData.get('username');
    const password = inputData.get('password');
    fetch('login', {
			method: 'POST',
			mode: "cors",
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {'Content-Type': 'application/json'}
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
					<label htmlFor="username">UserName</label>
					<input placeholder="Username" type="text" className="form-control" name="username"/>
        </div>
        <div className="form-group">
					<label htmlFor="password">Password</label>
					<input placeholder="Password" type="password" className="form-control" name="password"/>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginForm;
