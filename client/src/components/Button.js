import React from "react"

function Button(props){
  return(
    <div class="container">
      <button type="button" class="btn btn-dark">{props.text}</button>
    </div>
  )
}

export default Button
