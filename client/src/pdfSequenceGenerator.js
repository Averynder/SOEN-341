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
            showAdd: false,
            showRemove: false,
            selectYear: true,
            year: null,
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
        let errorMessage = document.getElementById('addStatus');
        let addedClass;
        let classExists = false;
        for(let i=0; i<array.length; i++){ //This loop prevents duplicates
            if(array[i].course === input){
                errorMessage.innerHTML = "You have already added this class";
                return;
            }
        }
        console.log(errorMessage);

        for(let i=0; i<classList.length; i++){
            if(classList[i].course === input){
                addedClass = classList[i];
                classExists = true;
                break;
            }
        }

        if(classExists === false){
            errorMessage.innerHTML = "Invalid Class/Class Not Found";
            return;
        }
        array.push(addedClass);
        this.setState({
            selectedCourses: array,
            showAdd: !this.state.showAdd,
        });
    }

    removeClass = () => {
        let array = this.state.selectedCourses;
        let removedClass = document.getElementById('select-remove').value;
        array = array.filter((element) => element.course !== removedClass);
        this.setState({
            selectedCourses: array,
            showRemove: !this.state.showRemove,
        })
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
        
        let yeetus = [];
        for(let i=0;i<6;i++){ /*Basically choose a year from current year up to 8 years later. Don't touch this*/
            yeetus[i] = (new Date()).getFullYear() + i;
        }
        const years = yeetus.map(jimmy => <option value={jimmy}>{jimmy}</option>)

        return(
            <div>
                <Navbar />
                <div className="container">
                    <div className="jumbotron j-greetings">
                        <h2 className="display-4">Sequence To PDF <br/> Year {this.state.selectYear ? "" : this.state.year}</h2>
                        <hr color="#7e1530"/>
                        <p className="lead">
                            Click Add Course and try out COMP248, COMP232, SOEN228 or ENGR213 to test it out.<br/>
                            These 4 classes are only available because this is a test. The real json file with all the classes can easily be substituted later.
                        </p>

                        <div className="mt4" id="divToPrint">
                            {table}
                        </div>
                        <Button text="Add Course" onClick={() => {
                            this.setState({showAdd: !this.state.showAdd})
                        }}/>
                        <Button text="Remove Course" onClick={() => {
                            this.setState({showRemove: !this.state.showRemove})
                        }}/>
                        <Button id="mb5" text="PDF" onClick={this.convertToPDF}/>
                    </div>
                </div>










                <Modal show={this.state.showAdd} onHide={() => {
                    this.setState({showAdd: !this.state.showAdd})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add A Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <p>Select A Course You'd Like To Add </p> <br />
                        <input id="add-class" type="text" />
                        <p id="addStatus" style={{color: "red"}}></p>
                        <Button type="submit" text="Add Course" onClick={this.addClass}/>
                    </Modal.Body>
                </Modal>









                <Modal show={this.state.showRemove} onHide={() => {
                    this.setState({showRemove: !this.state.showRemove})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove A Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <p>Select A Course You'd Like To Remove </p> <br />
                        
                            {this.state.selectedCourses.length === 0 
                                ? <p>No Classes Have Been Added Yet</p> 
                                : <select id="select-remove">{this.state.selectedCourses.map(element => 
                                    <option value={element.course}>{element.course}</option>
                            )}</select>}
                        
                        <p id="removeStatus" style={{color: "red"}}></p>
                        <Button type="submit" text="Remove Course" onClick={this.removeClass}/>
                    </Modal.Body>
                </Modal>










                <Modal show={this.state.selectYear}>
                    <Modal.Header>
                        <Modal.Title>Pick A Year</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <select id="select-year">
                            {years}
                        </select>
                        <p id="removeStatus" style={{color: "red"}}></p>
                        <Button type="submit" text="Select Year" onClick={() => {
                            let dooks = document.getElementById('select-year').value; //selected year
                            this.setState({
                                year: dooks,
                                selectYear: false
                            })
                        }}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default pdfSequenceGenerator;