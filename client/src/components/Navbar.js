import React from "react"
import Button from "react-bootstrap/Button";
import { NavLink, BrowserRouter as Router } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: '',
    }
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
  }

  update = val => {
    console.log(val);
    this.props.onUpdate(val);
    this.setState({ firstName: val });
  }

  componentDidMount() {
    fetch("/grades")
      .then(body => {
        if (body.status == 200) {
          return body.json();
        }
        return 'visitor';
      })
      .then(info => {
        let val = info === 'visitor'? info: info.result.studentInfo.givenName;
        this.update(val);

        let elemFirstName = document.getElementById('firstName');
        elemFirstName.innerHTML = val;
      });
  }

  logout() {
    fetch('logout')
      .then(resp => {
        window.location.href = '/';
      });
  }

  render() {
    let btn;
    if (this.state.firstName && this.state.firstName !== 'visitor') {
      btn = <Button
                id="logout"
                variant="primary"
                type="submit"
                onClick={ this.logout }
            >
                Logout
            </Button>;
    }
    return (
      <div className="container">
        <nav style={{height: "80px"}} className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand" href="/"><img style={{ height: '80px', width: '140px' }} src="https://uploads-ssl.webflow.com/5abfb5060c89186efba37c26/5b9d665cd5ba8a52b1ca2d48_concordia.png" alt="Concordia's Logo"/></a>

          { btn }
        </nav>
      </div>
    )
  }
}

export default Navbar
