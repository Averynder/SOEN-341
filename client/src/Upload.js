import React from "react"
import axios from "axios"


const endpoint = 'http://localhost:3001/upload'
class Upload extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
    }
  }

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    console.log(this.state.selectedFile);
    var file = this.state.selectedFile,read = new FileReader();

    read.readAsBinaryString(file);

    read.onloadend = () => {
      var rt = {"contentFile": read.result, "filename": this.state.selectedFile.name};
      axios
        .post(endpoint, rt, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            })
          },
        })
        .then(res => {
          console.log(res.statusText);
        })
  }


  }

  render(){
    return(
        <div className="form-group">
          <input type="file" name="filename" className="btn btn-dark" onChange={this.handleSelectedFile}/>
          <button className="btn btn-dark" value="upload" onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
        </div>
    )
  }
}

export default Upload
