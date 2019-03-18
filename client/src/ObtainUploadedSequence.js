import React from "react"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Upload from "./Upload"
import LoadingScreen from 'react-loading-screen'
import Course from "./Course";
import MyDoublyLinkedList from "./MyDoublyLinkedList";

class ObtainUploadedSequence extends React.Component{
  constructor(props)
  {
    super(props);
    this.state =
        {
          isLoading: true,
          Courses: "",
        };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.regEx = this.regEx.bind(this);
    this.setCourses = this.setCourses.bind(this);
  }
  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }
  setCourses(stringy)
  {
    this.state.Courses = "" + stringy;
    console.log(this.state.Courses);
  }
  regEx()
  {
    let ll = new MyDoublyLinkedList();
    /*
    while (this.state.Courses.length > 1)
    {

    }
    */
  }

  componentDidMount() {
    fetch("/seqQuery")
        .then(res => res.json())
        .then(users =>
            this.setState({ users }, () => this.setCourses(users))
        )
        .then(() => { this.regEx(); })
        .then(() => { this.toggleLoading(); });
  }

  render(){
    return(
      <div className="container">
        <Navbar /> <br />
        <LoadingScreen
            loading={this.state.isLoading}
            bgColor='#f1f1f1'
            spinnerColor='#b30000'
            textColor='#676767'
            logoSrc='https://user-images.githubusercontent.com/36492119/52869487-bdcd5180-3113-11e9-93d4-155882376646.png'
            text='Receiving Previously Taken Courses'
        >

        </LoadingScreen>
        <div className="container">
          <div className="jumbotron j-greetings">
            <h1>The Uploaded Sequence Will Go Here</h1>
            <hr color="#7E1530" />
            <div class="container">
              <Upload />
              <h3>The courses not taken yet are: </h3>
              <dl>
                <li>course1</li>
                <li>course2</li>
                <li>course3</li>
                <li>course4</li>
                <li>course5</li>
                <li>course6</li>
              </dl>
            </div>
            <Button text="Put in Order" />
            <Link to="/draft-sequence-menu">
              <Button text="Generate Sequence" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ObtainUploadedSequence
