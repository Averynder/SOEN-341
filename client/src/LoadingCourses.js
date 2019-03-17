import React, {Component} from "react"
import LoadingScreen from 'react-loading-screen'
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import { renderToString } from 'react-dom/server'

class LoadingCourses extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			isLoading: false,
		}
		this.toggleLoading = this.toggleLoading.bind(this);
	}
	toggleLoading() {
		this.setState({
			isLoading: !this.state.isLoading
		});
	}
	componentDidMount() {
		fetch("/users")
			.then(res => res.json())
			.then(users =>
				this.setState({ users }, () => console.log("We got the JSON " + users))
			)
			.then(() => {
				document.getElementById(
					"currentTime"
				).innerHTML = this.state.users.substring(
					10,
					this.state.users.search(/"},/)
				);
			});
	}

	getTime = () => {
		fetch("/users")
			.then(res => res.json())
			.then(users =>
				this.setState({ users }, () => console.log("We got the JSON " + users))
			)
			.then(() => {
				document.getElementById(
					"currentTime"
				).innerHTML = this.state.users.substring(
					10,
					this.state.users.search(/"},/)
				);
			});
	};

	render() {
		return (
			<div className="container">
				<Navbar />
				<div className="container">
					<div className="jumbotron j-greetings">
						<h2 className="display-4">Select an Option</h2>
						<hr color="#7e1530"/>
						<div class="btn-group" role="group" aria-label="Basic example">
							<Link to="/select-semester">
								<Button text="Semester"/>
							</Link>
							<Link to="/obtain-uploaded-sequence">
								<Button text="Sequence"/>
							</Link>
							<Button text="Load Previous Courses" onClick={this.toggleLoading}/>
						</div>
						<LoadingScreen
							loading={this.state.isLoading}
							bgColor='#f1f1f1'
							spinnerColor='#b30000'
							textColor='#676767'
							logoSrc='https://user-images.githubusercontent.com/36492119/52869487-bdcd5180-3113-11e9-93d4-155882376646.png'
							text='Receiving Previously Taken Courses'
						>
						</LoadingScreen>
					</div>
				</div>
			</div>
		)
	}

}

export default LoadingCourses
