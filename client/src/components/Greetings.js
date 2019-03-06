import React from "react"

class Greetings extends React.Component {
  render(){return (
    <div className="container">
      <div className="jumbotron j-greetings">
        <h2 className="display-4">Hey Concordians!</h2>
        <hr color="#7e1530"/>
        <p className="lead">Welcome to Concordia Software Engineering Schedule Builder</p>
        <p id="currentTime"></p>
        {this.props.children}
      </div>
    </div>
  )}
}

export default Greetings
