import React, { Component } from 'react';
import Redirect from "react-router/es/Redirect";

class LoginModal extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async function(event)
  {
    event.preventDefault();
    const inputData = new FormData(event.target);
    const netname = inputData.get('netname');
    const password = inputData.get('password');
    const resp = await fetch('/Selenium', {
      method: 'POST',
      mode: "cors",
      body: JSON.stringify({
        netname: netname,
        password: password
      }),
      headers: {'Content-Type': 'application/json'}
    });
    const body = await resp.text();
    console.log(body);
    this.setState({'netname': netname, 'password': password, redirectToReferrer: true});
  }
    render()
    {
      const redirectToReferrer = this.state.redirectToReferrer;
      if (redirectToReferrer === true) {
        return <Redirect to="/LoadingCourses" />
      }
      if(!this.props.show)
      {
        return null;
      }

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
                  <button type="submit" className="btn btn-dark" value="Submit">Login</button>
                </div>
              </form>
            </div>
        </div>
    )
  }
}

export default LoginModal;
