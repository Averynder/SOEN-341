import React from "react";
import Navbar from "./components/Navbar";
// import SequenceTable1 from "./SequenceTable";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { Modal, Form, FormControl } from "react-bootstrap";
import PdfSequenceGenerator from "./PdfSequenceGenerator";

class DraftSequenceMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear(),
      semester: "Fall",
      show: false,
      show1: false
    };
    this.handleSemester = this.handleSemester.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
  }

  handleSemester(event) {
    this.setState({ semester: event.target.value });
  }
  handleYear(event) {
    this.setState({ year: event.target.value });
  }
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

  render() {
    const currentYear = new Date().getFullYear();
    var yeetus = [];
    for (let i = 0; i < 8; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy => <option>{jimmy}</option>);

    return (
      <div className="container">
        <Navbar />

        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Draft Sequence Menu</h2>
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
            <hr color="#7e1530" />
            {/* ------------------------------------------------------------------------------------------------------ */}
            {/* This is the previous Table that used to be there, just uncomment if u wanna see */}
            {/* <SequenceTable1 year={this.state.year}/> */}
            {/* ------------------------------------------------------------------------------------------------------ */}
            {/* Bellow is the new thing added */}
            <h3>
              The extra useless info can be removed easily, this is just for
              linking purpose.
            </h3>
            <PdfSequenceGenerator />
            {/* ------------------------------------------------------------------------------------------------------ */}

            <hr color="#7E1530" />
            <hr color="#7E1530" />
            <hr color="#7E1530" />
            <hr color="#7E1530" />
            <Button text="Add A Class" onClick={this.handleShow} />
            <Button text="Remove A Class" onClick={this.handleShow1} />
            <Link to="/finalize-export-seq">
              <Button text="Finalize" />
            </Link>
            <Link to="/formalize">
              <Button text="Formalize" />
            </Link>
            <Link to="/build-seq-or-sem">
              <Button text="Back to Main Selector" />
            </Link>
            <Modal show={this.state.show} onHide={this.handleClose}>
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
            </Modal>
            <Modal show={this.state.show1} onHide={this.handleClose1}>
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
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default DraftSequenceMenu;
