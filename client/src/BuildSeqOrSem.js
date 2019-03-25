import React, {Component} from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

class BuildSeqOrSem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hasLoggedIn: false,
    };
  }

  componentDidMount() {
    fetch("/grades")
      .then(body => {
        if (body.status === 200) {
          this.setState({ hasLoggedIn: true });
          return body.json();
        } else {
          return 'visitor';
        }
      })
      .then(info => {
        let elemFirstName = document.getElementById('firstName');
        let valFirstName = info === 'visitor'? info: info.result.studentInfo.givenName;
        elemFirstName.innerHTML = valFirstName;
      });
  }

  render() {
    return (
      <div className="container">
          <Navbar hasLoggedIn={this.state.hasLoggedIn} />
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
