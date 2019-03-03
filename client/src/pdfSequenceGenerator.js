import React from "react"
import Navbar from "./components/Navbar"
import * as data from "./data/courses.json"
import * as jsPDF from 'jspdf'
import {Table} from "react-bootstrap"
import Button from "./components/Button"
import * as html2canvas from 'html2canvas'

class pdfSequenceGenerator extends React.Component{
    constructor(){
        super();

        this.state = {
            courses: data.default.sequence,
        }

        this.convertToPDF = this.convertToPDF.bind(this);
    }

    convertToPDF(){
        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.output('/jimmyTest.pdf');
            pdf.save("jimmyTest.pdf");
        });
    }

    render(){
        let x = this.state.courses.map(element => 
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
                            This is just an example of a sequence with handmade examples of courses, not a the litteral final product.
                            This is just testing out the issue #69. The real json file with actual classes and sequence can be substituted later.
                        </p>

                        <div className="mt4" id="divToPrint">
                            {table}
                        </div>
                        <Button id="mb5" text="PDF" onClick={this.convertToPDF}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default pdfSequenceGenerator;