import React from "react"
import axios from "axios"


class Upload extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedFile: null,
    }
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('upload', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('http://localhost:3001', fd)
      .then(res => {
        console.log(res);
      })
  }

  render(){
    return(
        <div className="form-group">
          <input type="file" className="btn btn-dark" onChange={this.fileSelectedHandler}/>
          <button className="btn btn-dark" onClick={this.fileUploadHandler}>Upload</button>
        </div>
    )
  }
}

export default Upload
