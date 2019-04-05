import React from "react";
// import SequenceTable1 from "./SequenceTable";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { Modal, Form, FormControl } from "react-bootstrap";
import PdfSequenceGenerator from "./pdfSequenceGenerator";

class DraftSequenceMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showYearPicker: false,
      startingYear: new Date().getFullYear(),
      numberOfYear: 5
      // year: new Date().getFullYear(),
      // semester: "Fall",
      // show: false,
      // show1: false
    };
    // this.handleSemester = this.handleSemester.bind(this);
    // this.handleYear = this.handleYear.bind(this);
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.handleShow1 = this.handleShow1.bind(this);
    // this.handleClose1 = this.handleClose1.bind(this);
  }

  handleStartingYear = () => {
    this.setState({
      showYearPicker: true
    });
  };

  // handleSemester(event) {
  //   this.setState({ semester: event.target.value });
  // }
  // handleYear(event) {
  //   this.setState({ year: event.target.value });
  // }
  // handleClose() {
  //   this.setState({ show: false });
  // }

  // handleShow() {
  //   this.setState({ show: true });
  // }

  // handleClose1() {
  //   this.setState({ show1: false });
  // }

  // handleShow1() {
  //   this.setState({ show1: true });
  // }

  render() {
    const currentYear = new Date().getFullYear();
    var yeetus = [];
    for (let i = 0; i < 8; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy => <option value={jimmy}>{jimmy}</option>);

    let theStartingYear = this.state.startingYear;

    var arr = [];
    for (let i = 0; i < this.state.numberOfYear; i++) {
      arr[i] = parseInt(theStartingYear) + i;
    }

    let theSequence = arr.map(index => (
      <PdfSequenceGenerator id={"divToPrint" + index} year={index} />
    ));

    // for (let i = 0; i < this.state.numberOfYear; i++) {
    //   theSequence += (
    //     <PdfSequenceGenerator year={parseInt(theStartingYear) + i} />
    //   );
    // }

    return (
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            {/* <h2 className="display-4">Draft Sequence Menu</h2>
            <hr color="#7e1530" />
            <div style={{ textAlign: "center" }}>
              <Form>
                <div className="form-group">
                  <label for="semester">
                    <h5>Select Semester</h5>
                  </label>
                  <select
                    id="semester"
                    className="custom-select"
                    value={this.state.semester}
                    onChange={this.handleSemester}
                  >
                    <option>Fall</option>
                    <option>Winter</option>
                    <option>Summer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="semester-year">
                    <h5>Select Year</h5>
                  </label>
                  <select
                    id="semester-year"
                    className="custom-select"
                    value={this.state.year}
                    onChange={this.handleYear}
                  >
                    {years}
                  </select>
                </div>
              </Form>

              <br />
              <br />
              <br />
            </div>
            <h2 className="display-5">
              {this.state.semester} {this.state.year} Semester
            </h2>
            <hr color="#7e1530" />
            <hr color="#7e1530" />
            <hr color="#7e1530" />
            <hr color="#7e1530" /> */}
            {/* ------------------------------------------------------------------------------------------------------ */}
            {/* This is the previous Table that used to be there, just uncomment if u wanna see */}
            {/* <SequenceTable1 year={this.state.year}/> */}
            {/* ------------------------------------------------------------------------------------------------------ */}
            {/* Bellow is the new thing added */}
            {/* <h3>
              The extra useless info can be removed easily, this is just for
              linking purpose.
            </h3> */}
            <h2 className="display-4">Sequence To PDF</h2>
            <h2>Starting at Year {theStartingYear}</h2>
            <hr color="#7e1530" />
            <Button text="Options" onClick={this.handleStartingYear} />
            <p className="lead">
              Click Add Course and try out COMP248, COMP232, SOEN228 or ENGR213
              to test it out.
              <br />
              <br />
              These 4 classes are only available because this is a test. The
              real json file with all the classes can easily be substituted
              later.
            </p>
            {theSequence}
            {/* <PdfSequenceGenerator year={theStartingYear} />
            <PdfSequenceGenerator year={parseInt(theStartingYear) + 1} />
            <PdfSequenceGenerator year={parseInt(theStartingYear) + 2} />
            <PdfSequenceGenerator year={parseInt(theStartingYear) + 3} />
            <PdfSequenceGenerator year={parseInt(theStartingYear) + 4} /> */}
            {/* ------------------------------------------------------------------------------------------------------ */}

            {/* <hr color="#7E1530" />
            <hr color="#7E1530" />
            <hr color="#7E1530" />
            <hr color="#7E1530" /> */}
            {/* <Button text="Add A Class" onClick={this.handleShow} /> */}
            {/* <Button text="Remove A Class" onClick={this.handleShow1} /> */}
            <Link to="/finalize-export-seq">
              <Button text="Finalize" />
            </Link>
            <Link to="/formalize">
              <Button text="Formalize" />
            </Link>
            <Link to="/build-seq-or-sem">
              <Button text="Back to Main Selector" />
            </Link>
            {/* <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add A Course</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: "center" }}>
                <p>Select A Course You'd Like To Add </p> <br />
                <Form inline style={{ textAlign: "center" }}>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    style={{ width: "100%", textAlign: "center" }}
                  />
                  <Button type="submit" text="Add Course" />
                </Form>
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
            <Modal show={this.state.showYearPicker}>
              <Modal.Header>
                <Modal.Title>Configuration</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: "center" }}>
                Starting year:&nbsp;<select id="select-year">{years}</select>
                <br />
                <br />
                Nb of years needed:&nbsp;
                <select id="select-nb-year">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <p id="removeStatus" style={{ color: "red" }} />
                <Button
                  type="submit"
                  text="Confirm"
                  onClick={() => {
                    let dooks = document.getElementById("select-year").value; //selected year
                    let bob = document.getElementById("select-nb-year").value; //number of years shown
                    this.setState({
                      startingYear: dooks,
                      numberOfYear: bob,
                      showYearPicker: false
                    });
                  }}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default DraftSequenceMenu;
