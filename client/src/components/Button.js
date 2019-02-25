import React from "react"

function Button(props){
  return(
    <div className="container">
        <button type="button" onClick={props.onClick} className="btn btn-dark">{props.text}</button>
    </div>
  )
}

export default Button
