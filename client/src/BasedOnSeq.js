import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

class BasedOnSeq extends Component {
    // constructor() {
    //     super()
    //   }

    render() {
      return (
        <div className="container">
          <Navbar />
          <div className="container">
            <div className="jumbotron j-greetings">
              <h2 className="display-4">Is it based on a Sequence?</h2>
              <hr color="#7e1530"/>
              <div class="btn-group" role="group" aria-label="Basic example">
                <Link to="/select-semester">
                  <Button text="No" onClick="#"/>
                </Link>
                <Link to="/obtain-uploaded-sequence">
                  <Button text="Yes" onClick="#"/>
                </Link>
              </div>
              <Link to="/">
                <Button text="Back To Homepage"/>
              </Link>
            </div>
          </div>
        </div>

      )
    }

}

export default BasedOnSeq
