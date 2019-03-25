import React from "react"
import Button from "react-bootstrap/Button";

const logo = {
  height: "80px",
  width: "140px"
}


function Navbar() {
  return (
    <div className="container">
      <nav  style={{height: "80px"}} className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="https://my.concordia.ca/psp/upprpr9/?cmd=login&languageCd=ENG&"><img style={logo} src="https://uploads-ssl.webflow.com/5abfb5060c89186efba37c26/5b9d665cd5ba8a52b1ca2d48_concordia.png" alt="Concordia's Logo"/></a>
          <Button
              type="submit"
              id="waiting"
              variant="primary"
              disabled={false}
          >
              Logout
          </Button>
      </nav>
    </div>
  )
}

export default Navbar
