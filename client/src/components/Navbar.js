import React from "react"

const logo = {
  height: "110px",
  width: "200px"
}


function Navbar() {
  return (
    <div className="container">
      <nav  style={{height: "80px"}} className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="https://my.concordia.ca/psp/upprpr9/?cmd=login&languageCd=ENG&"><img style={logo} src="https://uploads-ssl.webflow.com/5abfb5060c89186efba37c26/5b9d665cd5ba8a52b1ca2d48_concordia.png"/></a>
      </nav>
    </div>
  )
}

export default Navbar
