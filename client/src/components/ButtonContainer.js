import React from "react"
import Button from "./Button"
import { Link } from "react-router-dom"

class ButtonContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      show: false
    }
  }

  render(){
    return (
      <div className="container last-container">
        <div className="cnt-button">
          <h6>Click on the option that describes you the most {this.state.count}</h6>
          <Button text="I Am A Student" onClick={this.props.studentOnClick}/>
          <Button text="I Am A Professor" onClick={this.props.teacherOnClick}/>

          <Link to="/select-semester">
            <Button text="I Am New To This Website" onClick={this.props.noAccountOnClick}/>
          </Link>
        </div>
      </div>
    )
  }

}

export default ButtonContainer
