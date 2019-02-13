import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import SequenceTable from "./SequenceTable"

class RubiatSeqLink extends Component {
    // constructor() {
    //     super()
    //   }

    render() {
      return (
        <div className="container">
          <navbar />
          <div className="container">
            <div className="jumbotron j-greetings">
              <SequenceTable />
              <Link to="/">
                <Button text="Back"/>
              </Link>
            </div>
          </div>
        </div>
      )
    }

}

export default RubiatSeqLink
