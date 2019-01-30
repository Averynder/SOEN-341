import React from 'react'
import Button from "./Button"
import PropTypes from "prop-types"

class Modal extends React.Component{
    render(){
      if(!this.props.show){
        return null;
      }

    const modalStyle = {
      backgroundColor: 'white',
      borderRadius: 5,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: 500,
      minHeight: 300,
      display: "inline-block",
      zIndex: 4,
    };

    return (
        <div className="container">
          <div className="modal-content">

            <div className="modal-header">
              <h3>{this.props.userType}</h3>
              <button type="button" style={{margin: 0}} className="btn btn-dark" data-dismiss="modal" onClick={this.props.onClose}>&times;</button>
            </div>

            <div className="modal-body" style={{textAlign: "center"}}>
              <h5>Sign In</h5>
              <br />
              <div class="md-form mb-5">
                <input type="email" id="defaultForm-email" class="form-control validate" />
              </div>

              <div class="md-form mb-5">
                <i class="fas fa-envelope prefix grey-text"></i>
                <input type="email" id="defaultForm-email" class="form-control validate" />
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-dark" onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Modal;
