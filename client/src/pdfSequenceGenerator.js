import React from "react"
import Navbar from "./components/Navbar"
import * as data from "./data/courses.json"
import * as jsPDF from 'jspdf'
import {Table, Modal} from "react-bootstrap"
import Button from "./components/Button"
import * as html2canvas from 'html2canvas'

class pdfSequenceGenerator extends React.Component{
    constructor(){
        super();

        this.state = {
            courses: data.default.sequence,
            selectedCourses: [],
            show: false,
        }
    }



    convertToPDF = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.output('/jimmyTest.pdf');
            pdf.save("jimmyTest.pdf");
        });
    }

    addClass = () => {
        let array = this.state.selectedCourses; //Keep track of user selected classes
        let input = document.getElementById('add-class').value; //Get user input
        let classList = this.state.courses; //Gets the whole list of courses of concordia
        let addedClass;
        for(let i=0; i< classList.length; i++){
            if(classList[i].course === input){
                addedClass = classList[i];
                break;
            }
        }
        array.push(addedClass);
        this.setState({
            selectedCourses: array,
            show: !this.state.show,
        });
    }

    render(){
        let x = this.state.selectedCourses.map(element => 
            <tr>
                <td>{element.semester}</td>
                <td>{element.course}</td>
                <td>{element.name}</td>
                <td>{element.credit}</td>
            </tr>
        );

        let table = <Table id="pdfTable" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>Semester</th>
                                    <th>Course</th>
                                    <th>Class Name</th>
                                    <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {x}
                                </tbody>
                            </Table>;

        return(
            <div>
                <Navbar />
                <div className="container">
                    <div className="jumbotron j-greetings">
                        <h2 className="display-4">Sequence To PDF</h2>
                        <hr color="#7e1530"/>
                        <p className="lead">
                            Click Add Course and try out COMP248, COMP232, SOEN228 or ENGR213 to test it out.<br/>
                            These 4 classes are only available because this is a test. The real json file with all the classes can easily be substituted later.
                        </p>

                        <div className="mt4" id="divToPrint">
                            {table}
                        </div>
                        <Button text="Add Course" onClick={() => {
                            this.setState({show: !this.state.show})
                        }}/>
                        <Button id="mb5" text="PDF" onClick={this.convertToPDF}/>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={() => {
                    this.setState({show: !this.state.show})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add A Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <p>Select A Course You'd Like To Add </p> <br />
                        <input id="add-class" type="text" />
                        <Button type="submit" text="Add Course" onClick={this.addClass}/>
                        <p id="addStatus"></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                        variant="secondary" onClick={() => {
                            this.setState({show: !this.state.show})
                        }} text="Close" />
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default pdfSequenceGenerator;