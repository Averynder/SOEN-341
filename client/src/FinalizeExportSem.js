import React from "react";
import Button from "./components/Button";
import { Link } from "react-router-dom";

class FinalizeExportSem extends React.Component {
  render() {
    const { selectedCourses } = this.props.location;
    console.log(selectedCourses);

    let displayInfo =
      selectedCourses === undefined || selectedCourses.length === 0 ? (
        <h3>No Class Chosen Yet</h3>
      ) : (
        selectedCourses.map(element => (
          <tr
            style={{
              margin: "auto",
              backgroundColor: element.course_color
            }}
          >
            <td style={{ padding: "20px" }}>
              <h5>{element.course_number}</h5>
              <p>{element.course_name}</p>
              <p>{element.course_semester}</p>
              <p>{element.course_year}</p>
            </td>
            <td style={{ padding: "20px" }}>
              <h5>LEC</h5>
              <p>Section: {element.lecture_section}</p>
              <p>Room: {element.lecture_room}</p>
              <p>Days: {element.lecture_days}</p>
              <p>Start Time: {element.lecture_start}</p>
              <p>End Time: {element.lecture_end}</p>
            </td>

            {element.tutorial_section !== "" ? (
              <td style={{ padding: "20px" }}>
                <h5>TUT</h5>
                <p>Section: {element.tutorial_section}</p>
                <p>Room: {element.tutorial_room}</p>
                <p>Days: {element.tutorial_days}</p>
                <p>Start Time: {element.tutorial_start}</p>
                <p>End Time: {element.tutorial_end}</p>
              </td>
            ) : (
              <td />
            )}
            {element.lab_section !== "" ? (
              <td style={{ padding: "20px" }}>
                <h5>LAB</h5>
                <p>Section: {element.lab_section}</p>
                <p>Room: {element.lab_room}</p>
                <p>Days: {element.lab_days}</p>
                <p>Start Time: {element.lab_start}</p>
                <p>End Time: {element.lab_end}</p>
              </td>
            ) : (
              <td />
            )}
          </tr>
        ))
      );

    return (
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <h1>This is your Finalized Format</h1>
            <hr color="#7E1530" />
            <div>
              <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                {displayInfo}
              </table>
            </div>
            <Link to="/select-semester">
              <Button text="Export as PDF" />
            </Link>
            <Link to="/course-selection-menu">
              <Button text="Back to Course Selection" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FinalizeExportSem;
