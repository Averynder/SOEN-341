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
    const netname = inputData.get('netname');
    const password = inputData.get('password');
		console.log('transferring', netname, password);
    fetch('/login', {
			method: 'POST',
			mode: "cors",
			body: JSON.stringify({
				netname: netname,
				password: password
			}),
			headers: {'Content-Type': 'application/json'}
    });
		this.setState({'netname': netname, 'password': password});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
			{JSON.stringify(this.state)}
        <div className="form-group">
					<label htmlFor="netname">UserName</label>
					<input placeholder="Netname" type="text" className="form-control" name="netname"/>
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
