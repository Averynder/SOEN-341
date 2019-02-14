import React from "react"

class Backdrop extends React.Component{
  render(){
    if(!this.props.show){
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 1
    };

    return(
      <div className="backdrop" style={backdropStyle}>
        {this.props.children}
      </div>
    )
  }
}

export default Backdrop
