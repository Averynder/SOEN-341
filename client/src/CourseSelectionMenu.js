import React from "react"
import Navbar from "./components/Navbar"
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
    this.addClass = this.addClass.bind(this);

    var year;
    var semester;

    if(document.getElementById('semester-year') === null || document.getElementById('semester') === null){
      year = (new Date()).getFullYear();
      semester = "Fall";
    } else{
      year = document.getElementById('semester-year').value;
      semester = document.getElementById('semester').value;
    }

    this.state = {
      show: false,
      show1: false,
      semester: semester,
      year: year,
      testCourse: {
        name: "SOEN341",
        credit: 3
      }
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

  addClass(jsonObject) {
    jsonObject = this.state.testCourse;
    let course = jsonObject;
    document.getElementById('addStatus').innerHTML = "";

    if(this.state.semester === "Fall"){
      if(document.getElementById('fall-class1').innerHTML === ""){
        document.getElementById('fall-class1').innerHTML = course.name;
        document.getElementById('fall-credit1').innerHTML = course.credit;
      }else if(document.getElementById('fall-class2').innerHTML === ""){
        document.getElementById('fall-class2').innerHTML = course.name;
        document.getElementById('fall-credit2').innerHTML = course.credit;
      }else if(document.getElementById('fall-class3').innerHTML === ""){
        document.getElementById('fall-class3').innerHTML = course.name;
        document.getElementById('fall-credit3').innerHTML = course.credit;
      }else if(document.getElementById('fall-class4').innerHTML === ""){
        document.getElementById('fall-class4').innerHTML = course.name;
        document.getElementById('fall-credit4').innerHTML = course.credit;
      }else if(document.getElementById('fall-class5').innerHTML === ""){
        document.getElementById('fall-class5').innerHTML = course.name;
        document.getElementById('fall-credit5').innerHTML = course.credit;
      }else if(document.getElementById('fall-class6').innerHTML === ""){
        document.getElementById('fall-class6').innerHTML = course.name;
        document.getElementById('fall-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes."
      }
    }

    if (this.state.semester === "Winter") {
      if(document.getElementById('winter-class1').innerHTML === ""){
        document.getElementById('winter-class1').innerHTML = course.name;
        document.getElementById('winter-credit1').innerHTML = course.credit;
      }else if(document.getElementById('winter-class2').innerHTML === ""){
        document.getElementById('winter-class2').innerHTML = course.name;
        document.getElementById('winter-credit2').innerHTML = course.credit;
      }else if(document.getElementById('winter-class3').innerHTML === ""){
        document.getElementById('winter-class3').innerHTML = course.name;
        document.getElementById('winter-credit3').innerHTML = course.credit;
      }else if(document.getElementById('winter-class4').innerHTML === ""){
        document.getElementById('winter-class4').innerHTML = course.name;
        document.getElementById('winter-credit4').innerHTML = course.credit;
      }else if(document.getElementById('winter-class5').innerHTML === ""){
        document.getElementById('winter-class5').innerHTML = course.name;
        document.getElementById('winter-credit5').innerHTML = course.credit;
      }else if(document.getElementById('winter-class6').innerHTML === ""){
        document.getElementById('winter-class6').innerHTML = course.name;
        document.getElementById('winter-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes.";
      }
    }

    if (this.state.semester === "Summer") {
      if(document.getElementById('summer-class1').innerHTML === ""){
        document.getElementById('summer-class1').innerHTML = course.name;
        document.getElementById('summer-credit1').innerHTML = course.credit;
      }else if(document.getElementById('summer-class2').innerHTML === ""){
        document.getElementById('summer-class2').innerHTML = course.name;
        document.getElementById('summer-credit2').innerHTML = course.credit;
      }else if(document.getElementById('summer-class3').innerHTML === ""){
        document.getElementById('summer-class3').innerHTML = course.name;
        document.getElementById('summer-credit3').innerHTML = course.credit;
      }else if(document.getElementById('summer-class4').innerHTML === ""){
        document.getElementById('summer-class4').innerHTML = course.name;
        document.getElementById('summer-credit4').innerHTML = course.credit;
      }else if(document.getElementById('summer-class5').innerHTML === ""){
        document.getElementById('summer-class5').innerHTML = course.name;
        document.getElementById('summer-credit5').innerHTML = course.credit;
      }else if(document.getElementById('summer-class6').innerHTML === ""){
        document.getElementById('summer-class6').innerHTML = course.name;
        document.getElementById('summer-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes."
      }
    }

  }

  render(){
    return(
      <div className="container">
        <Navbar />

        <div className="jumbotron j-greetings">
          <h2 className="display-4">Course Selection Menu</h2>
          <hr color="#7e1530"/>
          <h2 className="display-5">{this.state.semester} {this.state.year} Semester</h2>
          <p className="lead"></p>

          <table className="SequenceTable1" border="1px">
            <tr>
              <th colSpan="9">
                <h2>{this.state.year}</h2>
              </th>
            </tr>

            <tr>
              <th>Term</th>
              <th className="thCourse">Course</th>
              <th className="thCredit">Credit</th>
              <th>Term</th>
              <th className="thCourse">Course</th>
              <th className="thCredit">Credit</th>
              <th>Term</th>
              <th className="thCourse">Course</th>
              <th className="thCredit">Credit</th>
            </tr>

            <tr>
              <td rowSpan="6" className="TermName">Fall</td>
                <td id="fall-class1"></td>
                <td id="fall-credit1"></td>
              <td rowSpan="6" className="TermName">Winter</td>
                <td id="winter-class1"></td>
                <td id="winter-credit1"></td>
              <td rowSpan="6" className="TermName">Summer</td>
                <td id="summer-class1"></td>
                <td id="summer-credit"></td>
            </tr>

            <tr>
              <td id="fall-class2"></td>
              <td id="fall-credit2"></td>
              <td id="winter-class2"></td>
              <td id="winter-credit2"></td>
              <td id="summer-class2"></td>
              <td id="summer-credit2"></td>
            </tr>

            <tr>
              <td id="fall-class3"></td>
              <td id="fall-credit3"></td>
              <td id="winter-class3"></td>
              <td id="winter-credit3"></td>
              <td id="summer-class3"></td>
              <td id="summer-credit3"></td>
            </tr>

            <tr>
              <td id="fall-class4"></td>
              <td id="fall-credit4"></td>
              <td id="winter-class4"></td>
              <td id="winter-credit4"></td>
              <td id="summer-class4"></td>
              <td id="summer-credit4"></td>
            </tr>

            <tr>
              <td id="fall-class5"></td>
              <td id="fall-credit5"></td>
              <td id="winter-class5"></td>
              <td id="winter-credit5"></td>
              <td id="summer-class5"></td>
              <td id="summer-credit5"></td>
            </tr>

            <tr>
              <td id="fall-class6"></td>
              <td id="fall-credit6"></td>
              <td id="winter-class6"></td>
              <td id="winter-credit6"></td>
              <td id="summer-class6"></td>
              <td id="summer-credit6"></td>
            </tr>
          </table>

          <Button text="Add A Class" onClick={this.handleShow}/>
          <Button text="Remove A Class" onClick={this.handleShow1}/>
          <Link to="/finalize-export-sem">
            <Button text="Finalize" />
          </Link>

          <Link to="/select-semester">
            <Button text="Back To Select Semester" />
          </Link>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
              <p>Select A Course You'd Like To Add </p> <br />
              <Form inline style={{textAlign: "center"}}>
                  <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                <Button onClick={this.addClass} type="submit" text="Add Course"/>
              </Form>
              <p id="addStatus"></p>
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
