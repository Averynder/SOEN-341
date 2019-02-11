import React, {Component} from "react"
import Button from "./components/Button"

class BasedOnSeq extends Component {
    constructor() {
        super()
      }

    render() {
      return (
        <div className="container">
          <div className="cnt-button">
            <h3>Is it based on a Sequence?</h3>
            <hr/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <Button text="No" onClick="#"/>
              <Button text="Yes" onClick="#"/>
            </div>
          </div>
        </div>
      )
    }

}

export default BasedOnSeq
