import React from "react"
import Navbar from "../components/Navbar"
import { Dropdown, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

class SelectSemester extends React.Component{
  render(){
    const currentYear = (new Date()).getFullYear();
    var yeetus = [];
    for(let i=0;i<8;i++){ /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy => <Dropdown.Item>{jimmy}</Dropdown.Item>)

    return(
      <div className="container">
        <Navbar />

        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Select Your Semester</h2>
            <hr color="#7e1530"/>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select A Semester
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Fall</Dropdown.Item>
                <Dropdown.Item>Winter</Dropdown.Item>
                <Dropdown.Item>Summer</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select A Year
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {years} {/*Array of year-component mapped*/}
              </Dropdown.Menu>
            </Dropdown>

            <Link to="/">
              <Button variant="info">Continue</Button>
            </Link>
            <br />
            <Link to="/">
              <Button variant="danger">Back</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectSemester
