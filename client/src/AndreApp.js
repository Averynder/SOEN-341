import React, { Component } from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";

class AndreApp extends React.Component {

	constructor(props) {
		super(props);
	}


  render() {
    return (
      <div className="container">
        <div className="jumbotron j-greetings">
          <h1>User Login</h1>
            <LoginForm />
        </div>
      </div>
    );
  }
}

export default AndreApp;
