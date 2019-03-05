import React from "react"
import SequenceTable1 from "./SequenceTable"
import Navbar from "./components/Navbar"

class SemesterGenerator extends React.Component{
  constructor(){
    this.state = {
      testCourse: {
        name: "SOEN341",
        credit: 3
      }
    }

    this.addClass = this.addClass.bind(this);
  }

  addClass(jsonObject) {
    jsonObject = this.state.testCourse;
    let course = jsonObject;
    document.getElementById('addStatus').innerHTML = "";

    if(this.state.semester === "Fall"){
      if(document.getElementById('fall-class1').innerHTML === ""){
        document.getElementById('fall-class1').innerHTML = course.name;
        document.getElementById('fall-credit1').innerHTML = course.credit;
      }else if(document.getElementById('fall-class2').innerHTML === ""){
        document.getElementById('fall-class2').innerHTML = course.name;
        document.getElementById('fall-credit2').innerHTML = course.credit;
      }else if(document.getElementById('fall-class3').innerHTML === ""){
        document.getElementById('fall-class3').innerHTML = course.name;
        document.getElementById('fall-credit3').innerHTML = course.credit;
      }else if(document.getElementById('fall-class4').innerHTML === ""){
        document.getElementById('fall-class4').innerHTML = course.name;
        document.getElementById('fall-credit4').innerHTML = course.credit;
      }else if(document.getElementById('fall-class5').innerHTML === ""){
        document.getElementById('fall-class5').innerHTML = course.name;
        document.getElementById('fall-credit5').innerHTML = course.credit;
      }else if(document.getElementById('fall-class6').innerHTML === ""){
        document.getElementById('fall-class6').innerHTML = course.name;
        document.getElementById('fall-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes."
      }
    }

    if (this.state.semester === "Winter") {
      if(document.getElementById('winter-class1').innerHTML === ""){
        document.getElementById('winter-class1').innerHTML = course.name;
        document.getElementById('winter-credit1').innerHTML = course.credit;
      }else if(document.getElementById('winter-class2').innerHTML === ""){
        document.getElementById('winter-class2').innerHTML = course.name;
        document.getElementById('winter-credit2').innerHTML = course.credit;
      }else if(document.getElementById('winter-class3').innerHTML === ""){
        document.getElementById('winter-class3').innerHTML = course.name;
        document.getElementById('winter-credit3').innerHTML = course.credit;
      }else if(document.getElementById('winter-class4').innerHTML === ""){
        document.getElementById('winter-class4').innerHTML = course.name;
        document.getElementById('winter-credit4').innerHTML = course.credit;
      }else if(document.getElementById('winter-class5').innerHTML === ""){
        document.getElementById('winter-class5').innerHTML = course.name;
        document.getElementById('winter-credit5').innerHTML = course.credit;
      }else if(document.getElementById('winter-class6').innerHTML === ""){
        document.getElementById('winter-class6').innerHTML = course.name;
        document.getElementById('winter-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes.";
      }
    }

    if (this.state.semester === "Summer") {
      if(document.getElementById('summer-class1').innerHTML === ""){
        document.getElementById('summer-class1').innerHTML = course.name;
        document.getElementById('summer-credit1').innerHTML = course.credit;
      }else if(document.getElementById('summer-class2').innerHTML === ""){
        document.getElementById('summer-class2').innerHTML = course.name;
        document.getElementById('summer-credit2').innerHTML = course.credit;
      }else if(document.getElementById('summer-class3').innerHTML === ""){
        document.getElementById('summer-class3').innerHTML = course.name;
        document.getElementById('summer-credit3').innerHTML = course.credit;
      }else if(document.getElementById('summer-class4').innerHTML === ""){
        document.getElementById('summer-class4').innerHTML = course.name;
        document.getElementById('summer-credit4').innerHTML = course.credit;
      }else if(document.getElementById('summer-class5').innerHTML === ""){
        document.getElementById('summer-class5').innerHTML = course.name;
        document.getElementById('summer-credit5').innerHTML = course.credit;
      }else if(document.getElementById('summer-class6').innerHTML === ""){
        document.getElementById('summer-class6').innerHTML = course.name;
        document.getElementById('summer-credit6').innerHTML = course.credit;
      }else{
        document.getElementById('addStatus').innerHTML = "You cannot add more classes."
      }
    }

  }

  render(){
    return(
      <div className="container">
        <Navbar />
        <div className="jumbotron j-greetings">
          <h2 className="display-4">Semester</h2>
          <hr color="#7e1530"/>
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Course Selection Menu</h2>
            <hr color="#7e1530"/>
            <h2 className="display-5">{this.state.semester} {this.state.year} Semester</h2>
            <p className="lead"></p>

            <table className="SequenceTable1" border="1px">
              <tr>
                <th colSpan="9">
                  <h2>{this.state.year}</h2>
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

              <tr>
                <td rowSpan="6" className="TermName">Fall</td>
                  <td id="fall-class1"></td>
                  <td id="fall-credit1"></td>
                <td rowSpan="6" className="TermName">Winter</td>
                  <td id="winter-class1"></td>
                  <td id="winter-credit1"></td>
                <td rowSpan="6" className="TermName">Summer</td>
                  <td id="summer-class1"></td>
                  <td id="summer-credit1"></td>
              </tr>

              <tr>
                <td id="fall-class2"></td>
                <td id="fall-credit2"></td>
                <td id="winter-class2"></td>
                <td id="winter-credit2"></td>
                <td id="summer-class2"></td>
                <td id="summer-credit2"></td>
              </tr>

              <tr>
                <td id="fall-class3"></td>
                <td id="fall-credit3"></td>
                <td id="winter-class3"></td>
                <td id="winter-credit3"></td>
                <td id="summer-class3"></td>
                <td id="summer-credit3"></td>
              </tr>

              <tr>
                <td id="fall-class4"></td>
                <td id="fall-credit4"></td>
                <td id="winter-class4"></td>
                <td id="winter-credit4"></td>
                <td id="summer-class4"></td>
                <td id="summer-credit4"></td>
              </tr>

              <tr>
                <td id="fall-class5"></td>
                <td id="fall-credit5"></td>
                <td id="winter-class5"></td>
                <td id="winter-credit5"></td>
                <td id="summer-class5"></td>
                <td id="summer-credit5"></td>
              </tr>

              <tr>
                <td id="fall-class6"></td>
                <td id="fall-credit6"></td>
                <td id="winter-class6"></td>
                <td id="winter-credit6"></td>
                <td id="summer-class6"></td>
                <td id="summer-credit6"></td>
              </tr>
            </table>
        </div>
      </div>
    )
  }
}

export default SemesterGenerator
