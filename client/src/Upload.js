import React from "react"
import axios from "axios"

const endpoint = 'http://localhost:8000/upload'

class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0
    }
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

  render(){
    return(
        <div className="form-group">
          <input type="file" className="btn btn-dark" id="" onChange={this.handleselectedFile}/>
          <button className="btn btn-dark" onClick={this.handleUpload}>Upload</button>
          <div> { Math.round(this.state.loaded,2) } % </div>
        </div>
    )
  }
}

export default Upload
