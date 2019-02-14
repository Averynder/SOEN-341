import React from "react"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import { Link } from "react-router-dom"

class ObtainUploadedSequence extends React.Component{
  render(){
    return(
      <div className="container">
        <Navbar /> <br />
        <div className="container">
          <div className="jumbotron j-greetings">
            <h1>The Uploaded Sequence Will Go Here</h1>
            <hr color="#7E1530" />
            <Link to="/course-selection-menu">
              <Button text="Generate Semester" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ObtainUploadedSequence
