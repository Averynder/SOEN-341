import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

class BuildSeqOrSem extends Component {
    // constructor() {
    //     super()
    //   }

    render() {
      return (
        <div className="container">
          <Navbar />
          <div className="container">
            <div className="jumbotron j-greetings">
              <h2 className="display-4">Which build option would you like?</h2>
              <hr color="#7e1530"/>
              <div class="btn-group" role="group" aria-label="Basic example">
                <Link to="/select-semester">
                  <Button text="Sequence"/>
                </Link>
                <Link to="/seq-based-confirmation">
                  <Button text="Semester"/>
                </Link>
              </div>
              <Link to="/">
                <Button text="Back"/>
              </Link>
            </div>
          </div>
        </div>
      )
    }

}

export default BuildSeqOrSem
