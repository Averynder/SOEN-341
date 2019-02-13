import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"


class LinkBox extends Component {
    // constructor() {
    //     super()
    //   }

    render() {
      return (
        <div className="container">
          <div className="container">
            <div className="jumbotron j-greetings">
              <h2 className="display-5">Direct links to other pages</h2>
              <hr color="#7e1530"/>
              <div class="btn-group" role="group" aria-label="Basic example">
                <Link to="/andre's-App">
                  <Button text="Andre's App" onClick="#"/>
                </Link>
                <Link to="/rubiat-seq-table">
                  <Button text="Table of seq." onClick="#"/>
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

export default LinkBox
