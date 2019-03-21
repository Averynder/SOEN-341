import React, { Component } from 'react';
import Redirect from "react-router/es/Redirect";
import Button from "react-bootstrap/Button";

class LoginModal extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit = function(event) {
    let btn = document.getElementById('waiting');
    btn.disabled = true;
    btn.innerHTML = 'Logging in...';
    event.preventDefault();
    const inputData = new FormData(event.target);
    const netname = inputData.get('netname');
    const password = inputData.get('password');
    fetch('/concordia', {
      method: 'POST',
      mode: "cors",
      body: JSON.stringify({
        netname: netname,
        password: password
      }),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if(res.status === 422) {
          document.getElementById('errorMessage').style.display = 'block';
          btn.disabled = false;
          btn.innerHTML = "Login";
        } else {
          window.location.href = "/LoadingCourses";
        }
        console.log(res);
      });
  }
    render() {
      return (
        <div className="container" id="modal-container">
          <div className="modal-content ">
            <div className="modal-header">
              <h3>{this.props.userType}</h3>
              <button type="button" style={{margin: 0}} className="btn btn-dark" data-dismiss="modal" onClick={this.props.onClose}>&times;</button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body" style={{textAlign: "center"}}>
                <h4>Sign In</h4>
                <br />
                <span id="errorMessage" style={{color: 'blue', display: 'none' }}>Invalid user/pass</span>
                <div class="md-form mb-5">
                  <h6 class="fas fa-envelope prefix grey-text">Netname:  </h6>
                  <input className="input validate" type="text" id="defaultForm-email" placeholder="n_louis" name="netname" required />
                </div>
                <div class="md-form mb-5">
                  <h6 class="fas fa-envelope prefix grey-text">Password:  </h6>
                  <input className="input validate" type="password" id="defaultForm-email"  placeholder="********" name="password" required />
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="submit"
                  id="waiting"
                  variant="primary"
                  disabled={false}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      )
  }
}

export default LoginModal;
