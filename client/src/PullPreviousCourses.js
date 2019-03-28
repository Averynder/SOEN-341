import React from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"

class PullPreviousCourses extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <table className="SequenceTable1" border="1px">
              <tr>
                <th colSpan="9">
                  <h2>Previous Taught Courses</h2>
                </th>
              </tr>
              <tr>
                <th>Term</th>
                <th className="thCourse">Course</th>
                <th className="thCredit">Credit</th>
                <th>Term</th>
                <th className="thCourse">Course</th>
                <th className="thCredit">Credit</th>
                <th>Term</th>
                <th className="thCourse">Course</th>
                <th className="thCredit">Credit</th>
              </tr>
              <tr><td rowSpan="6" className="TermName">Fall</td><td></td><td></td><td rowSpan="6" className="TermName">Winter</td><td></td><td></td><td rowSpan="6" className="TermName">Summer</td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </table>

            <Link to="/select-semester">
              <Button text="Continue" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default PullPreviousCourses
