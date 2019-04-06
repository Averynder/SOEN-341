import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

class BuildSeqOrSem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Hi {this.props.firstName}, which build option would you like?</h2>
            <hr color="#7e1530"/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <Link to="/course-selection-menu">
                <Button text="Semester"/>
              </Link>
              <Link to="/draft-sequence-menu">
                <Button text="Sequence"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BuildSeqOrSem
