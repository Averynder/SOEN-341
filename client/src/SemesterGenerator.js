import React from "react"
import SequenceTable1 from "./SequenceTable"
import Navbar from "./components/Navbar"

class SemesterGenerator extends React.Component{
  render(){
    return(
      <div className="container">
        <Navbar />
        <div className="jumbotron j-greetings">
          <h2 className="display-4">Semester</h2>
          <hr color="#7e1530"/>
          <SequenceTable1 />
        </div>
      </div>
    )
  }
}

export default SemesterGenerator
