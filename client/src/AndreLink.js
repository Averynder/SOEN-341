import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import AndreApp from "./AndreApp"

class AndreLink extends Component {
    // constructor() {
    //     super()
    //   }

    render() {
      return (
        <div className="container">
          <Navbar />
          <div className="container">
            <div className="jumbotron j-greetings">
              <AndreApp />
              <Link to="/">
                <Button text="Back"/>
              </Link>
            </div>
          </div>
        </div>
      )
    }

}

export default AndreLink
