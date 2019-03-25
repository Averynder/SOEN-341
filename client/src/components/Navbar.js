import React from "react"
import Button from "react-bootstrap/Button";
import { NavLink, BrowserRouter as Router } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.logout = this.logout.bind(this);
  }

  logout() {
    fetch('logout')
      .then(resp => {
        window.location.href = '/';
      });
  }

  render() {
    let btn;
    if (this.props.hasLoggedIn) {
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
