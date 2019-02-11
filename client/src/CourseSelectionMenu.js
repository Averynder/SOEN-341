import React from "react"
import Navbar from "./components/Navbar"

class CourseSelectionMenu extends React.Component{
  render(){
    var year = document.getElementById('semester-year');
    var semester = document.getElementById('semester');
    return(
      <div className="container">
        <Navbar />

        <div className="jumbotron j-greetings">
          <h2 className="display-4">{semester.value} {year.value} Semester</h2>
          <hr color="#7e1530"/>
          <p className="lead">Add here drag and drop menu + the courses for this particular semester</p>
        </div>
      </div>
    )
  }
}

export default CourseSelectionMenu
