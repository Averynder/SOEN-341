import React from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { Modal, Form, FormControl, Table } from "react-bootstrap";
import * as times from "./data/calendar.json";
import * as data from "./data/courses.json";
import { CirclePicker } from "react-color";
import reactCSS from "reactcss";

class CourseSelectionMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.openRubiat = this.openRubiat.bind(this);
    this.closeRubiat = this.closeRubiat.bind(this);
    this.colourRubiatC = this.colourRubiatC.bind(this);
    this.colourRubiatO = this.colourRubiatO.bind(this);

    var year;
    var semester;

    if (
      document.getElementById("semester-year") === null ||
      document.getElementById("semester") === null
    ) {
      year = new Date().getFullYear();
      semester = "Fall";
    } else {
      year = document.getElementById("semester-year").value;
      semester = document.getElementById("semester").value;
    }

    this.state = {
      show: false,
      show1: false,
      rubiat: false,
      colorS: false,
      semester: semester,
      year: year,
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      classes: data.sequence,

      colors: [["red", 0], ["pink", 0], ["green", 0], ["yellow", 0], ["orange", 0], ["blue", 0], ["black", 0]],

      color1: "red",
      color2: "pink",
      color3: "green",
      color4: "yellow",
      color5: "orange",
      color6: "blue",
      color7: "black",

      addedClasses: [],

      courses: data.default.sequence,
      selectedCourses: [],
      show2: "hidden",
      
      colorOfNewClass: []
      
    };
  }

  timeToNum = time => {
    // time parameter represents start time or end time of a class
    for (let i = 0; i < 61; i++)
      if (time === times.time[i].startTime) return times.time[i].num;
    return null;
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose1() {
    this.setState({ show1: false });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  openRubiat() {
    this.setState({
      rubiat: true
    });
  }

  closeRubiat() {
    this.setState({
      rubiat: false
    });
  }

  colourRubiatO() {
    this.setState({
      colorS: true
    });
  }

  colourRubiatC() {
    this.setState({
      colorS: false
    });
  }

  addClass(days_array) {
    document.getElementById("id");
  }

  handleChangeComplete = color => {
    
    let courseNameInput = document.getElementById("colorChanger").value; //Get user input comp248
    let chosenClass; //class object

    for (let i = 0; i < this.state.classes.length; i++) {
      if (courseNameInput === this.state.classes[i].course) {
        chosenClass = this.state.classes[i];
        break;
      }
    }

    document.getElementById(chosenClass.course).style.backgroundColor = color.hex;

    let color1;
    
    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

  for(let j=0; j<chosenClass.days.length; j++) //added
    for (let i = 0; i < 61; i++) {
      let dayOfTheWeek = chosenClass.days[j] + "-";
      if (
        this.timeToNum(chosenClass.startTime) <= i &&
        this.timeToNum(chosenClass.endTime) >= i
      ) {
        color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = color.hex; // (you can choose to select the return of a function)
      }
    }

    for(let k=0; k<chosenClass.ta.length; k++)
      for(let j=0; j<chosenClass.ta[k].days.length; j++){
        let dayOfTheWeek = chosenClass.ta[k].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(chosenClass.ta[k].startTime) <= i &&
            this.timeToNum(chosenClass.ta[k].endTime) >= i
          ) {
            color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = color.hex; // (you can choose to select the return of a function)
          }
        }
      }

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color1) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

  };

  // onAdd = () => {
  //   let input = document.getElementById("add-class").value; //Get user input
  //   let chosenClass;

  //   for (let i = 0; i < this.state.classes.length; i++) {
  //     if (input === this.state.classes[i].course) {
  //       chosenClass = this.state.classes[i];
  //       break;
  //     }
  //   }

  //   if (chosenClass === undefined || chosenClass === null) {
  //     document.getElementById("addStatus").innerHTML = "Invalid Input";
  //     return;
  //   }

  //   this.state.addedClasses.push(chosenClass);

  //   for (let i = 0; i < 61; i++) {
  //     if (
  //       this.timeToNum(chosenClass.startTime) <= i &&
  //       this.timeToNum(chosenClass.endTime) >= i
  //     ) {
  //       document.getElementById("Monday-" + i).style.backgroundColor = this.state.colors[this.state.addedClasses.length - 1]; // (you can choose to select the return of a function)
  //     }
  //   }

  //   this.setState({
  //     show: !this.state.show
  //   });
  // };

  addClass = () => {
    let array = this.state.selectedCourses; //Keep track of user selected classes
    let input = document.getElementById("add-class1").value; //Get user input (Course Code)
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

    

    let n = 1;
    let initial = this.timeToNum(addedClass.startTime);
    let final = this.timeToNum(addedClass.endTime);
    let middle = (initial + final)/2;
    let colorChosen;

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][1] == 0) {
        colorChosen = this.state.colors[j][0];
        this.state.colors[j][1] = 1;
        break;
      }
    }

    if (colorChosen === null || colorChosen === undefined) {
      return;
    }
  
  for(let k=0; k<addedClass.ta.length; k++)
    for(let j=0; j<addedClass.ta[k].days.length; j++){
      let dayOfTheWeek = addedClass.ta[k].days[j] + "-";
      let n = 1;
      let initial = this.timeToNum(addedClass.ta[k].startTime);
      let final = this.timeToNum(addedClass.ta[k].endTime);
      let middle = (initial + final)/2;
      for (let i = 0; i < 61; i++) {
        if (
          this.timeToNum(addedClass.ta[k].startTime) <= i &&
          this.timeToNum(addedClass.ta[k].endTime) >= i
        ) {
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
          if (i === middle - 2) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            n++;
          }else if (i === middle - 1) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].type;
            n++;
          }else if(i === middle){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].startTime;
            n++;
          }
          else if(i === middle + 1){
            document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            n++;
          }
          else if(i === middle + 2){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].endTime;
            n++;
          }else{
            document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
          }
        }
      }
    }
 
    for(let j=0; j<addedClass.days.length; j++){
      for (let i = 0; i < 61; i++) {
        if (
          initial <= i &&
          final >= i
        ) {
          let dayOfTheWeek = addedClass.days[j] + "-"; 
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
          if (i === middle - 1) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            n++;
          }else if(i === middle){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.startTime;
            n++;
          }
          else if(i === middle + 1){
            document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            n++;
          }
          else if(i === middle + 2){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.endTime;
            n++;
          }else{
            document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
          }
        }
      }
    }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors in the selection menu before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o].course).style.backgroundColor;
    }

    oldColors.push(colorChosen); // add the color of new course to the list also
    this.setState({colorOfNewClass: oldColors}) // when rendering the selection menu it will render it with all the old colors + the newly added color

    array.push(addedClass);
    this.setState({
      selectedCourses: array
    });
  };

  remove = () => {
    let coursecode = document.getElementById("add-class1").value;
    let courseToRemove;

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (this.state.selectedCourses[i].course === coursecode) {
        courseToRemove = this.state.selectedCourses[i];
        break;
      }
    }

    

    if (courseToRemove === undefined || courseToRemove === null) {
      document.getElementById("addStatus1").innerHTML = "Invalid Course / Course Not Found";
      this.setState({show2: "visible"})
      return;
    }

    let color;
    
  for(let j=0; j<courseToRemove.days.length; j++)
    for (let i = 0; i < 61; i++) {
      let dayOfTheWeek = courseToRemove.days[j] + "-";
      if (
        this.timeToNum(courseToRemove.startTime) <= i &&
        this.timeToNum(courseToRemove.endTime) >= i
      ) {
        color = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
        document.getElementById(dayOfTheWeek + i).innerHTML = "-----------------";
      }
    }

    for(let k=0; k<courseToRemove.ta.length; k++)
      for(let j=0; j<courseToRemove.ta[k].days.length; j++){
        let dayOfTheWeek = courseToRemove.ta[k].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(courseToRemove.ta[k].startTime) <= i &&
            this.timeToNum(courseToRemove.ta[k].endTime) >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML = "-----------------";
          }
        }
      }
    
    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o].course).style.backgroundColor;
    }

    let oldColorsFiltered = oldColors.filter(data => color !== data); // filter out the color of the course that we just removed

    let array = this.state.selectedCourses.filter(
      data => coursecode !== data.course
    );
    this.setState({
      selectedCourses: array, show2: "hidden"
    });

    for (let p = 0; p < this.state.selectedCourses.length; p++) {// re-assign the old colors to the new table
      document.getElementById(this.state.selectedCourses[p].course).style.backgroundColor = oldColorsFiltered[p];
    }
    
  };

  render() {
    const styles = reactCSS({
      default: {
        popover: {
          position: "fixed",
          top: "23%",
          left: "38%",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    let myAddedClasses = this.state.selectedCourses.map(theClass => (
      <option value={theClass.course}>{theClass.course}</option>
    ));

  

    let i = 0;

    let x = this.state.selectedCourses.map(element => (
      <tr id={element.course} style={{backgroundColor : this.state.colorOfNewClass[i++]}}>
      
        <td>
          <div>
            <input type="checkbox" checked /> &nbsp;
            <strong>{element.course}</strong>
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

    return (
      <div className="container">
        <Navbar />

        <div className="jumbotron j-greetings">
          <h2 className="display-4">Course Selection Menu</h2>
          <hr color="#7e1530" />

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
              <div className="mt-4">{table}</div>
              <hr color="#7e1530" />
          <h2 className="display-5">
            {this.state.semester} {this.state.year} Semester
          </h2>
          <p className="lead" />





          <div>
            {" "}
            {/* Schedule */}
            <Table>
              <tbody>
                <tr>
                  <td>
                    <Table>
                      <tbody>
                        <th>Time</th>

                        <tr>
                          <td>
                            {times.time.map(element => (
                              <div>{element.startTime}</div>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>

                  {this.state.weekdays.map(days => (
                    <td>
                      <table>
                        <tbody>
                          <th>{days}</th>
                          <tr>
                            <td>
                              {times.time.map(element => {
                                let myID = days + "-" + element.num;
                                return (
                                  <div id={myID}>
                                    -----------------
                                  </div>
                                );
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>

          {/* <Button text="Add A Class" onClick={this.handleShow} />
          <Button text="Remove A Class" onClick={this.handleShow1} /> */}
          <Button text="Color Selection" onClick={this.openRubiat} />
          <Link to="/finalize-export-sem">
            <Button text="Finalize" />
          </Link>

          <Link to="/select-semester">
            <Button text="Back To Select Semester" />
          </Link>
        </div>

        {/* <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Add </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <input id="add-class" type="text" />
              <Button type="submit" text="Add Course" onClick={this.onAdd} />
            </Form>
            <p id="addStatus" style={{ color: "red" }} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose}
              text="Close"
            />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
        </Modal> */}

        {/* <Modal show={this.state.show1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Remove A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Remove </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <FormControl
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                style={{ width: "100%", textAlign: "center" }}
              />
              <Button type="submit" text="Remove Course" />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose1}
              text="Close"
            />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
      </Modal> */}

        <Modal show={this.state.rubiat} onHide={this.closeRubiat}>
          <Modal.Header closeButton>
            <Modal.Title>Course Colour Selection</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course and Color </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <div className="container" style={{ width: "40%" }}>
                <select id="colorChanger">
                  {myAddedClasses}
                </select>
              </div>
              <Button text="Color Selection" onClick={this.colourRubiatO} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeRubiat} text="Close" />
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.colorS} onHide={this.colourRubiatC}>
          <Modal.Header closeButton style={{ backgroundColor: "#82100d" }} >
            <Modal.Title>Color Selector</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }} >
            <p style={{ margin: "0px 0px 25% 0px" }}>
              Select a Color for Course (replace with course name)
            </p>
            <Form inline style={{ textAlign: "center" }}>
              <div className="container" style={{ width: "40%" }}>
                <div style={styles.popover}>
                  <CirclePicker
                    style={{ margin: "0px 0px 0px 0px" }}
                    onChangeComplete={this.handleChangeComplete}
    
                  />
                </div>
              </div>
            </Form>
          </Modal.Body>
          
          <Modal.Footer style={{ backgroundColor: "#82100d" }}>
            <Button
              variant="primary"
              onClick={this.colourRubiatC}
              text="Close"
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CourseSelectionMenu;
