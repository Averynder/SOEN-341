import React from "react"
import Navbar from "./components/Navbar"
import Greetings from "./components/Greetings"
import ButtonContainer from "./components/ButtonContainer"
import Modal from "./components/Modal"
import Backdrop from "./components/Backdrop"
import Button from "./components/Button"
import {Link} from "react-router-dom"
import './App.css';
import LinkBox from "./LinkBox"
import axios from 'axios';

class App extends React.Component{
	constructor() {
		super();
		
		this.state ={
			clock:[]
		}
		
		this.state = {
			isOpenStudent: false,
			isOpenTeacher: false
		}

		this.toggleStudent = this.toggleStudent.bind(this);
		this.toggleTeacher = this.toggleTeacher.bind(this);
	}

	componentDidMount() {
		fetch('/users')
		.then(res => res.json())
       	 	.then(users => this.setState({ users }));
    	}
	
	
	
	
	toggleStudent(){
		this.setState({
			isOpenStudent: !this.state.isOpenStudent
		})
	}

	toggleTeacher(){
		this.setState({
			isOpenTeacher: !this.state.isOpenTeacher
		})
	}

	render(){
		axios.get('/niels')
		.then(res => {
			var clock =res.data;
			this.setState({clock});
			})
		.then(setInterval(() => {document.getElementById('currentTime').innerHTML = this.state.clock},1000))
		
		return (
			<div className="bckgrnd container">
				<Navbar />
				<Greetings/>
				<ButtonContainer>
					<Button text="I Am A Student" onClick={this.toggleStudent}/>
					<Button text="I Am A Professor" onClick={this.toggleTeacher}/>
					<Link to="/build-seq-or-sem">
						<Button text="I Am New To This Website" />
					</Link>
				</ButtonContainer>

				<Backdrop show={this.state.isOpenStudent} onClose={this.toggleStudent}>
					<Modal show={this.state.isOpenStudent} onClose={this.toggleStudent} userType="Student" link="/previous-courses-taken"/>
				</Backdrop>

				<Backdrop show={this.state.isOpenTeacher} onClose={this.toggleTeacher}>
					<Modal show={this.state.isOpenTeacher} onClose={this.toggleTeacher} userType="Teacher" link="/pull-previous-courses"/>
				</Backdrop>

				<LinkBox />
				
			</div>
		)
	}
}

export default App

