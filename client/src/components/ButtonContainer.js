import React from "react"
import Button from "./Button"

function ButtonContainer() {
  return (
    <div class="container last-container">
      <div class="cnt-button">
        <h6>Click on the option that describes you the most</h6>
        <Button text="I Am A Student" />
        <Button text="I Am A Professor" />
        <Button text="I Am New To This Website" />
      </div>
    </div>
  )
}

export default ButtonContainer
