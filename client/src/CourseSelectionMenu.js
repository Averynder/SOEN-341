import React from "react"
import Navbar from "./components/Navbar"
import SequenceTable1 from "./SequenceTable"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import {Modal, Form, FormControl} from "react-bootstrap"


class CourseSelectionMenu extends React.Component{
  constructor(props,context){
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);

    this.state = {
      show: false,
      show1: false,
    };
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

  render(){
    let year;
    let semester;

    if(document.getElementById('semester-year') === null || document.getElementById('semester') === null){
      year = (new Date()).getFullYear();
      semester = "Fall";
    } else{
      year = document.getElementById('semester-year').value;
      semester = document.getElementById('semester').value;
    }

    return(
      <div className="container">
        <Navbar />
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Course Selection Menu</h2>
            <hr color="#7e1530"/>
            <h2 className="display-5">{semester} {year} Semester</h2>
            <p className="lead"></p>
            <SequenceTable1 year={year}/>
            <Button text="Add A Class" onClick={this.handleShow}/>
            <Button text="Remove A Class" onClick={this.handleShow1}/>
            <Link to="/finalize-export-sem">
              <Button text="Finalize" />
            </Link>

            <Link to="/select-semester">
              <Button text="Back To Select Semester" />
            </Link>


          </div>


        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
              <p>Select A Course You'd Like To Add </p> <br />
              <Form inline style={{textAlign: "center"}}>
                  <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                <Button type="submit" text="Add Course"/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} text="Close" />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Remove A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
              <p>Select A Course You'd Like To Remove </p> <br />
              <Form inline style={{textAlign: "center"}}>
                  <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                <Button type="submit" text="Remove Course"/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose1} text="Close" />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default CourseSelectionMenu
