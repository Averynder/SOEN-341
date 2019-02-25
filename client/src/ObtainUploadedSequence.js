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
            <div class="container">
              <h3>The courses not taken yet are: </h3>
              <dl>
                <li>course1</li>
                <li>course2</li>
                <li>course3</li>
                <li>course4</li>
                <li>course5</li>
                <li>course6</li>
              </dl>
            </div>
            <Button text="Put in Order" />
            <Link to="/draft-sequence-menu">
              <Button text="Generate Sequence" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ObtainUploadedSequence
