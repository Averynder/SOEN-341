import React from 'react'

class Modal extends React.Component{
	  constructor() {
      super()

      this.state = { user: {} };
      this.onSubmit = this.handleSubmit.bind(this);

    }
	 handleSubmit(e) {
      e.preventDefault();
      var self = this;
      // On submit of the form, send a POST request with the data to the server.
      fetch('/users', {
          method: 'POST',
          data: {
            Netname: self.refs.netname,
            Password: self.refs.password
          }
        })
		
        .then(function(response) {
          return response.json()
        }).then(function(body) {
          console.log(body);
        });
    }
	
    render(){
      if(!this.props.show){
        return null;
      }

    return (
        <div className="container" id="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{this.props.userType}</h3>
              <button type="button" style={{margin: 0}} className="btn btn-dark" data-dismiss="modal" onClick={this.props.onClose}>&times;</button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="modal-body" style={{textAlign: "center"}}>
                <h4>Sign In</h4>
                <br />
                <div class="md-form mb-5">
                  <h6 class="fas fa-envelope prefix grey-text">Netname:  </h6>
                  <input className="input validate" type="text" id="defaultForm-email" ref = "netname" placeholder="n_louis" required />
                </div>

                <div class="md-form mb-5">
                  <h6 class="fas fa-envelope prefix grey-text">Password:  </h6>
                  <input className="input validate" type="password" id="defaultForm-email" ref = "password" placeholder="********" required />
                </div>

              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-dark" onClick/*Process Login*/>Login</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default Modal;
