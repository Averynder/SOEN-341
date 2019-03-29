import React from "react";
import * as data from "./data/courses.json";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "./components/Button";

class SelectSemester extends React.Component {
  constructor() {
    super();

    this.state = {
      courses: data.default.sequence,
      selectedCourses: [],
      show2: "hidden"
    };
  }
//////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
  addClass = () => {
    let array = this.state.selectedCourses; //Keep track of user selected classes
    let input = document.getElementById("add-class1").value; //Get user input
    let classList = this.state.courses; //Gets the whole list of courses of concordia
    let addedClass;
    let classExists = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].course === input) {
        for (let j = 0; j < this.state.selectedCourses.length; j++) {
          if (this.state.selectedCourses[j].course === input) {
            document.getElementById("addStatus1").innerHTML =
              "This class is already added.";
            this.setState({ show2: "visible" });
            return;
          }
        }
        addedClass = classList[i];
        classExists = true;
        this.setState({ show2: "hidden" });
        break;
      }
    }
    if (classExists === false) {
      document.getElementById("addStatus1").innerHTML =
        "Invalid Class/Class Not Found";
      this.setState({ show2: "visible" });
      return;
    }
    array.push(addedClass);
    this.setState({
      selectedCourses: array
    });
  };

  remove = () => {
    let coursecode = document.getElementById("add-class1").value;
    let array = this.state.selectedCourses.filter(
      data => coursecode !== data.course
    );
    this.setState({
      selectedCourses: array
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

  render() {
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    let x = this.state.selectedCourses.map(element => (
      <tr>
        <td>
          <div>
            <input type="checkbox" checked /> &nbsp;
            <strong id={element.course}>{element.course}</strong>
            <br />
            <strong>{element.name}</strong>{" "}
            <select name="course-section">
              <option value="section1">section 1</option>
              <option value="section2">section 2</option>
              <option value="section3">section 3</option>
              <option value="section4">section 4</option>
            </select>
            <br />
            <p id="requirements">
              <strong>Requirement: </strong> related info goes here
            </p>
          </div>
        </td>
      </tr>
    ));

    let table = (
      <Table
        id="selected-course-table"
        className="rounded"
        striped
        bordered
        hover
        variant="dark"
      >
        {x}
      </Table>
    );

    let allOptions = this.state.courses.map(choice => (
      <option value={choice.course} />
    ));

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    const currentYear = new Date().getFullYear();
    var yeetus = [];
    for (let i = 1; i < 8; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy => <option>{jimmy}</option>);

    return (
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Select Your Semester</h2>
            <hr color="#7e1530" />
            <div style={{ textAlign: "center" }}>
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

              {/*<hr color="#7e1530" />
              <p className="lead">
                Only courses available:
                <li>COMP248</li>
                <li>COMP232</li>
                <li>SOEN228</li>
                <li>ENGR213</li>
                <br />
                This is just a test page.
              </p>
              <div className="container">
                <div className="row bg-secondary text-white rounded">
                  <div className="col">
                    <label for="add-class1">
                      <h6 id="test">Select Course</h6>
                    </label>
                    <input
                      type="text"
                      list="add-class2"
                      id="add-class1"
                      className="btn btn-dark"
                      placeholder="Course Number"
                    />
                    <datalist id="add-class2">{allOptions}</datalist>
                  </div>
                  <div className="col">
                    <Button
                      text="Select"
                      onClick={this.addClass}
                      style={{ float: "left" }}
                    />
                    <Button
                      text="Remove"
                      onClick={this.remove}
                      style={{ float: "left" }}
                    />
                  </div>
                </div>
              </div>

              <p
                id="addStatus1"
                style={{ color: "red", visibility: this.state.show2 }}
              />
              {/*<div className="mt-4">{table}</div>*/}

              <Link to="course-selection-menu">
                <Button text="Continue" />
              </Link>

              <br />

              <Link to="/build-seq-or-sem">
                <Button text="Main Selector" />
              </Link>

              <Link to="/">
                <Button text="Home Page" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectSemester;
