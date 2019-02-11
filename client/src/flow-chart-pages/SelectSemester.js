import React from "react"
import Navbar from "../components/Navbar"
import {Dropdown} from "react-bootstrap"

class SelectSemester extends React.Component{
  render(){
    return(
      <div className="container">
        <Navbar />

        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Select Your Semester</h2>
            <hr color="#7e1530"/>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Fall</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Winter</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Summer</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectSemester
