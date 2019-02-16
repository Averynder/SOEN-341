import React from "react"


class TestData extends React.Component{
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

    componentDidMount() {
			fetch('/api')
			.then(res => res.json())
			.then(data => this.setState({ data }));
    }

  render(){
    return (
			<div style={{fontSize: 5 + 'em', color: 'red'}} className="container last-container">
        <div>cookie.id: {this.state.data.cookie}</div>
      </div>
    )
  }

}

export default TestData
