import React from "react";
import Button from "./components/Button";
import { Link } from "react-router-dom";

class FinalizeExportSem extends React.Component {
  render() {
    const { selectedCourses } = this.props.location;
    console.log(selectedCourses);

    let displayInfo =
      selectedCourses === undefined || selectedCourses.length === 0 ? (
        <h1>No Class Chosen Yet</h1>
      ) : (
        selectedCourses.map(element => (
          <tr style={{ margin: "auto" }}>
            <div>
              <td style={{ padding: "20px" }}>
                <h5>{element[0].course}</h5>
                <p>{element[0].name}</p>
                <p>{element[0].semester}</p>
              </td>
              <td style={{ padding: "20px" }}>
                <h5>LEC</h5>
                <p>Section: {element[0].lecture[0].section}</p>
                <p>Room: {element[0].lecture[0].room}</p>
              </td>

              {element[0].lecture[0].tutorial.length !== 0 ? (
                <td style={{ padding: "20px" }}>
                  <h5>TUT</h5>
                  <p>Section: {element[0].lecture[0].tutorial[0].section}</p>
                  <p>Room: {element[0].lecture[0].tutorial[0].room}</p>
                </td>
              ) : (
                <td />
              )}
              {element[0].lab.length !== 0 ? (
                <td style={{ padding: "20px" }}>
                  <h5>LAB</h5>
                  <p>Section: {element[0].lab[0].section}</p>
                  <p>Room: {element[0].lab[0].room}</p>
                </td>
              ) : (
                <td />
              )}
            </div>
            <hr color="#7E1530" />
          </tr>
        ))
      );

    return (
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <h1>This is your Finalized Format</h1>
            <hr color="#7E1530" />
            <div className="jumbotron j-greetings">
              <table className="table">{displayInfo}</table>
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
