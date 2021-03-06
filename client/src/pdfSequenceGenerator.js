import React from "react";
import * as data from "./data/courses.json";
import * as jsPDF from "jspdf";
import { Table, Modal, Container, Row, Col } from "react-bootstrap";
import Button from "./components/Button";
import * as html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class PdfSequenceGenerator extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      courses: data.default.sequence,
      selectedCoursesFall: [],
      selectedCoursesWinter: [],
      selectedCoursesSummer: [],
      showAdd: false,
      showRemove: false,
      modify: false,
      year: new Date().getFullYear(),
      numberOfDisplayedSemesters: 3,
      semesterDisplay: null, //holds the code for the Container tag #divtoprint
      semesterArray: null, //Holds the Col tags
    };
  }

  loggedIn = () => {
    return this.props.data.names !== null;
  }

  convertToPDF = () => {
    const input = document.getElementById("divToPrint" + this.props.year);
    const dummies = document.getElementsByClassName("dummyRow");

    //This block below formats the div-to-print properly so it is sized correctly on the pdf
    [].forEach.call(dummies, row => {
      row.style.display = "none";
    });
    const tableCols = document.getElementsByClassName("tableCol");
    [].forEach.call(tableCols, tableCol => {
      tableCol.classList.add("col-md-12");
    });
    const reduce = document.querySelectorAll("table, #pdfTable");
    [].forEach.call(reduce, col => {
      col.style.width = "606px";
    });
    document.getElementById("soen341").style.width = "896px";
    //End of formatting code

    html2canvas(input, {
      dpi: 9000, //supposed to make it less blurry on retina
      scale: 1.2 //approximately fills the width of pdf page with the sequence table
    })
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.output("/jimmyTest.pdf");
        pdf.save("jimmyTest.pdf");
      })
      .then(() => {
        //This then() call will put back the div-to-print to its original size
        [].forEach.call(dummies, row => {
          row.style.display = "contents";
        });
        [].forEach.call(tableCols, tableCol => {
          tableCol.classList.remove("col-md-12");
        });
        [].forEach.call(reduce, col => {
          col.style.width = "100%";
        });
        //document.getElementById("soen341").style.width = "100%";
      });
  };

  /*
   * Move a draggable from one droppable to another.
   */
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1); // replace 1 element at droppableSource.index with nothing (remove it)

    var inOtherSemester = destination.some(course => {
      return course.course === removed.course;
    });

    if (inOtherSemester) {
      return;
    }

    destClone.splice(droppableDestination.index, 0, removed); // remove no element at droppableDestination.index and add removed (add)

    let result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1); // remove 1 element at startIndex and replace with nothing
    result.splice(endIndex, 0, removed); // remove no element at endIndex and add removed

    return result;
  };

  getRowStyle = (isDragging, draggableStyle) => ({
    //background: isDragging? 'rgb(92, 96, 101, 0.8)': '#212529',
    //display: isDragging? 'table':'block',

    ...draggableStyle
  });

  getTableStyle = isDraggingOver => ({
    //Change table properties during drag
    //background: isDraggingOver? 'blue': 'red'
  });

  offeredIn = (semester, course) => {

    return new Promise((resolve, reject) => {
      fetch('/semesters/' + course)
        .then(res => res.json())
        .then(semesters => resolve(semesters.includes(semester)));
    });
  }

  verifyPrereqs = (semester, check) => {
    let dependents = [];
    let fall = this.state.selectedCoursesFall;
    let winter = this.state.selectedCoursesWinter;
    let summer = this.state.selectedCoursesSummer;

    // see if check is a prereq to present courses or if check has prereq already present
    [fall, winter, summer].forEach(semester => {
      semester.forEach(course => {
        if (this.isPrereqTo(course, check)) dependents.push({ course: course.course, prereq: check.course});
        else if (this.isPrereqTo(check, course)) dependents.push({ course: check.course, prereq: course.course});
      });
    });
    let messageElem = document.getElementById('infoMessage' + this.props.year);
    console.log(dependents);
    if (dependents.length > 0) {
      let str = "";
      dependents.forEach(duo => {
        str += duo.prereq + " is a prereq to " + duo.course + "<br />";
      });
        messageElem.innerHTML = str;
    } else {
      messageElem.innerHTML = '';
    }
  }

  isPrereqTo = (course, maybePrereq) => {
    let prereqs = course["prerequisites"].match(/\w{4}\s?\d{3}/g);
    if (prereqs) {
      let name = maybePrereq.course;
      let subject = name.substring(0, 4);
      let classNum = name.slice(4);
      let addSpace = subject + ' ' + classNum;
      let noSpace = subject + classNum;
      let isPrereq = prereqs.includes(addSpace) || prereqs.includes(noSpace);
      return isPrereq;
    } else {
      return false;
    }
  }

  getSemFromClass = semClass => {
    return semClass.substr(15); // remove selectedCourses from semester string
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside a droppable element
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      let messageElem = document.getElementById('infoMessage' + this.props.year);
      const items = this.reorder(
        this.state[source.droppableId],
        source.index,
        destination.index
      );

      this.setState({
        [source.droppableId]: items
      });

      messageElem.innerHTML = '';
    } else {
      let movingCourse = this.state[source.droppableId][source.index];
      let semester = this.getSemFromClass(destination.droppableId);
      this.offeredIn(semester, movingCourse.course) // e.g. canMove("Winter", "SOEN341")
        .then(canMove => {
          let falltable = document.getElementById('fallTable');
          let wintertable = document.getElementById('winterTable');
          let summertable = document.getElementById('summerTable');
          let messageElem = document.getElementById('infoMessage' + this.props.year);
          if (canMove) {
            this.verifyPrereqs(semester, movingCourse);
            const moved = this.move(
              this.state[source.droppableId],
              this.state[destination.droppableId],
              source,
              destination
            );

            if (!moved) {
              return;
            }

            this.setState({
                [source.droppableId]: moved[source.droppableId],
                [destination.droppableId]: moved[destination.droppableId]
              }, () => this.bootlegUpdateSettings(falltable, wintertable, summertable)
            );
          } else {
            messageElem.innerHTML = 'Course not offered in this semester!';
          }
        });
    }
  };


  // FUNCTIONS() HERE *********************************************************
  addClass = (falltable, wintertable, summertable) => {
    let fall = this.state.selectedCoursesFall; //Keep track of user selected classes for Fall
    let winter = this.state.selectedCoursesWinter; //Keep track of user selected classes for Winter
    let summer = this.state.selectedCoursesSummer; //Keep track of user selected classes for Summer
    let input = document.getElementById("add-class").value; //Get user input
    let classList = this.props.data.catalog; //Gets the whole list of courses of concordia
    let errorMessage = document.getElementById("addStatus");
    let semester = document.getElementById("semester").value;

    let classFound;
    // already added
    [fall, winter, summer].forEach(semester => {
      semester.forEach(course => {
        if (course.course === input) {
          classFound = course;
        }
      });
    });

    // exists
    if (!classFound) {
      let validClass;
      classList.forEach(course => {
        if (course.course === input) {
          validClass = course;
        }
      });

      if (validClass) {
        let name = input;
        let subject = name.substring(0, 4);
        let classNum = name.slice(4);
        let addSpace = subject + ' ' + classNum;
        if (this.loggedIn() && this.props.data.names.includes(addSpace)) {
          errorMessage.innerHTML = 'You have already taken this class!';
        } else {
          fetch('/semesters/' + input)
            .then(res => res.json())
            .then(semesters => {
              if (!semesters.includes(semester)) {
                errorMessage.innerHTML = "This class is not offered in this semester!";
              } else {
                let sel = "selectedCourses" + semester;
                this.verifyPrereqs(semester, validClass);
                this.setState({
                  [sel]: [...this.state[sel], validClass],
                  showAdd: !this.state.showAdd
                }, () => this.bootlegUpdateSettings(falltable, wintertable, summertable));
              }
            });
        }
      } else {
        errorMessage.innerHTML = "Invalid Class/Class Not Found";
      }
    } else {
      errorMessage.innerHTML = "You have already added this class";
    }

    let totalNumberOfClasses = //Damn I really forgot why we need this
      this.state.selectedCoursesFall.length +
      this.state.selectedCoursesSummer.length +
      this.state.selectedCoursesWinter.length;

    let yeetus = [];
    for (let i = 0; i < 6; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = new Date().getFullYear() + i;
    }
    const years = yeetus.map(jimmy => <option value={jimmy}>{jimmy}</option>);
  };

  removeClass = (falltable, wintertable, summertable) => {
    let fall = this.state.selectedCoursesFall; //Keep track of user selected classes for Fall
    let winter = this.state.selectedCoursesWinter; //Keep track of user selected classes for Winter
    let summer = this.state.selectedCoursesSummer; //Keep track of user selected classes for Summer
    let removedFallClass = document.getElementById("select-remove-fall"); //selected value from drop down
    let removedWinterClass = document.getElementById("select-remove-winter"); //selected value from drop down
    let removedSummerClass = document.getElementById("select-remove-summer"); //selected value from drop down
    if (removedFallClass === null) {
      this.setState({
        showRemove: !this.state.showRemove
      });
      return;
    }
    if (
      removedFallClass.value === "Select A Class..." &&
      removedWinterClass.value === "Select A Class..." &&
      removedSummerClass.value === "Select A Class..."
    ) {
      document.getElementById("removeStatus").innerHTML =
        "You have not selected anything.";
      return;
    }
    let messageElem = document.getElementById('infoMessage' + this.props.year);
    messageElem.innerHTML = '';
    fall = fall.filter(element => element.course !== removedFallClass.value); //Remove json course object from fall array
    winter = winter.filter(
      element => element.course !== removedWinterClass.value
    ); //Remove json course object from winter array
    summer = summer.filter(
      element => element.course !== removedSummerClass.value
    ); //Remove json course object from summer array
    this.setState({
      selectedCoursesFall: fall,
      selectedCoursesWinter: winter,
      selectedCoursesSummer: summer,
      showRemove: !this.state.showRemove
    }, () => this.bootlegUpdateSettings(falltable, wintertable, summertable));
  };

  updateSettings = (falltable, wintertable, summertable) => {
    let semesterArray = []; //this.state.semesterDisplay will take on this value
    let fallRemove = 0;
    let winterRemove = 0;
    let summerRemove = 0;
    if (document.getElementById("fallSetting")) {
      fallRemove =
        document.getElementById("fallSetting").value === "Remove" ? 1 : 0; //if removed, set 1 else 0
      winterRemove =
        document.getElementById("winterSetting").value === "Remove" ? 1 : 0;
      summerRemove =
        document.getElementById("summerSetting").value === "Remove" ? 1 : 0;
    }

    const numberOfSemesters = 3 - fallRemove - winterRemove - summerRemove; //Number of semester visible for the year
    const division = numberOfSemesters === 0 ? 12 : 12 / numberOfSemesters; //The number used for the md attribute
    const newID = "mt-" + division; //New id of the <Container />

    let fall = {
      semester: "Fall",
      code: (
        <Col className="tableCol" md={division}>
          <p style={{ textAlign: "center" }}>Fall</p>
          {falltable}
        </Col>
      )
    };

    let winter = {
      semester: "Winter",
      code: (
        <Col className="tableCol" md={division}>
          <p style={{ textAlign: "center" }}>Winter</p>
          {wintertable}
        </Col>
      )
    };

    let summer = {
      semester: "Summer",
      code: (
        <Col className="tableCol" md={division}>
          <p style={{ textAlign: "center" }}>Summer</p>
          {summertable}
        </Col>
      )
    };

    if (fallRemove === 0) semesterArray.push(fall);
    if (winterRemove === 0) semesterArray.push(winter);
    if (summerRemove === 0) semesterArray.push(summer);

    let result = (
      <Container className={newID} id={"divToPrint" + this.props.year}>
        <Row>{semesterArray.map(element => element.code)}</Row>
      </Container>
    );

    this.setState({
      semesterDisplay: result,
      semesterArray: semesterArray,
      year: document.getElementById("settingYear").value
    });
  };

  bootlegUpdateSettings = (falltable, wintertable, summertable) => {
    //this just updates the tables
    let semesterArray = this.state.semesterArray
      ? this.state.semesterArray
      : [
          {
            semester: "Fall",
            code: (
              <Col className="tableCol" md={4}>
                <p style={{ textAlign: "center" }}>Fall</p>
                {falltable}
              </Col>
            )
          },
          {
            semester: "Winter",
            code: (
              <Col className="tableCol" md={4}>
                <p style={{ textAlign: "center" }}>Winter</p>
                {wintertable}
              </Col>
            )
          },
          {
            semester: "Summer",
            code: (
              <Col className="tableCol" md={4}>
                <p style={{ textAlign: "center" }}>Summer</p>
                {summertable}
              </Col>
            )
          }
        ]; //contains code for Col tags
    let newArray = []; //New col tags array

    semesterArray.forEach(element => {
      if (element.semester === "Fall") {
        element.code = (
          <Col className="tableCol" md={12 / semesterArray.length}>
            <p style={{ textAlign: "center" }}>Fall</p>
            {falltable}
          </Col>
        );

        newArray.push(element);
      }

      if (element.semester === "Winter") {
        element.code = (
          <Col className="tableCol" md={12 / semesterArray.length}>
            <p style={{ textAlign: "center" }}>Winter </p>
            {wintertable}
          </Col>
        );

        newArray.push(element);
      }

      if (element.semester === "Summer") {
        element.code = (
          <Col className="tableCol" md={12 / semesterArray.length}>
            <p style={{ textAlign: "center" }}>Summer</p>
            {summertable}
          </Col>
        );

        newArray.push(element);
      }
    });

    let newID = "mt-" + 12 / newArray.length;

    let result = (
      <Container className={newID} id={"divToPrint" + this.props.year}>
        <Row>{newArray.map(element => element.code)}</Row>
      </Container>
    );

    this.setState({
      semesterDisplay: result,
      semesterArray: newArray
    });
  };

  // RENDER() HERE *********************************************************
  removeSemester = () => {
    let year = document.getElementById('settingYear').value;
    let removeFall = document.getElementById('fallSetting').value === 'Remove'? true: false;
    let removeWinter = document.getElementById('winterSetting').value === 'Remove'? true: false;
    let removeSummer = document.getElementById('summerSetting').value === 'Remove'? true: false;

    if (removeFall) {
      let toRemove = document.getElementsByClassName('fall' + year);
      if (toRemove) {
        let child = toRemove[0];
        if (child) {
          child.parentNode.removeChild(child);
        }
      }
    }
    if (removeWinter) {
      let toRemove = document.getElementsByClassName('winter' + year);
      if (toRemove) {
        let child = toRemove[0];
        if (child) {
          child.parentNode.removeChild(child);
        }
      }
    }
    if (removeSummer) {
      let toRemove = document.getElementsByClassName('summer' + year);
      if (toRemove) {
        let child = toRemove[0];
        if (child) {
          child.parentNode.removeChild(child);
        }
      }
    }
  }

  render() {
    console.log('RE-RENDERING');
    let falltable = (
      <Table id="pdfTable fallTable" className={"fall" + this.state.year} striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <Droppable droppableId="selectedCoursesFall">
          {(provided, snapshot) => (
            <tbody
              provided={provided}
              style={this.getTableStyle(snapshot.isDraggingOver)}
              ref={provided.innerRef}
            >
              {this.state.selectedCoursesFall.map((course, index) => (
                <Draggable
                  key={"key" + index}
                  draggableId={"f" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <tr
                      style={this.getRowStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={"dragCourse"}
                      provided={provided}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{course.course}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.credits}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              <tr className={"dummyRow"}>
                <td>---</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>
          )}
        </Droppable>
      </Table>
    );

    let wintertable = (
      <Table id="pdfTable winterTable" className={"winter" + this.state.year} striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <Droppable droppableId="selectedCoursesWinter">
          {(provided, snapshot) => (
            <tbody
              provided={provided}
              style={this.getTableStyle(snapshot.isDraggingOver)}
              ref={provided.innerRef}
            >
              {this.state.selectedCoursesWinter.map((course, index) => (
                <Draggable
                  key={"key" + index}
                  draggableId={"w" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <tr
                      style={this.getRowStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={"dragCourse"}
                      provided={provided}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{course.course}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.credits}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              <tr className={"dummyRow"}>
                <td>---</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>
          )}
        </Droppable>
      </Table>
    );

    let summertable = (
      <Table id="pdfTable summerTable" className={"summer" + this.state.year} striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Course</th>
            <th>Class Name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <Droppable droppableId="selectedCoursesSummer">
          {(provided, snapshot) => (
            <tbody
              provided={provided}
              style={this.getTableStyle(snapshot.isDraggingOver)}
              ref={provided.innerRef}
            >
              {this.state.selectedCoursesSummer.map((course, index) => (
                <Draggable
                  key={"key" + index}
                  draggableId={"s" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <tr
                      style={this.getRowStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={"dragCourse"}
                      provided={provided}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{course.course}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.credits}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              <tr className={"dummyRow"}>
                <td>---</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>
          )}
        </Droppable>
      </Table>
    );

    let removeOptions = (
      <Table striped border hover>
        <tr>
          <td>Fall</td>
          <td>Winter</td>
          <td>Summer</td>
        </tr>

        <tr>
          <td>
            <select id="select-remove-fall">
              <option>Select A Class...</option>
              {this.state.selectedCoursesFall.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>

          <td>
            <select id="select-remove-winter">
              <option>Select A Class...</option>
              {this.state.selectedCoursesWinter.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>

          <td>
            <select id="select-remove-summer">
              <option>Select A Class...</option>
              {this.state.selectedCoursesSummer.map(element => (
                <option value={element.course}>{element.course}</option>
              ))}
            </select>
          </td>
        </tr>
      </Table>
    );

    let totalNumberOfClasses =
      this.state.selectedCoursesFall.length +
      this.state.selectedCoursesSummer.length +
      this.state.selectedCoursesWinter.length;

    let yeetus = [];
    for (let i = 0; i < 6; i++) {
      /*Basically choose a year from current year up to 6 years later. Don't touch this*/
      yeetus[i] = new Date().getFullYear() + i;
    }
    const years = yeetus.map(jimmy => <option value={jimmy}>{jimmy}</option>);

    let semesterDisplay = (
      <Row>
        <Col className="tableCol" md={4}>
          <p style={{ textAlign: "center" }}>Fall</p>
          {falltable}
        </Col>

        <Col className="tableCol" md={4}>
          <p style={{ textAlign: "center" }}>Winter </p>
          {wintertable}
        </Col>

        <Col className="tableCol" md={4}>
          <p style={{ textAlign: "center" }}>Summer</p>
          {summertable}
        </Col>
      </Row>
    );

    /**************************************** JSX here *******************************************************/

    return (
      <div className="container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div
            style={{ padding: "4rem 1rem" }}
            className="jumbotron j-greetings"
            id="soen341"
          >
            <h3>Year {this.props.year}</h3>
            <Container className="mt-4" id={"divToPrint"+ this.props.year}>
                <Row>
                  <Col className="tableCol" md={4}>
                  Fall
                  {falltable}
                </Col>
                <Col className="tableCol" md={4}>
                  Winter
                  {wintertable}
                </Col>
                <Col className="tableCol" md={4}>
                  Summer
                  {summertable}
                </Col>
              </Row>
            </Container>

            {/*<div id={"divToPrint" + this.props.year}>
              <h3>Year {this.props.year}</h3>
              <br />

              {this.state.semesterDisplay ? (
                <Container className="mt-4">
                  <Row>{this.state.semesterDisplay}</Row>
                </Container>
              ) : (
                <Container className="mt-4">{semesterDisplay}</Container>
              ) }
              </div>
            {*/}

            <table style={{ marginLeft: "auto", marginRight: "auto" }}>
              <tr>
                <td>
                  <Button
                    text="+"
                    onClick={() => {
                      this.setState({ showAdd: !this.state.showAdd });
                    }}
                  />
                </td>
                <td>
                  <Button
                    text="-"
                    onClick={() => {
                      this.setState({ showRemove: !this.state.showRemove });
                    }}
                  />
                </td>
                <td>
                  <Button id="mb5" text="PDF" onClick={this.convertToPDF} />
                </td>
              </tr>
            </table>
            <Button
              text="Sequence Settings"
              onClick={() => this.setState({ modify: !this.state.modify })}
            />
            <div style={{ background: 'yellow' }} id={ this.props.year? 'infoMessage' + this.props.year: 'infoMessage' }></div>
          </div>
        </DragDropContext>

        <Modal
          show={this.state.showAdd}
          onHide={() => {
            this.setState({ showAdd: !this.state.showAdd });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Add </p> <br />
            <input id="add-class" type="text" />
            <select id="semester">
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Summer">Summer</option>
            </select>
            <p id="addStatus" style={{ color: "red" }} />
            <Button
              type="submit"
              text="Add Course"
              onClick={() => this.addClass(falltable, wintertable, summertable)}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showRemove}
          onHide={() => {
            this.setState({ showRemove: !this.state.showRemove });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Remove </p> <br />
            {totalNumberOfClasses === 0 ? (
              <p>No Classes Have Been Added Yet</p>
            ) : (
              removeOptions
            )}
            <p id="removeStatus" style={{ color: "red" }} />
            <Button
              type="submit"
              text="Remove Course"
              onClick={() =>
                this.removeClass(falltable, wintertable, summertable)
              }
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.modify}
          onHide={() => this.setState({ modify: !this.state.modify })}
        >
          <Modal.Header>
            <Modal.Title>Sequence Settings</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ textAlign: "center" }}>
            <Container className="mt-3">
              <Row>
                <Col md={3}>
                  Choose Year
                  <br />
                  <br />
                  <select id="settingYear" style={{ width: "100%" }}>
                    <option>{this.state.year}</option>
                    {years}
                  </select>
                </Col>

                <Col md={3}>
                  Fall Semester
                  <br />
                  <select id="fallSetting" style={{ width: "100%" }}>
                    <option value="Keep">Keep</option>
                    <option value="Remove">Remove</option>
                  </select>
                </Col>

                <Col md={3}>
                  Winter Semester
                  <br />
                  <select id="winterSetting" style={{ width: "100%" }}>
                    <option value="Keep">Keep</option>
                    <option value="Remove">Remove</option>
                  </select>
                </Col>

                <Col md={3}>
                  Summer Semester
                  <br />
                  <select id="summerSetting" style={{ width: "100%" }}>
                    <option value="Keep">Keep</option>
                    <option value="Remove">Remove</option>
                  </select>
                </Col>
              </Row>
            </Container>

            <Button
              text="Apply Settings"
              onClick={() =>
                this.removeSemester()
              }
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default PdfSequenceGenerator;
