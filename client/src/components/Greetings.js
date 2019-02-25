import React from "react"

function Greetings() {
  return (
    <div className="container">
      <div className="jumbotron j-greetings">
        <h2 className="display-4">Hey Concordians!</h2>
        <hr color="#7e1530"/>
        <p className="lead">Welcome to Concordia Software Engineering Schedule Builder</p>
    	  <p id="currentTime">
           /* {setInterval(() => {
            document.getElementById('currentTime').innerHTML = 
            (new Date()).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false})},1000)
          }*/
        </p>
      </div>
    </div>
  )
}

export default Greetings
