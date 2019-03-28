import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"

class Formalize extends Component {

    render() {
      return (
        <div className="container">
          <div className="container">
            <div className="jumbotron j-greetings">
              <h2 className="display-4">Do you want to formalize upcoming semester</h2>
              <hr color="#7e1530"/>
              <div class="btn-group" role="group" aria-label="Basic example">
                <Link to="/draft-sequence-menu">
                  <Button text="No"/>
                </Link>
                <Link to="/course-selection-menu">
                  <Button text="Yes"/>
                </Link>
              </div>
            </div>
          </div>
        </div>

      )
    }

}

export default Formalize
