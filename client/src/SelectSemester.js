import React from "react"
import Navbar from "./components/Navbar"
import { Form } from "react-bootstrap"
import Button from "./components/Button"
import { Link } from "react-router-dom"

class SelectSemester extends React.Component{
  render(){
    const currentYear = (new Date()).getFullYear();
    var yeetus = [];
    for(let i=1;i<8;i++){ /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy =>
      <option>{jimmy}</option>
    )


    return(
      <div className="container">
        <Navbar />

        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Select Your Semester</h2>
            <hr color="#7e1530"/>
            <div style={{textAlign: "center"}}>
              <Form>
                <Form.Group controlId="semester">
                  <Form.Label>Select Semester</Form.Label>
                  <Form.Control as="select">
                    <option selected="selected">Fall</option>
                    <option>Winter</option>
                    <option>Summer</option>
                  </Form.Control>
                </Form.Group>
              </Form>

              <Form>
                <Form.Group controlId="semester-year">
                  <Form.Label>Select Year</Form.Label>
                  <Form.Control as="select" selected={currentYear}>
                    <option selected="selected">{currentYear}</option>
                    {years}
                  </Form.Control>
                </Form.Group>
              </Form>

              <Link to="course-selection-menu">
                <Button text="Continue"/>
              </Link>

              <br />

              <Link to="/">
                <Button text="Back To Homepage" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectSemester
