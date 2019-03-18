import React from "react"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Upload from "./Upload"
import LoadingScreen from 'react-loading-screen'
import Course from "./Course";

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
  }
  regEx()
  {
    while (this.state.Courses.length > 1)
    {
      var titleStart = this.state.Courses.indexOf("\"courseTitle\":\"");
      this.state.Courses = this.state.Courses.substring(titleStart + 15);
      var endQuote1 = this.state.Courses.indexOf("\"");
      var title = this.state.Courses.substring(0,endQuote1);

      var subjectStart = this.state.Courses.indexOf("\"subject\":\"");
      this.state.Courses = this.state.Courses.substring(subjectStart + 11);
      var endQuote2 = this.state.Courses.indexOf("\"");
      var subject = this.state.Courses.substring(0,endQuote2);

      var numberStart = this.state.Courses.indexOf("\"classNumber\":\"");
      this.state.Courses = this.state.Courses.substring(numberStart + 15);
      var endQuote3 = this.state.Courses.indexOf("\"");
      var courseNumber = this.state.Courses.substring(0,endQuote3);

      var creditsStart = this.state.Courses.indexOf("\"credits\":\"");
      this.state.Courses = this.state.Courses.substring(creditsStart + 11);
      var endQuote4 = this.state.Courses.indexOf("\"");
      var creditNumber = this.state.Courses.substring(0,endQuote4);

      var prereqStart = this.state.Courses.search("\"prerequisites\":\"");
      this.state.Courses = this.state.Courses.substring(prereqStart + 17);
      var endQuote5 = this.state.Courses.search("\"");
      var prereqs = this.state.Courses.substring(0,endQuote5);
      var potentialSPace = prereqs.charAt(0);
      if (potentialSPace == ' ')
        prereqs = prereqs.substring(1);
      while (prereqs.indexOf("<==>") > -1)
      {
        var weirdshi = prereqs.indexOf("<==>");
        prereqs = prereqs.substring(0,weirdshi) +  " or " + prereqs.substring(weirdshi+4);
      }
      while (prereqs.search(/\d COMP/) > -1)
      {
        var starter = prereqs.search(/\d COMP/);
        prereqs = prereqs.substring(0,starter+1) + " and COMP" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d SOEN/) > -1)
      {
        var starter = prereqs.search(/\d SOEN/);
        prereqs = prereqs.substring(0,starter+1) + " and SOEN" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d MATH/) > -1)
      {
        var starter = prereqs.search(/\d MATH/);
        prereqs = prereqs.substring(0,starter+1) + " and MATH" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENGR/) > -1)
      {
        var starter = prereqs.search(/\d ENGR/);
        prereqs = prereqs.substring(0,starter+1) + " and ENGR" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENCS/) > -1)
      {
        var starter = prereqs.search(/\d ENCS/);
        prereqs = prereqs.substring(0,starter+1) + " and ENCS" + prereqs.substring(starter+6);
      }

      var coreqStart = this.state.Courses.search("\"corequisites\":\"");
      this.state.Courses = this.state.Courses.substring(coreqStart + 16);
      var endQuote6 = this.state.Courses.search("\"");
      var coreqs = this.state.Courses.substring(0,endQuote6);
      var potentialSPace2 = coreqs.charAt(0);
      if (potentialSPace2 == ' ')
        coreqs = coreqs.substring(1);
      while (coreqs.indexOf("<==>") > -1)
      {
        var weirdshi = coreqs.indexOf("<==>");
        coreqs = coreqs.substring(0,weirdshi) +  " or " + coreqs.substring(weirdshi+4);
      }
      while (coreqs.search(/\d COMP/) > -1)
      {
        var starter = coreqs.search(/\d COMP/);
        coreqs = coreqs.substring(0,starter+1) + " and COMP" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d SOEN/) > -1)
      {
        var starter = coreqs.search(/\d SOEN/);
        coreqs = coreqs.substring(0,starter+1) + " and SOEN" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d MATH/) > -1)
      {
        var starter = coreqs.search(/\d MATH/);
        coreqs = coreqs.substring(0,starter+1) + " and MATH" + coreqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENGR/) > -1)
      {
        var starter = coreqs.search(/\d ENGR/);
        coreqs = coreqs.substring(0,starter+1) + " and ENGR" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d ENCS/) > -1)
      {
        var starter = coreqs.search(/\d ENCS/);
        coreqs = coreqs.substring(0,starter+1) + " and ENCS" + coreqs.substring(starter+6);
      }
      if (prereqs.indexOf(",") > -1)
        prereqs = "";
      if (title != "")
      {
        var cc = new Course(title, subject, courseNumber, creditNumber, prereqs, coreqs);
        console.log(title + " " + subject + " " + courseNumber + " " + creditNumber + " Pre: " + prereqs + " Co: " + coreqs);
      }
    }
  }

  componentDidMount() {
    fetch("/seqQuery")
        .then(res => res.json())
        .then(users =>
            this.setState({ users }, () => this.setCourses(users, true))
        )
        .then(() => { this.regEx(); })
        .then(() => { this.toggleLoading(); });
    fetch("/semQuery")
        .then(res => res.json())
        .then(users1 =>
            this.setState({ users1 }, () => this.setCourses(users1, false))
        );
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
            text='Receiving Courses'
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
