import * as React from "react";
import './hambergurCSS.css';
import {Form, Modal, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as times from "./data/calendar";
import {CirclePicker} from "react-color";
import Button from "./components/Button";
import * as data from "./data/courses";
import * as data1 from "./data/courses2";

class hamburger extends React.Component {
	constructor(props){
		super();
		this.openRubiat = this.openRubiat.bind(this);
		this.closeRubiat = this.closeRubiat.bind(this);
		this.colourRubiatC = this.colourRubiatC.bind(this);
		this.colourRubiatO = this.colourRubiatO.bind(this);

		this.state = {
			show: false,
			show1: false,
			rubiat: false,
			colorS: false,
			isLoading: true,
			lectures: null,
			labs: null,
			tutorials: null,
			dataCourses: null,
			Courses: null,
			coursesFall: null,
			coursesWinter: null,
			coursesSummer: null,
			coursesTaken: null,
			coursesTakenSet: null,
			loggedIn: false,
			semester: null,
			year: null,
			weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			credits: 0,
			//classes: JSON.parse(JSON.stringify(data.sequence)),

			colors: [
				["#f44336", 0],
				["#e91e63", 0],
				["#4caf50", 0],
				["#795548", 0],
				["#03a9f4", 0],
				["#3f51b5", 0],
				["#607d8b", 0]
			],

			addedClasses: [],

			courses: JSON.parse(JSON.stringify(data.default.sequence)),
			courses2: JSON.parse(JSON.stringify(data1.default.sequence)),
			selectedCourses: [],
			show2: "hidden",

			colorOfNewClass: [],

			showUpload: false,

			uploadedFile: null,

			defaultValueLecture: "",
			defaultValueLab: "",
			defaultValueTutorial: "",

			showSelection: "block",
			showSchedule: "none",
			showConflict: "hidden",
			showTryAll: "hidden",
			tryAllIndex: 0,
			validTryAll: [],

			finalizedClassArray: [],
			showConflictForFinalize: false,
		};
	}

	openRubiat() {
		this.setState({
			rubiat: true
		});
	}

	closeRubiat() {
		this.setState({
			rubiat: false
		});
	}

	colourRubiatO() {
		this.setState({
			colorS: true
		});
	}

	colourRubiatC() {
		this.setState({
			colorS: false
		});
	}

	render(){
		const myStyle = {
			backgroundColor: "red",
			display : "inline-block",
		};
		var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

		var hamburgers = document.querySelectorAll(".hamburger");
		if (hamburgers.length > 0) {
			forEach(hamburgers, function(hamburger) {
				hamburger.addEventListener("click", function() {
					this.classList.toggle("is-active");
				}, false);
			});
		}
		return(
			<div className="container">
				<div className="jumbotron j-greetings">
					<div style={{display: this.state.showSelection}}>
						<h2 className="display-4">Select Your Courses</h2>
						<hr color="#7e1530"/>
						<div style={{textAlign: "center"}}>
							<div style={myStyle}>
								<button className="hamburger hamburger--squeeze" type="button">
			<span className="hamburger-box">
			<span className="hamburger-inner">
			</span>
	</span><p>Hey</p>
								</button>
							</div>
						</div>
						<br/>
						<Button text="Generate Schedule" onClick={this.handleDisplay}/>

						<Button text="Color Selection" onClick={this.openRubiat}/>

						<Link to="/build-seq-or-sem">
							<Button text="Main Selector"/>
						</Link>

					</div>

					<div style={{display: this.state.showSchedule}}>
						{/*<hr color="#7e1530" />*/}
						<h2 className="display-5">
							{this.state.semester} {this.state.year} Semester
						</h2>
						<p className="lead"/>
						<h4
							id="timeConflict"
							style={{color: "red", visibility: this.state.showConflict}}
						/>

					</div>
				</div>

				<Modal show={this.state.rubiat} onHide={this.closeRubiat}>
					<Modal.Header closeButton>
						<Modal.Title>Course Colour Selection</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{textAlign: "center"}}>
						<p>Select A Course and Color </p> <br/>
						<Form inline style={{textAlign: "center"}}>
							<div className="container" style={{width: "40%"}}>
							</div>
							<Button text="Color Selection" onClick={this.colourRubiatO}/>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.closeRubiat} text="Close"/>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.colorS} onHide={this.colourRubiatC}>
					<Modal.Header closeButton style={{backgroundColor: "#82100d"}}>
						<Modal.Title>Color Selector</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{textAlign: "center"}}>
						<p style={{margin: "0px 0px 15px 0px"}}>
							Select a Color
						</p>
						<div style={{margin: "0px 0px 0px 115px"}}>
							<CirclePicker onChangeComplete={this.handleChangeComplete}/>
						</div>
					</Modal.Body>

					<Modal.Footer style={{backgroundColor: "#82100d"}}>
						<Button
							variant="primary"
							onClick={this.colourRubiatC}
							text="Close"
						/>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default hamburger;