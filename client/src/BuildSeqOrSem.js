import React, {Component} from "react"
import Button from "./components/Button"

class BuildSeqOrSem extends Component {
    constructor() {
        super()
      }

    render() {
      return (
        <div className="container">
          <div className="cnt-button">
            <h3>Click on the one you want to built?</h3>
            <hr/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <Button text="Sequence" onClick="#"/>
              <Button text="Semester" onClick="#"/>
            </div>
          </div>
        </div>
      )
    }

}

export default BuildSeqOrSem
