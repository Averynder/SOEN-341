import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

class BuildSeqOrSem extends Component {

  componentDidMount() {
    fetch("/grades")
      .then(body => {
        return body.json();
      })
      .then(info => {
        console.log(info);
        let elemFirstName = document.getElementById('firstName');
        let valFirstName = info.result.studentInfo.givenName;
        console.log(valFirstName);
        elemFirstName.innerHTML = valFirstName;
      });
  }

  render() {
    return (
      <div className="container">
          <Navbar />
        <div className="container">
          <div className="jumbotron j-greetings">
            <h2 className="display-4">Hi <span id="firstName"></span>, which build option would you like?</h2>
            <hr color="#7e1530"/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <Link to="/select-semester">
                <Button text="Semester"/>
              </Link>
              <Link to="/obtain-uploaded-sequence">
                <Button text="Sequence"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BuildSeqOrSem
