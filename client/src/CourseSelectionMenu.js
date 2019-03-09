import React from "react"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import {Modal, Form, FormControl} from "react-bootstrap"
import time from "./data/calendar.js"
import * as data from "./data/courses.json"
import { CirclePicker } from 'react-color';
import reactCSS from 'reactcss'

class CourseSelectionMenu extends React.Component{
  constructor(props,context){
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.openRubiat = this.openRubiat.bind(this);
    this.closeRubiat = this.closeRubiat.bind(this);
    this.colourRubiatC = this.colourRubiatC.bind(this);
    this.colourRubiatO = this.colourRubiatO.bind(this);
    this.changeColorChangerValue = this.changeColorChangerValue.bind(this);

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
      rubiat: false,
      colorS: false,
      semester: semester,
      year: year,
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      classes: data.sequence,

      colors: ["red", "pink", "green", "yellow", "orange", "blue", "black"],
      
      color1: 'red',
      color2: 'pink',
      color3: 'green',
      color4: 'yellow',
      color5: 'orange',
      color6: 'blue',
      color7: 'black',

      colorChanger: 'color1', // have to change this so the circlepicker changes a default color
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

  openRubiat(){
    this.setState({
      rubiat: true
    })
  }

  closeRubiat(){
    this.setState({
      rubiat: false
    })
  }

  colourRubiatO(){
    this.setState({
      colorS: true
    })
  }

  colourRubiatC(){
    this.setState({
      colorS: false
    })
  }

  addClass(days_array){
    document.getElementById('id')
  }

  changeColorChangerValue(e) {
    this.setState({
      colorChanger: e.target.value
    })
  }

  handleChangeComplete = (color) => {
    switch(this.state.colorChanger) {
      case 'color1':
      this.setState({ color1: color.hex });
      break;
      case 'color2':
      this.setState({ color2: color.hex });
      break;
      case 'color3':
      this.setState({ color3: color.hex });
      break;
      case 'color4':
      this.setState({ color4: color.hex });
      break;
      case 'color5':
      this.setState({ color5: color.hex });
      break;
      case 'color6':
      this.setState({ color6: color.hex });
      break;
      case 'color7':
      this.setState({ color7: color.hex });
      break;
    }
  }

  render(){
    const styles = reactCSS({
      'default': {
        popover: {
          position: 'fixed',
          top: '23%',
          left: '38%',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return(
      <div className="container">
        <Navbar />

        <div className="jumbotron j-greetings">
          <h2 className="display-4">Course Selection Menu</h2>
          <hr color="#7e1530"/>
          <h2 className="display-5">{this.state.semester} {this.state.year} Semester</h2>
          <p className="lead"></p>

          <div> {/* Schedule */}
            <table>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <th>Time</th>

                        <tr>
                          <td>{time.map(element => <div>{element}</div>)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  {this.state.weekdays.map(days => <td>
                    <table>
                      <tbody>
                        <th>{days}</th>
                        <tr>
                          <td>{time.map(element =>
                            <div>-</div>
                          )}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>)}
                </tr>
              </tbody>
            </table>
          </div>

          <Button text="Add A Class" onClick={this.handleShow}/>
          <Button text="Remove A Class" onClick={this.handleShow1}/>
          <Button text="Rubiat's Color Selection" onClick={this.openRubiat}/>
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
                <Button type="submit" text="Add Course"/>
              </Form>
              <p id="addStatus"></p>
          </Modal.Body>
          <Modal.Footer>
            <Button
             variant="secondary" onClick={this.handleClose} text="Close" />
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

        <Modal show={this.state.rubiat} onHide={this.closeRubiat}>
          <Modal.Header closeButton>
            <Modal.Title>Course Colour Selection</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
              <p>Select A Course and Color </p> <br />
              <Form inline style={{textAlign: "center"}}>
                <div className="container" style={{width: "40%"}}>
                <select id="colorChanger" onChange={this.changeColorChangerValue}>
                            <option value="color1">Course1</option>
                            <option value="color2">Course2</option>
                            <option value="color3">Course3</option>
                </select>
                </div>
                <Button text="Color Selection" onClick={this.colourRubiatO}/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeRubiat} text="Close"/>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.colorS} onHide={this.colourRubiatC}>
          <Modal.Header closeButton style={{backgroundColor: this.state.color1}}>
            <Modal.Title>Color Selector</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center", backgroundColor: this.state.color2}}>
            <p style={{margin: "0px 0px 25% 0px"}}>Select a Color for Course (replace with course name)</p>
            <Form inline style={{textAlign: "center"}}>
              <div className="container" style={{width: "40%"}}>
                <div style= {styles.popover}>
                <CirclePicker style={{margin: "0px 0px 0px 0px"}} onChangeComplete={ this.handleChangeComplete }/>
                </div>
                </div>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor: this.state.color3}}>
            <Button variant="primary" onClick={this.colourRubiatC} text="Close" />
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}
export default CourseSelectionMenu