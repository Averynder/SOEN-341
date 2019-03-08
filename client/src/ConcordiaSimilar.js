import React from "react";
import Navbar from "./components/Navbar";
import * as data from "./data/courses.json";
import { Table } from "react-bootstrap";
import Button from "./components/Button";

class ConcordiaSimilar extends React.Component {
  constructor() {
    super();

    this.state = {
      courses: data.default.sequence,
      selectedCourses: [],
      show: "hidden"
    };
  }

  addClass = () => {
    let array = this.state.selectedCourses; //Keep track of user selected classes
    let input = document.getElementById("add-class").value; //Get user input
    let classList = this.state.courses; //Gets the whole list of courses of concordia
    let addedClass;
    let classExists = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].course === input) {
        for (let j = 0; j < this.state.selectedCourses.length; j++) {
          if (this.state.selectedCourses[j].course === input) {
            document.getElementById("addStatus").innerHTML =
              "This class is already added.";
            this.setState({ show: "visible" });
            return;
          }
        }
        addedClass = classList[i];
        classExists = true;
        this.setState({ show: "hidden" });
        break;
      }
    }
    if (classExists === false) {
      document.getElementById("addStatus").innerHTML =
        "Invalid Class/Class Not Found";
      this.setState({ show: "visible" });
      return;
    }
    array.push(addedClass);
    this.setState({
      selectedCourses: array
    });
  };

  remove = () => {
    let coursecode = document.getElementById('add-class').value;
    let array = this.state.selectedCourses.filter(data => coursecode !== data.course);
    this.setState({
      selectedCourses: array
    })
  }

  render() {
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
      >{x}
      </Table>
    );

    let allOptions = this.state.courses.map(choice => (
      <option value={choice.course} />
    ));

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Concordia Look-Alike Page</h2>
            <hr color="#7e1530" />
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
                  <label for="add-class">
                    <h6 id="test">Select Course</h6>
                  </label>
                  <input
                    type="text"
                    list="add-class1"
                    id="add-class"
                    className="btn btn-dark"
                    placeholder="Course Number"
                  />
                  <datalist id="add-class1">{allOptions}</datalist>
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
              id="addStatus"
              style={{ color: "red", visibility: this.state.show }}
            />
            <div className="mt-4">{table}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcordiaSimilar;
