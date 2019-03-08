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
      bgColor: 'red',

      displayColorPicker1: false,
      displayColorPicker2: false,
      displayColorPicker3: false,
      displayColorPicker4: false,
      displayColorPicker5: false,
      displayColorPicker6: false,
      displayColorPicker7: false,

      color1: 'red',
      color2: 'pink',
      color3: 'green',
      color4: 'yellow',
      color5: 'orange',
      color6: 'blue',
      color7: 'black',
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

  changeColor(color){
    this.setState({
      bgColor : color
    })
  }

  handleClick1 = () => {
		this.setState({ displayColorPicker1: !this.state.displayColorPicker1 })
  };
  
  handleClick2 = () => {
		this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
  };
  
  handleClick3 = () => {
		this.setState({ displayColorPicker3: !this.state.displayColorPicker3 })
  };
  
  handleClick4 = () => {
		this.setState({ displayColorPicker4: !this.state.displayColorPicker4 })
  };
  
  handleClick5 = () => {
		this.setState({ displayColorPicker5: !this.state.displayColorPicker5 })
  };
  
  handleClick6 = () => {
		this.setState({ displayColorPicker6: !this.state.displayColorPicker6 })
  };
  
  handleClick7 = () => {
		this.setState({ displayColorPicker7: !this.state.displayColorPicker7 })
    };
    
    handleCloseColor1 = () => {
		this.setState({ displayColorPicker1: false })
  };
  
  handleCloseColor2 = () => {
		this.setState({ displayColorPicker2: false })
  };
  
  handleCloseColor3 = () => {
		this.setState({ displayColorPicker3: false })
  };
  
  handleCloseColor4 = () => {
		this.setState({ displayColorPicker4: false })
  };
  
  handleCloseColor5 = () => {
		this.setState({ displayColorPicker5: false })
  };
  
  handleCloseColor6 = () => {
		this.setState({ displayColorPicker6: false })
  };
  
  handleCloseColor7 = () => {
		this.setState({ displayColorPicker7: false })
	};

	handleChangeComplete1 = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChangeComplete2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChangeComplete3 = (color) => {
    this.setState({ color3: color.hex });
  };

  handleChangeComplete4 = (color) => {
    this.setState({ color4: color.hex });
  };

  handleChangeComplete5 = (color) => {
    this.setState({ color5: color.hex });
  };

  handleChangeComplete6 = (color) => {
    this.setState({ color6: color.hex });
  };

  handleChangeComplete7 = (color) => {
    this.setState({ color7: color.hex });
  };

  render(){
    const styles = reactCSS({
      'default': {
        popover: {
          position: 'absolute',
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
          <Modal.Body style={{textAlign: "center", backgroundColor: this.state.bgColor}}>
              <p>Select A Course and Color </p> <br />
              <Form inline style={{textAlign: "center"}}>
                <div className="container" style={{width: "40%"}}>
                  <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                  <FormControl type="color" id="colorChosen" onChange={(evt) => this.changeColor(evt.target.value)} placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                </div>
                <Button type="submit" text="Remove Course"/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeRubiat} text="Close" />
            <Button variant="primary" text="Save Changes" />
            <Button text="Color Selection" onClick={this.colourRubiatO}/>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.colorS} onHide={this.colourRubiatC}>
          <Modal.Header closeButton>
            <Modal.Title>Color Selector</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
            <p>Select A Course and Color </p> <br />
            <Form inline style={{textAlign: "center"}}>
              <div className="container" style={{width: "40%"}}>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" style={{width: "100%", textAlign: "center"}}/>
                <button onClick={ this.handleClick1 }>Pick Color</button>
            { this.state.displayColorPicker1 ? <div style={ styles.popover }>
              <div style={ styles.cover } onClick={ this.handleCloseColor1 }/>
              <CirclePicker onChangeComplete={ this.handleChangeComplete1 }/>
            </div> : null }/>
              </div>
              <Button type="submit" text="Remove Course"/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.colourRubiatC} text="Close" />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}
export default CourseSelectionMenu