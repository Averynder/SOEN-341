import React from "react"


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
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default ButtonContainer
