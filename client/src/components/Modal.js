import React from 'react'
import Button from "./Button"
import PropTypes from "prop-types"

class Modal extends React.Component{
    render(){
      if(!this.props.show){
        return null;
      }

    const modalStyle = {
      backgroundColor: '#FFF',
      borderRadius: 5,
      top: 0,
      bottom: 10,
      left: 0,
      right: 0,
      maxWidth: 500,
      minHeight: 300,
      display: "inline-block",
      zIndex: 4,
    };

    return (
        <div className="container" id="modal-container">
          <div className="modal-content">

            <div className="modal-header">
              <h3>{this.props.userType}</h3>
              <button type="button" style={{margin: 0}} className="btn btn-dark" data-dismiss="modal" onClick={this.props.onClose}>&times;</button>
            </div>

            <div className="modal-body" style={{textAlign: "center"}}>
              <h4>Sign In</h4>
              <br />
              <div class="md-form mb-5">
                <h6 class="fas fa-envelope prefix grey-text">Netname:  </h6>
                <input className="input validate" type="email" id="defaultForm-email"  />
              </div>

              <div class="md-form mb-5">
                <h6 class="fas fa-envelope prefix grey-text">Password:  </h6>
                <input className="input validate" type="email" id="defaultForm-email"  />
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-dark" onClick/*Process Login*/>Login</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Modal;
