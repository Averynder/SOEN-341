import React from "react";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
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
      numberOfYear: 1,
    };
  }

  componentDidMount() {
    fetch('/semjson')
      .then(res => res.json())
      .then(courses => {this.setState({ data: courses });})
  }

  handleStartingYear = () => {
    this.setState({
      showYearPicker: true
    });
  };

  convertToPDF = () => {
    const input = document.getElementById('master');

    //This block below formats the div-to-print properly so it is sized correctly on the pdf

    html2canvas(input, {
      dpi: 9000, //supposed to make it less blurry on retina
      scale: 0.7 //approximately fills the width of pdf page with the sequence table
    })
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.output("/jimmyTest.pdf");
        pdf.save("jimmyTest.pdf");
      });
  };


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
      <PdfSequenceGenerator data={this.state.data} id={"divToPrint" + index} year={index} />
    ));


    return (
      <div id="master" className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
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
            <Button text="Finalize" onClick={this.convertToPDF} />
            <Link to="/formalize">
              <Button text="Formalize" />
            </Link>
            <Link to="/build-seq-or-sem">
              <Button text="Back to Main Selector" />
            </Link>
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
